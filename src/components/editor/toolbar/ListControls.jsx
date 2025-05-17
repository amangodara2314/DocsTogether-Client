import { List, ListOrdered } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useEditorContext } from "../hooks/useEditorContext";

export default function ListControls() {
  const { editor } = useEditorContext();

  return (
    <ToggleGroup type="multiple">
      <ToggleGroupItem
        pressed={editor?.isActive("bulletList")}
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
      >
        <List />
      </ToggleGroupItem>
      <ToggleGroupItem
        pressed={editor?.isActive("orderedList")}
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
