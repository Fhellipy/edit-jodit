import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
import rehypeParse from "rehype-parse";
import { unified } from "unified";
import rehypeStringify from "rehype-stringify/lib";
import rehypeBase64ImageExtractor from "../absurdo";

const colors = {
  greyscale: [
    "#000000",
    "#434343",
    "#666666",
    "#999999",
    "#B7B7B7",
    "#CCCCCC",
    "#D9D9D9",
    "#EFEFEF",
    "#F3F3F3",
    "#FFFFFF",
  ],
  palette: [
    "#980000",
    "#FF0000",
    "#FF9900",
    "#FFFF00",
    "#00F0F0",
    "#00FFFF",
    "#4A86E8",
    "#0000FF",
    "#9900FF",
    "#FF00FF",
  ],
  full: [
    "#E6B8AF",
    "#F4CCCC",
    "#FCE5CD",
    "#FFF2CC",
    "#D9EAD3",
    "#D0E0E3",
    "#C9DAF8",
    "#CFE2F3",
    "#D9D2E9",
    "#EAD1DC",
    "#DD7E6B",
    "#EA9999",
    "#F9CB9C",
    "#FFE599",
    "#B6D7A8",
    "#A2C4C9",
    "#A4C2F4",
    "#9FC5E8",
    "#B4A7D6",
    "#D5A6BD",
    "#CC4125",
    "#E06666",
    "#F6B26B",
    "#FFD966",
    "#93C47D",
    "#76A5AF",
    "#6D9EEB",
    "#6FA8DC",
    "#8E7CC3",
    "#C27BA0",
    "#A61C00",
    "#CC0000",
    "#E69138",
    "#F1C232",
    "#6AA84F",
    "#45818E",
    "#3C78D8",
    "#3D85C6",
    "#674EA7",
    "#A64D79",
    "#85200C",
    "#990000",
    "#B45F06",
    "#BF9000",
    "#38761D",
    "#134F5C",
    "#1155CC",
    "#0B5394",
    "#351C75",
    "#733554",
    "#5B0F00",
    "#660000",
    "#783F04",
    "#7F6000",
    "#274E13",
    "#0C343D",
    "#1C4587",
    "#073763",
    "#20124D",
    "#4C1130",
  ],
};

const buttons = [
  "bold",
  "italic",
  "underline",
  "strikethrough",
  "|",
  "ul",
  "ol",
  "|",
  "font",
  "fontsize",
  "brush",
  "paragraph",
  "lineHeight",
  "|",
  "outdent",
  "indent",
  "align",
  "|",
  "file",
  "image",
  "video",
  "link",
  "table",
  "|",
  "superscript",
  "subscript",
  "|",
  "spellcheck",
  "cut",
  "selectall",
  "|",
  "copyformat",
  "fullsize",
  "undo",
  "redo",
  "print",
];

const buttonsXS = [
  "bold",
  "image",
  "|",
  "brush",
  "paragraph",
  "|",
  "align",
  "|",
  "undo",
  "redo",
  "|",
  "dots",
];

const config = {
  zIndex: 0,
  readonly: false,
  useSearch: false,
  uploader: {
    insertImageAsBase64URI: true,
  },
  language: "pt_br",
  enter: "P",
  toolbarSticky: false,
  toolbarStickyOffset: "NaN",
  showXPathInStatusbar: false,
  statusbar: false,
  activeButtonsInReadOnly: ["source", "fullsize", "print", "dots"],
  toolbarButtonSize: "middle",
  theme: "default",
  saveModeInCookie: false,
  spellcheck: true,
  width: "auto",
  height: "auto",
  minHeight: 200,
  direction: "",
  triggerChangeEvent: true,
  i18n: { pt_br: { "Type something": "Inserir texto..." } },
  tabIndex: -1,
  colors: colors,
  colorPickerDefaultTab: ["background", "text"],
  imageDefaultWidth: 300,
  sizeLG: 900,
  sizeMD: 700,
  sizeSM: 400,
  buttons: buttons,
  buttonsXS: buttonsXS,
  textIcons: false,
};

function Editor() {
  const editor = useRef(null);
  const [value, setValue] = useState<string>("");

  const handleUpdate = (newValue: string) => {
    setValue(newValue);
  };

  const upload = async () => {
    const file = await unified()
      .use(rehypeParse, { fragment: true })
      .use(rehypeBase64ImageExtractor, {
        handler: async ({ _, content }: any) => {
          return "https://upload.wikimedia.org/wikipedia/commons/d/dc/Eurasian_wolf.JPG";
        },
      })
      .use(rehypeStringify)
      .process(value);

    setValue(String(file));
  };

  return (
    <>
      <JoditEditor
        ref={editor}
        value={value}
        config={config as any}
        onBlur={handleUpdate}
      />

      <button onClick={() => upload()}>Enviar</button>
    </>
  );
}

export { Editor };
