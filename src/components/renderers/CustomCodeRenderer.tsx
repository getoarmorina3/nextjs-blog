"use client";

function CustomCodeRenderer({ data }: any) {
  data;

  return (
    <pre className="border rounded-md p-4">
      <code className="text-sm">{data.code}</code>
    </pre>
  );
}

export default CustomCodeRenderer;
