import { useEditorContext } from "../../../context/EditorContext";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { headingIcons } from "../../../lib/constants";

export default function HeadingControls() {
  const { editor } = useEditorContext();

  if (!editor) return null;

  return [1, 2, 3].map((level) => {
    const isActive = editor.isActive("heading", { level });
    const Icon = headingIcons[level];
    return (
      <TooltipProvider key={level}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              aria-label={`Heading ${level}`}
              onClick={() =>
                editor.chain().focus().toggleHeading({ level }).run()
              }
              className={cn("btn", isActive)}
            >
              <Icon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Heading {level}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  });
}
