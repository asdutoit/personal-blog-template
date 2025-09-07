import { Metadata } from "next";
import { BlogList } from "@/app/components/blog/BlogList";
import { PageHeader } from "@/app/components/ui/PageHeader";
import { getAllBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog - John Doe",
  description:
    "Articles about development, cloud engineering, and technical insights.",
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <div className="container mx-auto px-4 py-16 sm:py-24">
      <PageHeader
        title="Blog"
        description="Thoughts on development, cloud engineering, and building great software."
      />
      <div className="mt-16">
        <BlogList posts={posts} />
      </div>
    </div>
  );
}
