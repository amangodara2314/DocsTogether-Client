import { Heading1, Heading2, Heading3 } from "lucide-react";

export const headerMethods = ["POST", "PUT", "PATCH"];

export const headingIcons = {
  1: Heading1,
  2: Heading2,
  3: Heading3,
};
export const templates = [
  {
    id: 1,
    name: "Blank document",
    type: "blank",
    color: "bg-card",
    icon: "plus",
    content: {},
  },
  {
    id: 2,
    name: "Resume",
    type: "Serif",
    color: "bg-muted",
    image: "/placeholder.svg?height=160&width=120",
    content: {},
  },
  {
    id: 3,
    name: "Resume",
    type: "Coral",
    color: "bg-rose-100 dark:bg-rose-950/30",
    image: "/placeholder.svg?height=160&width=120",
    content: {},
  },
  {
    id: 4,
    name: "Letter",
    type: "Spearmint",
    color: "bg-emerald-100 dark:bg-emerald-950/30",
    image: "/placeholder.svg?height=160&width=120",
    content: {},
  },
  {
    id: 5,
    name: "Project proposal",
    type: "Tropic",
    color: "bg-cyan-100 dark:bg-cyan-950/30",
    image: "/placeholder.svg?height=160&width=120",
    content: {},
  },
  {
    id: 6,
    name: "Brochure",
    type: "Geometric",
    color: "bg-violet-100 dark:bg-violet-950/30",
    image: "/placeholder.svg?height=160&width=120",
    content: {},
  },
  {
    id: 7,
    name: "Report",
    type: "Luxe",
    color: "bg-amber-100 dark:bg-amber-950/30",
    image: "/placeholder.svg?height=160&width=120",
    content: {},
  },
];

export const fontSizes = [
  8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 48, 60, 72,
  96,
];

export const fontOptions = [
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

export const textColors = [
  { value: "#000000", label: "Black" },
  { value: "#434343", label: "Dark Gray" },
  { value: "#666666", label: "Gray" },
  { value: "#999999", label: "Light Gray" },
  { value: "#ff0000", label: "Red" },
  { value: "#ff9900", label: "Orange" },
  { value: "#ffff00", label: "Yellow" },
  { value: "#00ff00", label: "Green" },
  { value: "#00ffff", label: "Cyan" },
  { value: "#0000ff", label: "Blue" },
  { value: "#9900ff", label: "Purple" },
  { value: "#ff00ff", label: "Magenta" },
];

export const highlightColors = [
  { value: "#ffff00", label: "Yellow" },
  { value: "#00ff00", label: "Green" },
  { value: "#00ffff", label: "Cyan" },
  { value: "#ff00ff", label: "Pink" },
  { value: "#ff9900", label: "Orange" },
  { value: "#0000ff", label: "Blue" },
  { value: "#ff0000", label: "Red" },
  { value: "#ffcc00", label: "Gold" },
  { value: "#cccccc", label: "Gray" },
  { value: "none", label: "None" },
];

export const activeUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Editor",
    avatar: "/placeholder.svg?height=40&width=40",
    color: "#4f46e5",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Viewer",
    avatar: "/placeholder.svg?height=40&width=40",
    color: "#10b981",
  },
  {
    id: 3,
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "Commenter",
    avatar: "/placeholder.svg?height=40&width=40",
    color: "#f59e0b",
  },
];

export const colors = ["#000000", "#ff0000", "#008000", "#0000ff", "#ffa500"];
