"use client";

import Image from "next/image";

function CustomImageRenderer({ data }: any) {
  const src = data.file.url;

  return (
    <div className="relative w-full mb-8">
      <Image
        alt="image"
        className="rounded-lg object-contain"
        style={{position: 'relative'}}
        width={1920}
        height={1080}
        src={src}
      />
    </div>
  );
}

export default CustomImageRenderer;
