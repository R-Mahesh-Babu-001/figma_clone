"use client";

import Image from "next/image";
import { memo } from "react";
import { LogOut } from "lucide-react";

import { NewThread } from "@/components/comments/new-thread";
import { Button } from "@/components/ui/button";
import { ActiveUsers } from "@/components/users/active-users";
import { navElements } from "@/constants";
import type { ActiveElement, NavbarProps } from "@/types/type";
import { ShapesMenu } from "./shapes-menu";

export const Navbar = memo(
  ({
    activeElement,
    imageInputRef,
    handleImageUpload,
    handleActiveElement,
    onLogout,
  }: NavbarProps & { onLogout: () => void }) => {
    const isActive = (value: string | Array<ActiveElement>) =>
      (activeElement && activeElement.value === value) ||
      (Array.isArray(value) &&
        value.some((val) => val?.value === activeElement?.value));

    return (
      <nav
        className="flex select-none items-center justify-between gap-4 px-5 text-white"
        style={{
          background: "#09090b",
          borderBottom: "1px solid #27272a",
          height: "52px",
        }}
      >
        {/* Logo */}
        <div className="flex shrink-0 items-center">
          <Image src="/logo.svg" alt="FigPro" width={64} height={22} className="object-contain" />
        </div>

        {/* Tool icons */}
        <ul className="flex flex-row items-center">
          {navElements.map((item: ActiveElement | any) => (
            <li
              key={item.name}
              onClick={() => {
                if (Array.isArray(item.value)) return;
                handleActiveElement(item);
              }}
              className="group relative flex items-center justify-center rounded-md transition-all duration-150"
              style={{
                padding: "6px 10px",
                background: isActive(item.value)
                  ? "#e60000"
                  : "transparent",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                if (!isActive(item.value))
                  e.currentTarget.style.background = "rgba(255,255,255,0.07)";
              }}
              onMouseLeave={(e) => {
                if (!isActive(item.value))
                  e.currentTarget.style.background = "transparent";
              }}
            >
              {/* Tooltip */}
              <span
                className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded px-2 py-0.5 text-[10px] font-medium opacity-0 transition-opacity group-hover:opacity-100"
                style={{ background: "#27272a", color: "#a1a1aa", zIndex: 100 }}
              >
                {item.name}
              </span>

              {Array.isArray(item.value) ? (
                <ShapesMenu
                  item={item}
                  activeElement={activeElement}
                  imageInputRef={imageInputRef}
                  handleActiveElement={handleActiveElement}
                  handleImageUpload={handleImageUpload}
                />
              ) : item?.value === "comments" ? (
                <NewThread>
                  <Button className="relative h-5 w-5 object-contain bg-transparent hover:bg-transparent p-0">
                    <Image
                      src={item.icon}
                      alt={item.name}
                      fill
                      className={isActive(item.value) ? "invert brightness-0" : "invert opacity-70"}
                    />
                  </Button>
                </NewThread>
              ) : (
                <Button className="relative h-5 w-5 object-contain bg-transparent hover:bg-transparent p-0">
                  <Image
                    src={item.icon}
                    alt={item.name}
                    fill
                    className={isActive(item.value) ? "invert brightness-0" : "invert opacity-70"}
                  />
                </Button>
              )}
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex shrink-0 flex-row items-center gap-3">
          <ActiveUsers />

          <button
            onClick={onLogout}
            title="Log Out"
            className="flex h-8 w-8 items-center justify-center rounded-md transition-all duration-150"
            style={{ color: "#71717a" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(230,0,0,0.12)";
              e.currentTarget.style.color = "#e60000";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#71717a";
            }}
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </nav>
    );
  },
  (prev, next) => prev.activeElement === next.activeElement
);

Navbar.displayName = "Navbar";
