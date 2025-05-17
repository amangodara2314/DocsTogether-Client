import { FileText, Printer, Save, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import UsersPanel from "../collaboration/UsersPanel";
import { useSelector } from "react-redux";
import { handlePrint, saveAs } from "../../lib/exportUtils";

export default function DocumentHeader({
  editor,
  leftMargin,
  rightMargin,
  fontFamily,
}) {
  const { document } = useSelector((store) => store.document);
  const handleTitleChange = (e) => {};
  const handleSave = (format) => {
    saveAs(
      format,
      editor,
      document?.title,
      fontFamily,
      leftMargin,
      rightMargin
    );
  };
  return (
    <header className="flex items-center border-b py-2 px-4 bg-white shadow-sm">
      <div className="flex items-center mr-8">
        <FileText className="mr-2 h-5 w-5 text-blue-600" />
        <span
          className="font-medium outline-none focus:border-b focus:border-blue-500"
          contentEditable
          suppressContentEditableWarning
          onBlur={handleTitleChange}
        >
          {document?.title || "Untitled Document"}
        </span>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="flex gap-1">
              <Save className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleSave("html")}>
              HTML (.html)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSave("text")}>
              Plain Text (.txt)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSave("markdown")}>
              Markdown (.md)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSave("pdf")}>
              PDF (.pdf)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handlePrint}
              >
                <Printer className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Print document</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setShowComments(!showComments)}
              >
                <MessageSquare className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Comments</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <UsersPanel />
      </div>
    </header>
  );
}
