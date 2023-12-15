"use client";

import { FC } from "react";
import dynamic from "next/dynamic";

const Output = dynamic(
  async () => (await import("editorjs-react-renderer")).default,
  { ssr: false }
);

interface EditorOutputProps {
  content: any;
}

const style = {
  paragraph: {
    fontSize: "1.125rem",
    lineHeight: "1.75rem",
    marginBottom: "1.25rem",
  },
};

const EditorOutput: FC<EditorOutputProps> = ({ content }) => {
  return <Output style={style} data={content} />;
};

export default EditorOutput;
