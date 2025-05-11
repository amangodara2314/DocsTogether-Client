import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { Button } from "./ui/button";
export default function DocumentDropdown({ className, groupHover = false }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={className} asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open menu"
          className={`h-8 w-8 text-muted-foreground ${
            groupHover && "opacity-0 group-hover:opacity-100"
          }`}
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="auto">
        <DropdownMenuItem>Share</DropdownMenuItem>
        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
