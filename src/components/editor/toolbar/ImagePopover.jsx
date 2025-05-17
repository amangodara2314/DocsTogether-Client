import { useState } from "react";
import { useEditorContext } from "../hooks/useEditorContext";

export default function ImagePopover() {
  const { editor } = useEditorContext();
  const [url, setUrl] = useState("");

  const insertImage = () => {
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
      setUrl("");
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <input
        type="url"
        placeholder="Image URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border rounded px-2 py-1 text-sm"
      />
      <button
        onClick={insertImage}
        className="bg-green-500 text-white px-2 py-1 rounded text-sm"
      >
        Insert
      </button>
    </div>
  );
}
