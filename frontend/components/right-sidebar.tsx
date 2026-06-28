import { fabric } from "fabric";
import { useRef } from "react";

import { Color } from "@/components/settings/color";
import { Dimensions } from "@/components/settings/dimensions";
import { Export } from "@/components/settings/export";
import { Text } from "@/components/settings/text";
import { modifyShape } from "@/lib/shapes";
import type { RightSidebarProps } from "@/types/type";

/* ── Section wrapper ─────────────────────────────────── */
const SidebarSection = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div style={{ borderBottom: "1px solid #27272a" }}>
    <p
      className="px-4 pt-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.12em]"
      style={{ color: "#52525b" }}
    >
      {label}
    </p>
    <div className="px-4 pb-3">{children}</div>
  </div>
);

export const RightSidebar = ({
  activeObjectRef,
  elementAttributes,
  fabricRef,
  isEditingRef,
  setElementAttributes,
  syncShapeInStorage,
}: RightSidebarProps) => {
  const colorInputRef = useRef(null);
  const strokeInputRef = useRef(null);

  const handleInputChange = (property: string, value: string) => {
    if (!isEditingRef?.current) isEditingRef.current = true;
    setElementAttributes((prev) => ({ ...prev, [property]: value }));
    modifyShape({
      canvas: fabricRef.current as fabric.Canvas,
      property,
      value,
      activeObjectRef,
      syncShapeInStorage,
    });
  };

  return (
    <section
      className="sticky right-0 flex h-full min-w-[220px] max-w-[220px] select-none flex-col overflow-y-auto max-sm:hidden"
      style={{
        background: "#09090b",
        borderLeft: "1px solid #27272a",
        borderTop: "1px solid #27272a",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: "1px solid #27272a" }}
      >
        <span
          className="text-[11px] font-semibold uppercase tracking-[0.1em]"
          style={{ color: "#52525b" }}
        >
          Design
        </span>
        <span
          className="rounded px-1.5 py-0.5 text-[10px] font-medium"
          style={{ background: "#18181b", color: "#71717a" }}
        >
          Properties
        </span>
      </div>

      {/* Dimensions */}
      <Dimensions
        isEditingRef={isEditingRef}
        width={elementAttributes.width}
        height={elementAttributes.height}
        handleInputChange={handleInputChange}
      />

      {/* Text */}
      <Text
        fontFamily={elementAttributes.fontFamily}
        fontSize={elementAttributes.fontSize}
        fontWeight={elementAttributes.fontWeight}
        handleInputChange={handleInputChange}
      />

      {/* Fill color */}
      <Color
        inputRef={colorInputRef}
        attribute={elementAttributes.fill}
        placeholder="color"
        handleInputChange={handleInputChange}
        attributeType="fill"
      />

      {/* Stroke */}
      <Color
        inputRef={strokeInputRef}
        attribute={elementAttributes.stroke}
        placeholder="stroke"
        handleInputChange={handleInputChange}
        attributeType="stroke"
      />

      {/* Export */}
      <Export />
    </section>
  );
};
