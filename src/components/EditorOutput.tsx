"use client";

import { FC } from "react";
import dynamic from "next/dynamic";
import CustomCodeRenderer from "./renderers/CustomCodeRenderer";

const Output = dynamic(
  async () => (await import("editorjs-react-renderer")).default,
  { ssr: false }
);

interface EditorOutputProps {
  content: any;
}

const renderers = {
  code: CustomCodeRenderer,
};

const style = {
  paragraph: {
    fontSize: "1.125rem",
    lineHeight: "1.75rem",
    marginBottom: "1.25rem",
  },
};

const EditorOutput: FC<EditorOutputProps> = ({ content }) => {
  return <Output style={style} data={content} renderers={renderers} />;
};

export default EditorOutput;
