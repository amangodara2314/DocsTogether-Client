import { useEditor } from "@tiptap/react";
import { createContext, useContext, useState } from "react";
import { configureEditor } from "../configs/editor";
import { useSelector } from "react-redux";
import { activeUsers } from "../lib/constants";
import { set } from "react-hook-form";

const Context = createContext();
export default function EditorContext({ children }) {
  const [documentTitle, setDocumentTitle] = useState("Untitled document");
  const [fontSize, setFontSize] = useState(11);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [documentContent, setDocumentContent] = useState(
    "<p>Start typing your document here...</p>"
  );

  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);
  const [currentUser, setCurrentUser] = useState(activeUsers[0]);
  const [showComments, setShowComments] = useState(false);
  const { document, content, leftMargin, rightMargin, role } = useSelector(
    (store) => store.document
  );
  const editor = useEditor({
    extensions: configureEditor("Arial"),
    content: documentContent,
    onUpdate: ({ editor }) => {
      const content = editor.getHTML();
      setDocumentContent(content);
      localStorage.setItem("documentContent", content);
    },
    onSelectionUpdate: ({ editor }) => {
      if (editor.isActive("textStyle")) {
        const attrs = editor.getAttributes("textStyle");
        if (attrs.fontSize) {
          const size = Number.parseInt(attrs.fontSize.replace("px", ""));
          if (!isNaN(size)) {
            setFontSize(size);
          }
        }
        if (attrs.fontFamily) {
          setFontFamily(attrs.fontFamily);
        }
      }
    },
    editorProps: {
      attributes: {
        class: "min-h-[1056px] outline-none tiptap-editor",
        style: `padding-left: ${leftMargin}px; padding-right: ${rightMargin}px; font-family: ${fontFamily}, sans-serif;`,
      },
    },
  });
  return (
    <Context.Provider
      value={{
        editor,
        documentTitle,
        setDocumentTitle,
        fontSize,
        setFontSize,
        fontFamily,
        setFontFamily,
        isDraggingLeft,
        setIsDraggingLeft,
        isDraggingRight,
        setIsDraggingRight,
        currentUser,
        setCurrentUser,
        showComments,
        documentContent,
        setDocumentContent,
        setShowComments,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useEditorContext() {
  const contextValue = useContext(Context);
  if (!contextValue) {
    throw new Error("useEditorContext must be used within a EditorProvider");
  }
  return contextValue;
}
