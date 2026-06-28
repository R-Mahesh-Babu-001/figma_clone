import type { Metadata, Viewport } from "next";
import type { PropsWithChildren } from "react";

import { siteConfig } from "@/config";

import { Room } from "./room";

import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#09090b",
};

export const metadata: Metadata = siteConfig;

const RootLayout = ({ children }: Readonly<PropsWithChildren>) => {
  return (
    <html lang="en">
      <body className="bg-primary-grey-200">
        <Room>{children}</Room>
      </body>
    </html>
  );
};

export default RootLayout;
