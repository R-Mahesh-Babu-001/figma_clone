"use client";

import { LiveMap } from "@liveblocks/client";
import { ClientSideSuspense } from "@liveblocks/react";
import type { PropsWithChildren } from "react";

import { Loader } from "@/components/loader";
import { isLiveblocksConfigured, RoomProvider } from "@/liveblocks.config";

export const Room = ({ children }: PropsWithChildren) => {
  return (
    <RoomProvider
      id="my-room"
      initialPresence={{
        cursor: null,
        message: null,
      }}
      initialStorage={{
        canvasObjects: new LiveMap(),
      }}
    >
      {isLiveblocksConfigured ? (
        <ClientSideSuspense fallback={<Loader />}>
          {() => children}
        </ClientSideSuspense>
      ) : (
        children
      )}
    </RoomProvider>
  );
};
