import { useEditorContext } from "../../../context/EditorContext";
import { highlightColors, textColors } from "../../../lib/constants";
import { darkenColor } from "../../../lib/utils";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircleOff, HelpCircle, Highlighter, Palette } from "lucide-react";

export default function ColorControls() {
  const { editor } = useEditorContext();

  return (
    <>
      <Popover>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Palette className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent>Text color</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <PopoverContent className="w-64 p-2">
          <div className="grid grid-cols-6 gap-1">
            {textColors.map((color) => (
              <Button
                key={color.value}
                variant="ghost"
                className={`h-6 w-6 p-0 rounded-full ${
                  editor.isActive("textStyle", { color: color.value })
                    ? "ring-2 ring-ring"
                    : ""
                } cursor-pointer opacity-90 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}
                style={{
                  backgroundColor: color.value,
                  borderColor: darkenColor(color.value, 80),
                }}
                onClick={() =>
                  editor?.chain().focus().setColor(color.value).run()
                }
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>
      <Popover>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Highlighter className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent>Highlight</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <PopoverContent className="w-64 p-2">
          <div className="grid grid-cols-6 gap-1">
            {highlightColors.map((color) => (
              <Button
                key={color.value}
                variant="ghost"
                className={`h-6 w-6 p-0 rounded-full ${
                  editor.isActive("highlight", { color: color.value })
                    ? "ring-2 ring-ring"
                    : ""
                } flex items-center justify-center cursor-pointer opacity-90 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`}
                style={{
                  backgroundColor:
                    color.value === "none" ? "white" : color.value,
                  border: darkenColor(color.value, 80),
                }}
                onClick={() => {
                  if (color.value === "none") {
                    editor?.chain().focus().unsetHighlight().run();
                  } else {
                    editor
                      ?.chain()
                      .focus()
                      .toggleHighlight({ color: color.value })
                      .run();
                  }
                }}
              >
                {color.value === "none" && (
                  <CircleOff className="h-3 w-3 text-gray-400" />
                )}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
