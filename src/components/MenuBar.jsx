const MenuBar = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="flex flex-wrap gap-2 border-b p-2 bg-white shadow-sm">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "btn-active" : "btn"}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "btn-active" : "btn"}
      >
        Italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "btn-active" : "btn"}
      >
        Underline
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={
          editor.isActive("heading", { level: 1 }) ? "btn-active" : "btn"
        }
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "btn-active" : "btn"}
      >
        • List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "btn-active" : "btn"}
      >
        1. List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "btn-active" : "btn"}
      >
        Blockquote
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "btn-active" : "btn"}
      >
        Code
      </button>
      <button
        onClick={() => editor.chain().focus().undo().run()}
        className="btn"
      >
        Undo
      </button>
      <button
        onClick={() => editor.chain().focus().redo().run()}
        className="btn"
      >
        Redo
      </button>
    </div>
  );
};
export default MenuBar;
