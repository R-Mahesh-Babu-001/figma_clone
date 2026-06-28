import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const dimensionsOptions = [
  { label: "W", property: "width" },
  { label: "H", property: "height" },
];

type DimensionsProps = {
  width: string;
  height: string;
  isEditingRef: React.MutableRefObject<boolean>;
  handleInputChange: (property: string, value: string) => void;
};

export const Dimensions = ({
  width,
  height,
  isEditingRef,
  handleInputChange,
}: DimensionsProps) => (
  <div style={{ borderBottom: "1px solid #27272a" }} className="px-4 py-3">
    <p
      className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.12em]"
      style={{ color: "#52525b" }}
    >
      Dimensions
    </p>
    <div className="flex flex-col gap-2">
      {dimensionsOptions.map((item) => (
        <div key={item.label} className="flex items-center gap-2.5">
          <Label
            htmlFor={item.property}
            className="w-4 shrink-0 text-[11px] font-bold"
            style={{ color: "#52525b" }}
          >
            {item.label}
          </Label>
          <input
            type="number"
            id={item.property}
            placeholder="100"
            min={10}
            value={item.property === "width" ? width : height}
            onChange={(e) => handleInputChange(item.property, e.target.value)}
            onBlur={() => { isEditingRef.current = false; }}
            className="h-8 flex-1 rounded-md border bg-transparent px-2.5 text-[12px] text-white outline-none transition-all duration-150 placeholder:text-zinc-600 focus:ring-1"
            style={{
              borderColor: "#27272a",
              background: "#18181b",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "rgba(230,0,0,0.5)";
              e.currentTarget.style.boxShadow = "0 0 0 2px rgba(230,0,0,0.1)";
            }}
            onBlurCapture={(e) => {
              e.currentTarget.style.borderColor = "#27272a";
              e.currentTarget.style.boxShadow = "none";
              isEditingRef.current = false;
            }}
          />
        </div>
      ))}
    </div>
  </div>
);
