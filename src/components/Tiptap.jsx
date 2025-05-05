import { useState, useEffect, useRef } from "react";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  LinkIcon,
  ImageIcon,
  ChevronDown,
  Plus,
  FileText,
  Undo2,
  Redo2,
  Printer,
  Minus,
  Palette,
  Highlighter,
  Save,
  Table,
} from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import UnderlineExtension from "@tiptap/extension-underline";
import LinkExtension from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import FontFamily from "@tiptap/extension-font-family";
import FontSize from "@tiptap/extension-font-size";
import TableExtension from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { set } from "react-hook-form";

const fontSizes = [
  8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 48, 60, 72,
  96,
];

const fontOptions = [
  { value: "Arial", label: "Arial" },
  { value: "TimesNewRoman", label: "Times New Roman" },
  { value: "CourierNew", label: "Courier New" },
  { value: "Georgia", label: "Georgia" },
  { value: "Verdana", label: "Verdana" },
  { value: "Helvetica", label: "Helvetica" },
  { value: "Tahoma", label: "Tahoma" },
  { value: "TrebuchetMS", label: "Trebuchet MS" },
  { value: "Garamond", label: "Garamond" },
  { value: "ComicSansMS", label: "Comic Sans MS" },
  { value: "Impact", label: "Impact" },
  { value: "LucidaSans", label: "Lucida Sans" },
];

const textColors = [
  { value: "#000000", label: "Black" },
  { value: "#434343", label: "Dark Gray" },
  { value: "#666666", label: "Gray" },
  { value: "#999999", label: "Light Gray" },
  { value: "#ffffff", label: "White" },
  { value: "#ff0000", label: "Red" },
  { value: "#ff9900", label: "Orange" },
  { value: "#ffff00", label: "Yellow" },
  { value: "#00ff00", label: "Green" },
  { value: "#00ffff", label: "Cyan" },
  { value: "#0000ff", label: "Blue" },
  { value: "#9900ff", label: "Purple" },
  { value: "#ff00ff", label: "Magenta" },
];

const highlightColors = [
  { value: "#ffff00", label: "Yellow" },
  { value: "#00ff00", label: "Green" },
  { value: "#00ffff", label: "Cyan" },
  { value: "#ff00ff", label: "Pink" },
  { value: "#ff9900", label: "Orange" },
  { value: "#0000ff", label: "Blue" },
];

export default function Tiptap() {
  const [documentTitle, setDocumentTitle] = useState("Untitled document");
  const [fontSize, setFontSize] = useState(11);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [documentContent, setDocumentContent] = useState(
    "<p>Start typing your document here...</p>"
  );
  const [leftMargin, setLeftMargin] = useState(50);
  const [rightMargin, setRightMargin] = useState(50);
  const [showRuler, setShowRuler] = useState(true);
  const [isTableMenuOpen, setIsTableMenuOpen] = useState(false);
  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);
  const pageRef = useRef(null);

  useEffect(() => {
    if (pageRef.current) {
      const pageLeft = pageRef.current.getBoundingClientRect().left;
      const pageRight = pageRef.current.getBoundingClientRect().right;
      setRightMargin(pageRight);
      setLeftMargin(pageLeft);
    }
  }, []);

  const editorRef = useRef(null);
  const rulerRef = useRef(null);
  const docContainerRef = useRef(null);
  const pageWidth = 8.5 * 96;

  const CustomFontSize = FontSize.configure({
    types: ["textStyle"],
    defaultSize: "11px",
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      UnderlineExtension,
      LinkExtension,
      Image,
      TextAlign.configure({
        types: ["heading", "paragraph", "tableCell", "tableHeader"],
      }),
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      FontFamily,
      CustomFontSize,
      TableExtension.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: documentContent,
    onUpdate: ({ editor }) => {
      setDocumentContent(editor.getHTML());

      localStorage.setItem("documentContent", editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "min-h-full outline-none",
        style: `font-size: 11px; padding-left: ${leftMargin}px; padding-right: ${rightMargin}px;`,
      },
    },
  });

  useEffect(() => {
    const savedContent = localStorage.getItem("documentContent");
    const savedTitle = localStorage.getItem("documentTitle");
    const savedLeftMargin = localStorage.getItem("leftMargin");
    const savedRightMargin = localStorage.getItem("rightMargin");

    if (savedContent) {
      setDocumentContent(savedContent);
      editor?.commands.setContent(savedContent);
    }
    if (savedTitle) {
      setDocumentTitle(savedTitle);
    }
    if (savedLeftMargin) {
      setLeftMargin(parseInt(savedLeftMargin));
    }
    if (savedRightMargin) {
      setRightMargin(parseInt(savedRightMargin));
    }
  }, [editor]);

  useEffect(() => {
    if (!editor) return;

    const autoSaveInterval = setInterval(() => {
      localStorage.setItem("documentContent", documentContent);
      localStorage.setItem("documentTitle", documentTitle);
      localStorage.setItem("leftMargin", leftMargin);
      localStorage.setItem("rightMargin", rightMargin);
    }, 10000);

    return () => clearInterval(autoSaveInterval);
  }, [editor, documentContent, documentTitle, leftMargin, rightMargin]);

  useEffect(() => {
    if (!editor) return;
    editor.view.dom.style.paddingLeft = `${leftMargin}px`;
    editor.view.dom.style.paddingRight = `${rightMargin}px`;
  }, [editor, leftMargin, rightMargin]);

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
        setLeftMargin(Math.max(0, newLeftMargin));
      }

      if (isDraggingRight) {
        const newRightMargin = Math.max(0, pageWidth - position);

        if (pageWidth - newRightMargin > leftMargin + 200) {
          setRightMargin(newRightMargin);
        }
      }
    };

    const handleMouseUp = () => {
      setIsDraggingLeft(false);
      setIsDraggingRight(false);

      localStorage.setItem("leftMargin", leftMargin);
      localStorage.setItem("rightMargin", rightMargin);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDraggingLeft, isDraggingRight, leftMargin, rightMargin, pageWidth]);

  const handlePrint = () => {
    const content = editor?.getHTML();
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>${documentTitle}</title>
          <style>
            @page { size: A4; margin: 0.5in; }
            body { font-family: ${fontFamily}, sans-serif; margin: 0; padding: 0; }
            .container { width: 8.27in; min-height: 11.69in; margin: 0 auto; padding: 0; }
          </style>
        </head>
        <body>
          <div class="container">${content}</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    setTimeout(() => printWindow.close(), 500);
  };

  const increaseFontSize = () => {
    const currentIndex = fontSizes.indexOf(fontSize);
    if (currentIndex < fontSizes.length - 1) {
      const newSize = fontSizes[currentIndex + 1];
      setFontSize(newSize);
      editor?.chain().focus().setFontSize(`${newSize}px`).run();
    }
  };

  const decreaseFontSize = () => {
    const currentIndex = fontSizes.indexOf(fontSize);
    if (currentIndex > 0) {
      const newSize = fontSizes[currentIndex - 1];
      setFontSize(newSize);
      editor?.chain().focus().setFontSize(`${newSize}px`).run();
    }
  };

  const handleFontSizeChange = (value) => {
    const newSize = Number.parseInt(value);
    setFontSize(newSize);
    editor?.chain().focus().setFontSize(`${newSize}px`).run();
  };

  const handleFontFamilyChange = (value) => {
    setFontFamily(value);
    editor?.chain().focus().setFontFamily(value).run();
  };

  const exportAsMarkdown = () => {
    const content = editor?.getHTML() || "";

    let markdown = content
      .replace(/<h1[^>]*>(.*?)<\/h1>/gi, "# $1\n\n")
      .replace(/<h2[^>]*>(.*?)<\/h2>/gi, "## $1\n\n")
      .replace(/<h3[^>]*>(.*?)<\/h3>/gi, "### $1\n\n")
      .replace(/<h4[^>]*>(.*?)<\/h4>/gi, "#### $1\n\n")
      .replace(/<h5[^>]*>(.*?)<\/h5>/gi, "##### $1\n\n")
      .replace(/<h6[^>]*>(.*?)<\/h6>/gi, "###### $1\n\n")
      .replace(/<p[^>]*>(.*?)<\/p>/gi, "$1\n\n")
      .replace(/<strong[^>]*>(.*?)<\/strong>/gi, "**$1**")
      .replace(/<em[^>]*>(.*?)<\/em>/gi, "*$1*")
      .replace(/<u[^>]*>(.*?)<\/u>/gi, "_$1_")
      .replace(/<li[^>]*>(.*?)<\/li>/gi, "- $1\n")
      .replace(/<ul[^>]*>(.*?)<\/ul>/gi, "$1\n")
      .replace(/<ol[^>]*>(.*?)<\/ol>/gi, "$1\n")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<[^>]*>/g, "");

    markdown = markdown.replace(/\n\s*\n\s*\n/g, "\n\n");

    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${documentTitle}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const saveAs = (format) => {
    const content = editor?.getHTML() || "";
    let blob, mimeType, fileExtension;

    switch (format) {
      case "html":
        const htmlContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <title>${documentTitle}</title>
              <style>
                body { font-family: ${fontFamily}, sans-serif; margin: 0; padding: 0; }
                .container { width: 8.27in; margin: 0 auto; padding-left: ${leftMargin}px; padding-right: ${rightMargin}px; }
              </style>
            </head>
            <body>
              <div class="container">${content}</div>
            </body>
          </html>
        `;
        blob = new Blob([htmlContent], { type: "text/html" });
        fileExtension = "html";
        break;
      case "text":
        const textContent = content
          .replace(/<[^>]*>/g, "")
          .replace(/&nbsp;/g, " ")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&amp;/g, "&");
        blob = new Blob([textContent], { type: "text/plain" });
        fileExtension = "txt";
        break;
      case "markdown":
        return exportAsMarkdown();
      default:
        return;
    }

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${documentTitle}.${fileExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const insertTable = (rows, cols) => {
    if (!editor) return;
    editor
      .chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow: false })
      .run();
    setIsTableMenuOpen(false);
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.innerText;
    setDocumentTitle(newTitle);
    localStorage.setItem("documentTitle", newTitle);
  };

  const rightMarginPosition = pageWidth - rightMargin;

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      {/* Top Toolbar */}
      <header className="flex items-center border-b py-2 px-4">
        <div className="flex items-center mr-8">
          <FileText className="mr-2 h-5 w-5 text-blue-600" />
          <span
            className="font-medium"
            contentEditable
            suppressContentEditableWarning
            onBlur={handleTitleChange}
          >
            {documentTitle}
          </span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex gap-1">
                File
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => {
                  editor?.commands.clearContent();
                  setDocumentTitle("Untitled document");
                }}
              >
                New Document
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handlePrint}>
                Print...
              </DropdownMenuItem>
              <DropdownMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-full text-left">
                    Save As...
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => saveAs("html")}>
                      HTML (.html)
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => saveAs("text")}>
                      Plain Text (.txt)
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => saveAs("markdown")}>
                      Markdown (.md)
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => saveAs("html")}
            title="Save document"
          >
            <Save className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handlePrint}
            title="Print document"
          >
            <Printer className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-8"
            onClick={() => setShowRuler(!showRuler)}
          >
            {showRuler ? "Hide Ruler" : "Show Ruler"}
          </Button>
        </div>
      </header>

      <div className="border-b px-4 py-1 flex items-center flex-wrap bg-slate-100">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => editor?.chain().focus().undo().run()}
          disabled={!editor?.can().undo()}
        >
          <Undo2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => editor?.chain().focus().redo().run()}
          disabled={!editor?.can().redo()}
        >
          <Redo2 className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="mx-2 h-6" />

        <Select value={fontFamily} onValueChange={handleFontFamilyChange}>
          <SelectTrigger className="w-36 h-8 text-sm ml-2 border-0 bg-slate-50 hover:bg-slate-100">
            <SelectValue placeholder="Arial" />
          </SelectTrigger>
          <SelectContent>
            {fontOptions.map((font) => (
              <SelectItem key={font.value} value={font.value}>
                {font.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex items-center ml-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={decreaseFontSize}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <Select
            value={fontSize.toString()}
            onValueChange={handleFontSizeChange}
          >
            <SelectTrigger className="w-16 h-8 text-sm border-0 bg-slate-50 hover:bg-slate-100">
              <SelectValue placeholder="11" />
            </SelectTrigger>
            <SelectContent>
              {fontSizes.map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={increaseFontSize}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        <Separator orientation="vertical" className="mx-2 h-6" />
        <Button
          variant="ghost"
          size="icon"
          className={cn("h-8 w-8", editor?.isActive("bold") && "bg-slate-200")}
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8",
            editor?.isActive("italic") && "bg-slate-200"
          )}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8",
            editor?.isActive("underline") && "bg-slate-200"
          )}
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
        >
          <Underline className="h-4 w-4" />
        </Button>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Palette className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-2">
            <div className="grid grid-cols-6 gap-1">
              {textColors.map((color) => (
                <Button
                  key={color.value}
                  variant="ghost"
                  className="h-6 w-6 p-0 rounded-sm"
                  style={{ backgroundColor: color.value }}
                  onClick={() =>
                    editor?.chain().focus().setColor(color.value).run()
                  }
                />
              ))}
            </div>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Highlighter className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-2">
            <div className="grid grid-cols-6 gap-1">
              {highlightColors.map((color) => (
                <Button
                  key={color.value}
                  variant="ghost"
                  className="h-6 w-6 p-0 rounded-sm"
                  style={{ backgroundColor: color.value }}
                  onClick={() =>
                    editor
                      ?.chain()
                      .focus()
                      .toggleHighlight({ color: color.value })
                      .run()
                  }
                />
              ))}
            </div>
          </PopoverContent>
        </Popover>
        <Separator orientation="vertical" className="mx-2 h-6" />
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8",
            editor?.isActive({ textAlign: "left" }) && "bg-slate-200"
          )}
          onClick={() => editor?.chain().focus().setTextAlign("left").run()}
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8",
            editor?.isActive({ textAlign: "center" }) && "bg-slate-200"
          )}
          onClick={() => editor?.chain().focus().setTextAlign("center").run()}
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8",
            editor?.isActive({ textAlign: "right" }) && "bg-slate-200"
          )}
          onClick={() => editor?.chain().focus().setTextAlign("right").run()}
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="mx-2 h-6" />
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8",
            editor?.isActive("bulletList") && "bg-slate-200"
          )}
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8",
            editor?.isActive("orderedList") && "bg-slate-200"
          )}
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Separator orientation="vertical" className="mx-2 h-6" />
        <Button
          variant="ghost"
          size="icon"
          className={cn("h-8 w-8", editor?.isActive("link") && "bg-slate-200")}
          onClick={() => {
            const url = window.prompt("URL");
            if (url) {
              editor?.chain().focus().setLink({ href: url }).run();
            }
          }}
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => {
            const url = window.prompt("Image URL");
            if (url) {
              editor?.chain().focus().setImage({ src: url }).run();
            }
          }}
        >
          <ImageIcon className="h-4 w-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Table className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <div className="p-2">
              <div className="text-sm font-medium mb-2">Insert Table</div>
              <div className="grid grid-cols-3 gap-2">
                {[2, 3, 4].map((rows) =>
                  [2, 3, 4].map((cols) => (
                    <Button
                      key={`${rows}x${cols}`}
                      variant="outline"
                      size="sm"
                      className="h-8"
                      onClick={() => insertTable(rows, cols)}
                    >
                      {rows}×{cols}
                    </Button>
                  ))
                )}
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {showRuler && (
        <div className="pr-2">
          <div
            ref={rulerRef}
            className="relative h-8 bg-white border-b border-gray-300 select-none rounded"
            style={{ width: `${pageWidth}px`, margin: "0 auto" }}
          >
            <div className="absolute inset-0 flex">
              {[...Array(100)].map((_, i) => (
                <div
                  key={i}
                  className="flex-1 flex flex-col items-center justify-end"
                  style={{ maxWidth: "10px" }}
                >
                  <div
                    className={`${
                      i % 10 === 0
                        ? "h-3 w-0.5 bg-black"
                        : i % 5 === 0
                        ? "h-2 w-0.5 bg-gray-600"
                        : "h-1 w-0.5 bg-gray-400"
                    }`}
                  ></div>
                  {i % 10 === 0 && <span className="text-xs">{i}</span>}
                </div>
              ))}
            </div>

            <div
              onMouseDown={() => setIsDraggingLeft(true)}
              className="absolute top-0 h-full w-1 bg-blue-500 cursor-ew-resize"
              style={{ left: `${leftMargin}px` }}
              title="Drag to adjust left margin"
            />

            <div
              onMouseDown={() => setIsDraggingRight(true)}
              className="absolute top-0 h-full w-1 bg-red-500 cursor-ew-resize"
              style={{ left: `${rightMarginPosition}px` }}
              title="Drag to adjust right margin"
            />
          </div>
        </div>
      )}

      <div className="flex-1 overflow-auto bg-gray-100 flex justify-center">
        <div className="w-[8.5in] my-8" ref={docContainerRef}>
          <div
            ref={pageRef}
            className="bg-white min-h-[11in] shadow-md border py-8"
          >
            <EditorContent
              editor={editor}
              ref={editorRef}
              className="min-h-[calc(11in-4rem)] focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
