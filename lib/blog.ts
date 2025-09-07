import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  rawContent?: string; // For MDX
  date: string;
  readingTime: string;
  tags: string[];
  featured?: boolean;
  authorImage?: any;
  heroImage?: any;
  author?: any;
}

export interface BlogPostMeta {
  authorImage?: any;
  author?: any;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: string;
  tags: string[];
  featured?: boolean;
  heroImage?: any;
}

const postsDirectory = path.join(process.cwd(), "content");

export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.split(" ").length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export async function getAllBlogSlugs(): Promise<string[]> {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const markdownFiles = fileNames.filter(
      (name) =>
        (name.endsWith(".md") || name.endsWith(".mdx")) && name !== "README.md"
    );

    return markdownFiles.map((fileName) => fileName.replace(/\.(md|mdx)$/, ""));
  } catch (error) {
    console.error("Error reading markdown files for slugs:", error);
    return [];
  }
}

export async function getAllBlogPosts(): Promise<BlogPostMeta[]> {
  try {
    if (!fs.existsSync(postsDirectory)) {
      console.log("Posts directory does not exist:", postsDirectory);
      return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const markdownFiles = fileNames.filter(
      (name) =>
        (name.endsWith(".md") || name.endsWith(".mdx")) && name !== "README.md"
    );

    if (markdownFiles.length === 0) {
      console.log("No markdown files found in posts directory");
      return [];
    }

    const allPosts: BlogPostMeta[] = [];

    for (const fileName of markdownFiles) {
      try {
        const slug = fileName.replace(/\.(md|mdx)$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data } = matter(fileContents);

        // Skip if missing required fields
        if (!data.title || !data.date || !data.excerpt) {
          console.warn(
            `Skipping ${fileName}: missing required front matter fields`
          );
          continue;
        }

        allPosts.push({
          slug,
          title: data.title,
          excerpt: data.excerpt,
          date: data.date,
          readingTime: data.readingTime || calculateReadingTime(fileContents),
          tags: data.tags || [],
          featured: data.featured || false,
          authorImage: data.authorImage || null,
          author: data.author || "Unknown",
          heroImage: data.heroImage || null,
        });
      } catch (error) {
        console.error(`Error processing ${fileName}:`, error);
        continue;
      }
    }

    return allPosts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error("Error reading markdown files:", error);
    return [];
  }
}

export async function getFeaturedPosts(): Promise<BlogPostMeta[]> {
  const allPosts = await getAllBlogPosts();
  return allPosts.filter((post) => post.featured).slice(0, 3);
}
