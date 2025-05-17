import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import FontFamily from "@tiptap/extension-font-family";
import FontSize from "@tiptap/extension-font-size";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
export const configureEditor = (defaultFontFamily) => {
  const customFontFamily = FontFamily.configure({
    types: ["textStyle"],
    defaultFamily: defaultFontFamily,
  });
  return [
    StarterKit.configure({
      heading: true,
      bulletList: true,
      orderedList: true,
    }),
    Link.configure({
      openOnClick: false,
    }),
    Image,
    TextAlign.configure({
      types: ["heading", "paragraph", "tableCell", "tableHeader"],
    }),
    TextStyle,
    Link,
    Underline,

    Color,
    Highlight.configure({
      multicolor: true,
    }),
    customFontFamily,
    FontSize.configure({
      types: ["textStyle"],
    }),
    Table.configure({
      resizable: false,
    }),
    TableRow,
    TableHeader,
    TableCell,
  ];
};
