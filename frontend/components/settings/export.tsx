import { exportToPdf, sendCanvasToAdmin } from "@/lib/utils";
import { Download, Send } from "lucide-react";

export const Export = () => (
  <div className="px-4 py-3">
    <p
      className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.12em]"
      style={{ color: "#52525b" }}
    >
      Export
    </p>

    <div className="flex flex-col gap-2">
      {/* Export to PDF */}
      <button
        onClick={exportToPdf}
        className="group flex h-9 w-full items-center justify-center gap-2 rounded-md border text-[12px] font-medium text-white transition-all duration-150"
        style={{ borderColor: "#27272a", background: "#18181b", color: "#a1a1aa" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "#3f3f46";
          e.currentTarget.style.background = "#27272a";
          e.currentTarget.style.color = "#fff";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "#27272a";
          e.currentTarget.style.background = "#18181b";
          e.currentTarget.style.color = "#a1a1aa";
        }}
      >
        <Download className="h-3.5 w-3.5" />
        Export to PDF
      </button>

      {/* Send it to Admin */}
      <button
        onClick={sendCanvasToAdmin}
        className="group flex h-9 w-full items-center justify-center gap-2 rounded-md text-[12px] font-semibold text-white transition-all duration-150"
        style={{
          background: "#e60000",
          boxShadow: "0 0 12px rgba(230,0,0,0.25)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#cc0000";
          e.currentTarget.style.boxShadow = "0 0 20px rgba(230,0,0,0.4)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#e60000";
          e.currentTarget.style.boxShadow = "0 0 12px rgba(230,0,0,0.25)";
        }}
      >
        <Send className="h-3.5 w-3.5" />
        Send it to Admin
      </button>
    </div>
  </div>
);
