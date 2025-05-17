import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  LinkIcon,
  List,
  ListOrdered,
  Minus,
  Palette,
  Plus,
  Redo2,
  Table,
  Undo2,
  Underline,
  Heading1,
  Heading2,
  Heading3,
  ImageIcon,
  Highlighter,
  HelpCircle,
} from "lucide-react";
import {
  fontOptions,
  fontSizes,
  highlightColors,
  textColors,
} from "../../lib/constants";
import { cn } from "../../lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import UndoRedoControls from "./toolbar/UndoRedoControls";
import FontSelector from "./toolbar/FontSelector";
import HeadingControls from "./toolbar/HeadingControls";
import TextStyleControls from "./toolbar/TextStyleControls";
import ColorControls from "./toolbar/ColorControls";
export default function Toolbar({
  editor,
  fontFamily,
  fontSize,
  setFontSize,
  setFontFamily,
}) {
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

  return (
    <div className="border-b px-4 py-1 flex items-center flex-wrap gap-1 bg-white shadow-sm">
      <UndoRedoControls editor={editor} />

      <Separator orientation="vertical" className="mx-2 h-6" />

      <FontSelector
        editor={editor}
        fontFamily={fontFamily}
        fontSize={fontSize}
        setFontFamily={setFontFamily}
        setFontSize={setFontSize}
      />

      <Separator orientation="vertical" className="mx-2 h-6" />

      <HeadingControls />
      <Separator orientation="vertical" className="mx-2 h-6" />
      <TextStyleControls />
      <ColorControls />

      <Separator orientation="vertical" className="mx-2 h-6" />

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
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
          </TooltipTrigger>
          <TooltipContent>Align left</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8",
                editor?.isActive({ textAlign: "center" }) && "bg-slate-200"
              )}
              onClick={() =>
                editor?.chain().focus().setTextAlign("center").run()
              }
            >
              <AlignCenter className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Align center</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8",
                editor?.isActive({ textAlign: "right" }) && "bg-slate-200"
              )}
              onClick={() =>
                editor?.chain().focus().setTextAlign("right").run()
              }
            >
              <AlignRight className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Align right</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Separator orientation="vertical" className="mx-2 h-6" />

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8",
                editor?.isActive("bulletList") && "bg-slate-200"
              )}
              onClick={() => {
                editor?.chain().focus().toggleBulletList().run();
              }}
            >
              <List className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Bullet list</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8",
                editor?.isActive("orderedList") && "bg-slate-200"
              )}
              onClick={() => {
                editor?.chain().focus().toggleOrderedList().run();
              }}
            >
              <ListOrdered className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Numbered list</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Separator orientation="vertical" className="mx-2 h-6" />

      <Popover>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-8 w-8",
                    editor?.isActive("link") && "bg-slate-200"
                  )}
                >
                  <LinkIcon className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent>Insert link</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <PopoverContent className="w-80 p-3">
          <div className="space-y-2">
            <h4 className="font-medium">Insert Link</h4>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="https://example.com"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                id="link-url"
              />
              <Button
                onClick={() => {
                  const url = document.getElementById("link-url")?.value;
                  if (url) {
                    editor?.chain().focus().setLink({ href: url }).run();
                  }
                }}
              >
                Apply
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      <Popover>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ImageIcon className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent>Insert image</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <PopoverContent className="w-80 p-3">
          <div className="space-y-2">
            <h4 className="font-medium">Insert Image</h4>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                id="image-url"
              />
              <Button
                onClick={() => {
                  const url = document.getElementById("image-url")?.value;
                  if (url) {
                    editor?.chain().focus().setImage({ src: url }).run();
                  }
                }}
              >
                Insert
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
