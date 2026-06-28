"use client";

import { type LiveMap, createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";

import { ReactionEvent } from "@/types/type";

const liveblocksPublicKey = process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY;

export const isLiveblocksConfigured = Boolean(
  liveblocksPublicKey &&
    liveblocksPublicKey.startsWith("pk_") &&
    !liveblocksPublicKey.includes("XXXXXXXX")
);

export type Presence = {
  cursor: { x: number; y: number } | null;
  message: string | null;
};

type Storage = {
  canvasObjects: LiveMap<string, any>;
};

type RoomEvent = ReactionEvent;

export type ThreadMetadata = {
  resolved: boolean;
  zIndex: number;
  time?: number;
  x: number;
  y: number;
};

type LocalRoomState = {
  canvasObjects: Map<string, any>;
  presence: Presence;
  setCanvasObjects: React.Dispatch<React.SetStateAction<Map<string, any>>>;
  setPresence: React.Dispatch<React.SetStateAction<Presence>>;
};

const LocalRoomContext = createContext<LocalRoomState | null>(null);

const LocalRoomProvider = ({ children }: PropsWithChildren) => {
  const [canvasObjects, setCanvasObjects] = useState(() => new Map<string, any>());
  const [presence, setPresence] = useState<Presence>({
    cursor: null,
    message: null,
  });

  const value = useMemo(
    () => ({
      canvasObjects,
      presence,
      setCanvasObjects,
      setPresence,
    }),
    [canvasObjects, presence]
  );

  return (
    <LocalRoomContext.Provider value={value}>
      {children}
    </LocalRoomContext.Provider>
  );
};

const useLocalRoom = () => {
  const room = useContext(LocalRoomContext);

  if (!room) {
    throw new Error("Local room hooks must be used inside RoomProvider.");
  }

  return room;
};

const localUser = {
  connectionId: 0,
  id: "local-user",
  info: {},
  presence: {
    cursor: null,
    message: null,
  },
};

const createLocalStorageApi = (canvasObjects: Map<string, any>) => ({
  get: (_key: "canvasObjects") => canvasObjects,
});

const liveblocksRoom = isLiveblocksConfigured
  ? createRoomContext<Presence, Storage, {}, RoomEvent, ThreadMetadata>(
      createClient({
        throttle: 16,
        publicApiKey: liveblocksPublicKey,
      }),
      {}
    )
  : null;

const liveblocksHooks = liveblocksRoom?.suspense;

export const RoomProvider = ({ children, ...props }: PropsWithChildren<any>) => {
  if (liveblocksHooks) {
    const RealRoomProvider = liveblocksHooks.RoomProvider;
    return <RealRoomProvider {...props}>{children}</RealRoomProvider>;
  }

  return <LocalRoomProvider>{children}</LocalRoomProvider>;
};

export const useRoom = () => {
  if (liveblocksHooks) return liveblocksHooks.useRoom();
  return null;
};

export const useMyPresence = () => {
  if (liveblocksHooks) return liveblocksHooks.useMyPresence();

  const { presence, setPresence } = useLocalRoom();
  const updatePresence = useCallback(
    (patch: Partial<Presence>) => {
      setPresence((current) => ({ ...current, ...patch }));
    },
    [setPresence]
  );

  return [presence, updatePresence] as const;
};

export const useUpdateMyPresence = () => {
  const [, updatePresence] = useMyPresence();
  return updatePresence;
};

export const useSelf = () => {
  if (liveblocksHooks) return liveblocksHooks.useSelf();
  const { presence } = useLocalRoom();
  return { ...localUser, presence };
};

export const useOthers = () => {
  if (liveblocksHooks) return liveblocksHooks.useOthers();
  return [];
};

export const useOthersMapped = () => {
  if (liveblocksHooks) return (liveblocksHooks.useOthersMapped as any)();
  return [];
};

export const useOthersConnectionIds = () => {
  if (liveblocksHooks) return liveblocksHooks.useOthersConnectionIds();
  return [];
};

export const useOther = () => {
  if (liveblocksHooks) return (liveblocksHooks.useOther as any)();
  return null;
};

export const useBroadcastEvent = () => {
  if (liveblocksHooks) return liveblocksHooks.useBroadcastEvent();
  return () => undefined;
};

export const useEventListener = (callback?: (eventData: { event: RoomEvent }) => void) => {
  if (liveblocksHooks) return liveblocksHooks.useEventListener(callback as any);
};

export const useErrorListener = () => {
  if (liveblocksHooks) return (liveblocksHooks.useErrorListener as any)();
};

export const useStorage = <T,>(selector: (root: { canvasObjects: Map<string, any> }) => T) => {
  if (liveblocksHooks) return liveblocksHooks.useStorage(selector as any) as T;
  const { canvasObjects } = useLocalRoom();
  return selector({ canvasObjects });
};

export const useBatch = () => {
  if (liveblocksHooks) return liveblocksHooks.useBatch();
  return (callback: () => void) => callback();
};

export const useHistory = () => {
  if (liveblocksHooks) return liveblocksHooks.useHistory();
  return {
    undo: () => undefined,
    redo: () => undefined,
    pause: () => undefined,
    resume: () => undefined,
  };
};

export const useUndo = () => {
  if (liveblocksHooks) return liveblocksHooks.useUndo();
  return () => undefined;
};

export const useRedo = () => {
  if (liveblocksHooks) return liveblocksHooks.useRedo();
  return () => undefined;
};

export const useCanUndo = () => {
  if (liveblocksHooks) return liveblocksHooks.useCanUndo();
  return false;
};

export const useCanRedo = () => {
  if (liveblocksHooks) return liveblocksHooks.useCanRedo();
  return false;
};

export const useMutation = <TArgs extends any[], TResult>(
  callback: (context: { storage: ReturnType<typeof createLocalStorageApi> }, ...args: TArgs) => TResult,
  deps: React.DependencyList = []
) => {
  if (liveblocksHooks) return liveblocksHooks.useMutation(callback as any, deps);

  const { canvasObjects, setCanvasObjects } = useLocalRoom();

  return useCallback(
    (...args: TArgs) => {
      const nextCanvasObjects = new Map(canvasObjects);
      const result = callback(
        { storage: createLocalStorageApi(nextCanvasObjects) },
        ...args
      );

      setCanvasObjects(nextCanvasObjects);

      return result;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [callback, canvasObjects, setCanvasObjects, ...deps]
  );
};

export const useStatus = () => {
  if (liveblocksHooks) return liveblocksHooks.useStatus();
  return "connected";
};

export const useLostConnectionListener = () => {
  if (liveblocksHooks) return (liveblocksHooks.useLostConnectionListener as any)();
};

export const useThreads = () => {
  if (liveblocksHooks) return liveblocksHooks.useThreads();
  return { threads: [] };
};

export const useUser = () => {
  if (liveblocksHooks) return (liveblocksHooks.useUser as any)();
  return { user: null, isLoading: false };
};

export const useCreateThread = () => {
  if (liveblocksHooks) return liveblocksHooks.useCreateThread();
  return () => undefined;
};

export const useEditThreadMetadata = () => {
  if (liveblocksHooks) return liveblocksHooks.useEditThreadMetadata();
  return () => undefined;
};

export const useCreateComment = () => {
  if (liveblocksHooks) return liveblocksHooks.useCreateComment();
  return () => undefined;
};

export const useEditComment = () => {
  if (liveblocksHooks) return liveblocksHooks.useEditComment();
  return () => undefined;
};

export const useDeleteComment = () => {
  if (liveblocksHooks) return liveblocksHooks.useDeleteComment();
  return () => undefined;
};

export const useAddReaction = () => {
  if (liveblocksHooks) return liveblocksHooks.useAddReaction();
  return () => undefined;
};

export const useRemoveReaction = () => {
  if (liveblocksHooks) return liveblocksHooks.useRemoveReaction();
  return () => undefined;
};
