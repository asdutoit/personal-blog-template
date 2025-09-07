"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Clock, ArrowRight, Search, Tag, User } from "lucide-react";
import { useState, useMemo } from "react";
import { BlogPostMeta } from "@/lib/blog";
import Image from "next/image";

interface BlogListProps {
  posts?: BlogPostMeta[];
}

function PostCard({ post, index }: { post: BlogPostMeta; index: number }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className={`group relative bg-white dark:bg-gray-950 rounded-2xl p-6 hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300 cursor-pointer h-full ${
          post.featured
            ? "border-2 border-primary-300 dark:border-primary-700 shadow-lg shadow-primary-100/50 dark:shadow-primary-900/50"
            : "border border-gray-200 dark:border-gray-800"
        }`}
      >
        {post.featured && (
          <div className="absolute -top-2 -right-2 bg-primary-500 text-white px-3 py-1 rounded-full text-xs font-medium z-10">
            Featured
          </div>
        )}

        <div className="space-y-4">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="text-gray-600 dark:text-gray-400">{post.excerpt}</p>

          {/* Meta */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {post.readingTime}
              </div>
              <div className="flex items-center space-x-3">
                {post.authorImage ? (
                  <Image
                    src={post.authorImage}
                    alt={post.author}
                    className="w-8 h-8 rounded-full"
                    width={64}
                    height={64}
                  />
                ) : (
                  <User className="w-4 h-4" />
                )}
                <span className="">{post.author}</span>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-primary-500 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </motion.article>
    </Link>
  );
}

export function BlogList({ posts = [] }: BlogListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Memoize the list of unique tags to avoid recalculating on every render
  const allTags = useMemo(
    () => Array.from(new Set(posts.flatMap((post) => post.tags))).sort(),
    [posts]
  );

  // Memoize filtered posts to avoid re-filtering on every render
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = !selectedTag || post.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [posts, searchTerm, selectedTag]);

  return (
    <div className="space-y-8">
      {/* Search and Filter */}
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 outline-none"
          />
        </div>

        {/* Tag Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
              !selectedTag
                ? "bg-primary-500 text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <Tag className="w-4 h-4 inline mr-1" />
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                selectedTag === tag
                  ? "bg-primary-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        {filteredPosts.length === posts.length
          ? `Showing all ${posts.length} articles`
          : `Found ${filteredPosts.length} of ${posts.length} articles`}
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredPosts.map((post, index) => (
          <PostCard key={post.slug} post={post} index={index} />
        ))}
      </div>

      {/* No Results */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-2">
            No articles found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search terms or clearing the filters.
          </p>
        </div>
      )}
    </div>
  );
}
