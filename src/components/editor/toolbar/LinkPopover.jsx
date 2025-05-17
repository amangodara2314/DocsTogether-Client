import { useState } from "react";
import { useEditorContext } from "../hooks/useEditorContext";

export default function LinkPopover() {
  const { editor } = useEditorContext();
  const [url, setUrl] = useState("");

  const applyLink = () => {
    if (url) {
      editor
        ?.chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <input
        type="url"
        placeholder="Paste link"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border rounded px-2 py-1 text-sm"
      />
      <button
        onClick={applyLink}
        className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
      >
        Apply
      </button>
    </div>
  );
}
