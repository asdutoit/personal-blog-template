import React from "react";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getAllBlogSlugs } from "@/lib/blog";
import BlogPost from "@/app/components/blog/BlogPost";

interface Props {
  params: Promise<{
    slug: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;

  // Read the MDX file directly for metadata
  const postsDirectory = path.join(process.cwd(), "content");
  let filePath = path.join(postsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    filePath = path.join(postsDirectory, `${slug}.md`);
  }

  if (!fs.existsSync(filePath)) {
    return {
      title: "Post Not Found",
    };
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data: metadata } = matter(fileContents);

  console.log("Post metadata:", metadata);

  if (!metadata) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${metadata.title} - John Doe`,
    description: metadata.excerpt,
    openGraph: {
      title: metadata.title,
      description: metadata.excerpt,
      type: "article",
      publishedTime: metadata.date,
      authors: ["John Doe"],
    },
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const { default: Post } = await import(`@/content/${slug}.mdx`);

  // Read the MDX file to get frontmatter
  const postsDirectory = path.join(process.cwd(), "content");
  let filePath = path.join(postsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    filePath = path.join(postsDirectory, `${slug}.md`);
  }

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { content, data: metadata } = matter(fileContents);

  // console.log("Post metadata:", metadata);
  // console.log("Post content:", content);

  return <BlogPost metadata={metadata} slug={slug} content={content} />;
}

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export const dynamicParams = false;
