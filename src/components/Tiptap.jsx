import { useEffect, useRef } from "react";
import { EditorContent } from "@tiptap/react";

import CommentsPanel from "./collaboration/CommentsPanel";
import DocumentHeader from "./editor/DocumentHeader";
import Toolbar from "./editor/Toolbar";
import Ruler from "./editor/Ruler";
import { useEditorContext } from "../context/EditorContext";
import { useDispatch, useSelector } from "react-redux";
import {
  setLeftMargin,
  setRightMargin,
} from "../features/document/documentSlice";

export default function Tiptap() {
  const {
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
    showComments,
    documentContent,
    setDocumentContent,
    setShowComments,
  } = useEditorContext();
  const { leftMargin, rightMargin } = useSelector((state) => state.document);
  const dispatch = useDispatch();

  const pageRef = useRef(null);
  const editorRef = useRef(null);
  const rulerRef = useRef(null);
  const docContainerRef = useRef(null);
  const pageWidth = 8.5 * 96;

  useEffect(() => {
    if (pageRef.current) {
      const pageLeft = pageRef.current.getBoundingClientRect().left;
      const pageRight = pageRef.current.getBoundingClientRect().right;
      setRightMargin(pageRight);
      setLeftMargin(pageLeft);
    }
  }, []);

  useEffect(() => {
    if (editor) {
      editor.chain().focus().setFontFamily(fontFamily).run();
    }
  }, [editor, fontFamily]);

  useEffect(() => {
    if (!editor) return;

    editor.view.dom.style.paddingLeft = `${leftMargin}px`;
    editor.view.dom.style.paddingRight = `${rightMargin}px`;
    editor.view.dom.style.fontFamily = `${fontFamily}, sans-serif`;
  }, [editor, leftMargin, rightMargin, fontFamily]);

  useEffect(() => {
    if (!editor || !docContainerRef.current) return;

    const observer = new MutationObserver(() => {
      const container = docContainerRef.current;
      const editorHeight = editor.view.dom.scrollHeight;
      const A4HeightInPixels = 11.69 * 96;

      if (editorHeight > A4HeightInPixels - 96) {
        container.style.minHeight = `${editorHeight + 96}px`;
      } else {
        container.style.minHeight = `${A4HeightInPixels}px`;
      }
    });

    observer.observe(editor.view.dom, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, [editor]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!rulerRef.current || (!isDraggingLeft && !isDraggingRight)) return;

      const rulerRect = rulerRef.current.getBoundingClientRect();
      const position = Math.max(
        0,
        Math.min(e.clientX - rulerRect.left, pageWidth)
      );

      if (isDraggingLeft) {
        const newLeftMargin = Math.min(position, pageWidth - rightMargin - 200);
        dispatch(setLeftMargin(Math.max(0, newLeftMargin)));
      }

      if (isDraggingRight) {
        const newRightMargin = Math.max(0, pageWidth - position);
        if (pageWidth - newRightMargin > leftMargin + 200) {
          dispatch(setRightMargin(newRightMargin));
        }
      }
    };

    const handleMouseUp = () => {
      setIsDraggingLeft(false);
      setIsDraggingRight(false);
      localStorage.setItem("leftMargin", leftMargin.toString());
      localStorage.setItem("rightMargin", rightMargin.toString());
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDraggingLeft, isDraggingRight, leftMargin, rightMargin, pageWidth]);

  const rightMarginPosition = pageWidth - rightMargin;

  return (
    <div className="flex h-screen flex-col bg-gray-50">
      <DocumentHeader
        editor={editor}
        leftMargin={leftMargin}
        rightMargin={rightMargin}
        fontFamily={fontFamily}
      />
      <Toolbar
        editor={editor}
        fontSize={fontSize}
        fontFamily={fontFamily}
        setFontFamily={setFontFamily}
        setFontSize={setFontSize}
      />
      <Ruler
        editor={editor}
        pageWidth={pageWidth}
        rulerRef={rulerRef}
        leftMargin={leftMargin}
        rightMargin={rightMargin}
        rightMarginPosition={rightMarginPosition}
        setIsDraggingLeft={setIsDraggingLeft}
        setIsDraggingRight={setIsDraggingRight}
      />

      <div className="flex-1 overflow-auto bg-gray-100 flex justify-center">
        <div className="w-[8.5in] my-8" ref={docContainerRef}>
          <div className="flex">
            <div
              ref={pageRef}
              className="bg-white min-h-[11in] shadow-lg border rounded-sm py-8 flex-grow"
            >
              <EditorContent
                editor={editor}
                ref={editorRef}
                className={`min-h-[calc(11in-4rem)] focus:outline-none`}
              />
            </div>

            {showComments && (
              <CommentsPanel
                currentUser={currentUser}
                onClose={() => setShowComments(false)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
