import { Bold, Italic, Underline } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEditorContext } from "../../../context/EditorContext";

export default function TextStyleControls() {
  const { editor } = useEditorContext();
  const controls = [
    {
      name: "bold",
      icon: <Bold className="h-4 w-4" />,
      onClick: () => editor?.chain().focus().toggleBold().run(),
    },
    {
      name: "italic",
      icon: <Italic className="h-4 w-4" />,
      onClick: () => editor?.chain().focus().toggleItalic().run(),
    },
    {
      name: "underline",
      icon: <Underline className="h-4 w-4" />,
      onClick: () => editor?.chain().focus().toggleUnderline().run(),
    },
  ];

  return (
    <>
      {controls.map((control) => (
        <TooltipProvider key={control.name}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label={control.name}
                onClick={control.onClick}
                className={cn(
                  "h-8 w-8",
                  editor?.isActive(control.name) && "is-active"
                )}
              >
                {control.icon}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              {control.name.charAt(0).toUpperCase() + control.name.slice(1)}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </>
  );
}
