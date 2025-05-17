import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useEditorContext } from "../hooks/useEditorContext";

export default function AlignmentControls() {
  const { editor } = useEditorContext();

  const alignments = [
    { value: "left", icon: <AlignLeft /> },
    { value: "center", icon: <AlignCenter /> },
    { value: "right", icon: <AlignRight /> },
  ];

  return (
    <ToggleGroup
      type="single"
      value={editor?.getAttributes("paragraph").textAlign}
      onValueChange={(value) => {
        editor?.chain().focus().setTextAlign(value).run();
      }}
    >
      {alignments.map((a) => (
        <ToggleGroupItem key={a.value} value={a.value}>
          {a.icon}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
