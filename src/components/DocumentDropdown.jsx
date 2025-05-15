import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { Button } from "./ui/button";
import { RenameDialog } from "./RenameDialog";
import { useEffect, useState } from "react";
import { ConfirmDeleteDialog } from "./ConfirmDeleteDialog";
import { deleteDoc } from "../services/documentService";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { deleteDocument } from "../features/document/documentSlice";
export default function DocumentDropdown({
  className,
  groupHover = false,
  doc,
  handleRedirect,
}) {
  const { user } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleDelete = (id) => {
    setIsLoading(true);
    deleteDoc(id)
      .then((res) => {
        dispatch(deleteDocument({ id }));
        toast.success("Document deleted successfully");
        setIsLoading(false);
        setIsOpen(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(
          error?.response?.data?.message || "Error deleting document"
        );
        setIsLoading(false);
      });
  };
  if (user?.id == doc?.userId) {
    return null;
  }
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger className={className} asChild>
        <Button
          variant="button"
          size="icon"
          onClick={handleOpen}
          aria-label="Open menu"
          className={`h-8 w-8 text-muted-foreground ${
            groupHover && "opacity-0 group-hover:opacity-100"
          }`}
        >
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleRedirect(doc)}>
          Open
        </DropdownMenuItem>
        <RenameDialog
          id={doc?.id}
          title={doc?.title}
          closeDropdown={() => setIsOpen(false)}
        />
        <DropdownMenuItem>Share</DropdownMenuItem>
        <DropdownMenuItem asChild>
          <ConfirmDeleteDialog
            onConfirm={() => handleDelete(doc.id)}
            closeDropdown={() => setIsOpen(false)}
            isLoading={isLoading}
          >
            <div className="hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 text-destructive">
              Delete
            </div>
          </ConfirmDeleteDialog>
        </DropdownMenuItem>{" "}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
