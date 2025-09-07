import React from "react";
import { CustomMDX } from "./mdx";
import BlogPostClient from "./BlogPostClient";

interface BlogPostProps {
  metadata: { [key: string]: any };
  slug: string;
  content: string;
  children?: React.ReactNode;
}

export default function BlogPost({
  metadata,
  slug,
  content,
  children,
}: BlogPostProps) {
  return (
    <BlogPostClient metadata={metadata}>
      <CustomMDX source={content} />
    </BlogPostClient>
  );
}
