import { Label } from "@/components/ui/label";

type ColorProps = {
  inputRef: any;
  attribute: string;
  placeholder: string;
  attributeType: string;
  handleInputChange: (property: string, value: string) => void;
};

export const Color = ({
  inputRef,
  attribute,
  placeholder,
  attributeType,
  handleInputChange,
}: ColorProps) => (
  <div style={{ borderBottom: "1px solid #27272a" }} className="px-4 py-3">
    <p
      className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.12em]"
      style={{ color: "#52525b" }}
    >
      {placeholder}
    </p>

    <div
      className="flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 transition-all duration-150"
      style={{ background: "#18181b", border: "1px solid #27272a" }}
      onClick={() => inputRef.current?.click()}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(230,0,0,0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "#27272a";
      }}
    >
      {/* Color swatch */}
      <div className="relative h-5 w-5 shrink-0 overflow-hidden rounded-sm shadow-inner">
        <div
          className="absolute inset-0 rounded-sm"
          style={{ background: attribute || "#aabbcc" }}
        />
        <input
          type="color"
          value={attribute}
          ref={inputRef}
          onChange={(e) => handleInputChange(attributeType, e.target.value)}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          tabIndex={-1}
        />
      </div>

      <Label
        className="cursor-pointer font-mono text-[12px] uppercase tracking-wide"
        style={{ color: "#a1a1aa" }}
      >
        {attribute || "#aabbcc"}
      </Label>
    </div>
  </div>
);
