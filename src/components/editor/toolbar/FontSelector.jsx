import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { fontOptions, fontSizes } from "@/lib/constants";

export default function FontSelector({
  fontFamily,
  fontSize,
  setFontSize,
  setFontFamily,
  editor,
}) {
  const changeSize = (dir) => {
    const currentIndex = fontSizes.indexOf(fontSize);
    const newIndex = dir === "inc" ? currentIndex + 1 : currentIndex - 1;
    if (newIndex >= 0 && newIndex < fontSizes.length) {
      const newSize = fontSizes[newIndex];
      setFontSize(newSize);
      editor?.chain().focus().setFontSize(`${newSize}px`).run();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Select
        value={fontFamily}
        onValueChange={(val) => {
          setFontFamily(val);
          editor?.chain().focus().setFontFamily(val).run();
        }}
      >
        <SelectTrigger className="w-36 h-8 text-sm border-0 bg-slate-50 hover:bg-slate-100">
          <SelectValue placeholder="Font" />
        </SelectTrigger>
        <SelectContent>
          {fontOptions.map((f) => (
            <SelectItem key={f.value} value={f.value}>
              {f.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => changeSize("dec")}
        >
          <Minus className="h-3 w-3" />
        </Button>
        <Select
          value={fontSize.toString()}
          onValueChange={(val) => {
            const size = parseInt(val);
            setFontSize(size);
            editor?.chain().focus().setFontSize(`${size}px`).run();
          }}
        >
          <SelectTrigger className="w-16 h-8 text-sm border-0 bg-slate-50 hover:bg-slate-100">
            <SelectValue placeholder="Size" />
          </SelectTrigger>
          <SelectContent>
            {fontSizes.map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => changeSize("inc")}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
