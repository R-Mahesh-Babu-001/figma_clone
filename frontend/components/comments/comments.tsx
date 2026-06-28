"use client";

import { ClientSideSuspense } from "@liveblocks/react";

import { CommentsOverlay } from "@/components/comments/comments-overlay";
import { isLiveblocksConfigured } from "@/liveblocks.config";

export const Comments = () => {
  if (!isLiveblocksConfigured) {
    return null;
  }

  return (
    <ClientSideSuspense fallback={null}>
      {() => <CommentsOverlay />}
    </ClientSideSuspense>
  );
};
