"use client";

import { useMemo } from "react";
import Image from "next/image";
import { Layers as LayersIcon } from "lucide-react";
import { getShapeInfo } from "@/lib/utils";

export const LeftSidebar = ({ allShapes }: { allShapes: Array<any> }) => {
  const memoizedShapes = useMemo(
    () => (
      <section
        className="sticky left-0 flex h-full min-w-[220px] max-w-[220px] select-none flex-col overflow-y-auto max-sm:hidden"
        style={{
          background: "#09090b",
          borderRight: "1px solid #27272a",
          borderTop: "1px solid #27272a",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{ borderBottom: "1px solid #27272a" }}
        >
          <LayersIcon className="h-3.5 w-3.5" style={{ color: "#52525b" }} />
          <h3
            className="text-[11px] font-semibold uppercase tracking-[0.1em]"
            style={{ color: "#52525b" }}
          >
            Layers
          </h3>
          <span
            className="ml-auto rounded-full px-1.5 py-0.5 text-[10px] font-bold"
            style={{ background: "#18181b", color: "#71717a" }}
          >
            {allShapes?.length ?? 0}
          </span>
        </div>

        {/* Layer items */}
        <div className="flex flex-col py-1">
          {!allShapes?.length && (
            <div className="flex flex-col items-center justify-center py-12 opacity-40">
              <LayersIcon className="mb-2 h-6 w-6" style={{ color: "#52525b" }} />
              <p className="text-[11px]" style={{ color: "#52525b" }}>
                No layers yet
              </p>
            </div>
          )}

          {allShapes?.map((shape: any) => {
            const info = getShapeInfo(shape[1]?.type);
            return (
              <div
                key={shape[1]?.objectId}
                className="group mx-2 my-0.5 flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-2 transition-all duration-150"
                style={{ borderLeft: "2px solid transparent" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.borderLeftColor = "#e60000";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderLeftColor = "transparent";
                }}
              >
                <div
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded"
                  style={{ background: "#18181b" }}
                >
                  <Image
                    src={info?.icon}
                    alt="Layer"
                    width={12}
                    height={12}
                    className="opacity-60 group-hover:opacity-100 transition-opacity"
                    style={{ filter: "invert(1)" }}
                  />
                </div>
                <span
                  className="truncate text-[12px] font-medium capitalize"
                  style={{ color: "#a1a1aa" }}
                >
                  {info.name}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    ),
    [allShapes]
  );

  return memoizedShapes;
};
