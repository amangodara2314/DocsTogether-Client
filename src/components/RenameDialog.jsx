import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { renameDoc } from "../services/documentService";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { renameDocument } from "../features/document/documentSlice";

export function RenameDialog({ id, title, closeDropdown }) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [documentName, setDocumentName] = useState(title);
  const [isLoading, setIsLoading] = useState(false);

  const openDialog = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const handleRename = () => {
    setIsLoading(true);
    renameDoc(id, { title: documentName })
      .then((res) => {
        dispatch(renameDocument({ id, name: documentName }));
        toast.success("Document renamed successfully");
        setIsLoading(false);
        setIsOpen(false);
        closeDropdown();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        toast.error(error.response.data.message || "Error renaming document");
      });
  };

  return (
    <>
      <DropdownMenuItem onClick={openDialog}>Rename</DropdownMenuItem>
      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) {
            closeDropdown();
          }
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Rename Document</DialogTitle>
            <DialogDescription>
              Make changes here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-right">
              Document Name
            </Label>
            <Input
              id="name"
              onChange={(e) => setDocumentName(e.target.value.trim())}
              defaultValue={title}
              className="col-span-3"
            />
          </div>
          <DialogFooter>
            <Button
              disabled={isLoading || documentName === title}
              onClick={handleRename}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
