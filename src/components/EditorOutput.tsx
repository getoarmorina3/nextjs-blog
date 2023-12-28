"use client";

import { FC } from "react";
import dynamic from "next/dynamic";
import CustomCodeRenderer from "./renderers/CustomCodeRenderer";
import CustomImageRenderer from "./renderers/CustomImageRenderer";

const Output = dynamic(
  async () => (await import("editorjs-react-renderer")).default,
  { ssr: false }
);

interface EditorOutputProps {
  content: any;
}

const renderers = {
  code: CustomCodeRenderer,
  image: CustomImageRenderer,
};

const style = {
  paragraph: {
    fontSize: "1.125rem",
    lineHeight: "1.75rem",
    marginBottom: "1.25rem",
  },
  header: {
    h1: {
      fontWeight: "bold",
      fontSize: "3rem",
      lineHeight: "1",
    },
    h2: {
      fontWeight: "bold",
      fontSize: "2.25rem",
      lineHeight: "2.5rem",
    },
    h3: {
      fontWeight: "bold",
      fontSize: "1.875rem",
      lineHeight: "2.25rem",
    },
    h4: {
      fontWeight: "bold",
      fontSize: "1.5rem",
      lineHeight: "2rem",
    },
    h5: {
      fontWeight: "bold",
      fontSize: "1.25rem",
      lineHeight: "1.75rem",
    },
    h6: {
      fontWeight: "bold",
      fontSize: "1.125rem",
      lineHeight: "1.75rem",
    },
  },
};

const EditorOutput: FC<EditorOutputProps> = ({ content }) => {
  return <Output style={style} data={content} renderers={renderers} />;
};

export default EditorOutput;
