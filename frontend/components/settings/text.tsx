import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  fontFamilyOptions,
  fontSizeOptions,
  fontWeightOptions,
} from "@/constants";

const selectConfigs = [
  { property: "fontFamily", placeholder: "Choose a font", options: fontFamilyOptions },
  { property: "fontSize", placeholder: "30", options: fontSizeOptions },
  { property: "fontWeight", placeholder: "Semibold", options: fontWeightOptions },
];

type TextProps = {
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  handleInputChange: (property: string, value: string) => void;
};

export const Text = ({ fontFamily, fontSize, fontWeight, handleInputChange }: TextProps) => (
  <div style={{ borderBottom: "1px solid #27272a" }} className="px-4 py-3">
    <p
      className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.12em]"
      style={{ color: "#52525b" }}
    >
      Text
    </p>

    <div className="flex flex-col gap-2">
      {/* Font family — full width */}
      <RenderSelect
        config={selectConfigs[0]}
        fontSize={fontSize}
        fontWeight={fontWeight}
        fontFamily={fontFamily}
        handleInputChange={handleInputChange}
      />

      {/* Size + Weight — side by side */}
      <div className="flex gap-2">
        {selectConfigs.slice(1).map((cfg) => (
          <RenderSelect
            key={cfg.property}
            config={cfg}
            fontSize={fontSize}
            fontWeight={fontWeight}
            fontFamily={fontFamily}
            handleInputChange={handleInputChange}
          />
        ))}
      </div>
    </div>
  </div>
);

type RenderSelectProps = {
  config: { property: string; placeholder: string; options: { label: string; value: string }[] };
  fontSize: string;
  fontWeight: string;
  fontFamily: string;
  handleInputChange: (property: string, value: string) => void;
};

export const RenderSelect = ({
  config,
  fontSize,
  fontWeight,
  fontFamily,
  handleInputChange,
}: RenderSelectProps) => (
  <Select
    key={config.property}
    onValueChange={(v) => handleInputChange(config.property, v)}
    value={
      config.property === "fontFamily"
        ? fontFamily
        : config.property === "fontSize"
        ? fontSize
        : fontWeight
    }
  >
    <SelectTrigger
      className="no-ring h-8 rounded-md border text-[12px] text-white"
      style={{
        background: "#18181b",
        borderColor: "#27272a",
        color: "#a1a1aa",
      }}
    >
      <SelectValue
        placeholder={
          config.property === "fontFamily"
            ? "Choose a font"
            : config.property === "fontSize"
            ? "30"
            : "Semibold"
        }
      />
    </SelectTrigger>
    <SelectContent
      style={{
        background: "#111113",
        border: "1px solid #27272a",
        color: "#a1a1aa",
      }}
    >
      {config.options.map((opt) => (
        <SelectItem
          key={opt.value}
          value={opt.value}
          className="text-[12px] focus:bg-[#e60000]/10 focus:text-white"
          style={{ color: "#a1a1aa" }}
        >
          {opt.label}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);
