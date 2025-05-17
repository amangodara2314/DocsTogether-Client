import { useEditorContext } from "../hooks/useEditorContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function InsertTable() {
  const { editor } = useEditorContext();

  const insertTable = (rows, cols) => {
    if (!editor) return;

    editor
      .chain()
      .focus()
      .insertTable({
        rows,
        cols,
        withHeaderRow: true,
      })
      .run();

    const tableElement = editor.view.dom.querySelector("table");
    if (tableElement) {
      const colWidth = 100 / cols;
      const colgroup = document.createElement("colgroup");

      for (let i = 0; i < cols; i++) {
        const col = document.createElement("col");
        col.style.width = `${colWidth}%`;
        colgroup.appendChild(col);
      }

      tableElement.prepend(colgroup);
    }
  };

  return (
    <DropdownMenu>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Table className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>Insert table</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent>
        <div className="p-2">
          <div className="text-sm font-medium mb-2">Insert Table</div>
          <div className="grid grid-cols-3 gap-2">
            {[2, 3, 4].map((rows) =>
              [2, 3, 4].map((cols) => (
                <Button
                  key={`${rows}x${cols}`}
                  variant="outline"
                  size="sm"
                  className="h-8"
                  onClick={() => insertTable(rows, cols)}
                >
                  {rows}×{cols}
                </Button>
              ))
            )}
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
