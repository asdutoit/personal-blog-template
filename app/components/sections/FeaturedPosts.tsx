"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { BlogPostMeta } from "@/lib/blog";

interface FeaturedPostsProps {
  posts?: BlogPostMeta[];
}

function PostCard({ post, index }: { post: BlogPostMeta; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300"
    >
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
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          <Link href={`/blog/${post.slug}`} className="stretched-link">
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        <p className="text-gray-600 dark:text-gray-400 line-clamp-3">
          {post.excerpt}
        </p>

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
          </div>
          <ArrowRight className="w-5 h-5 text-primary-500 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.article>
  );
}

export function FeaturedPosts({ posts = [] }: FeaturedPostsProps) {
  // Show only featured posts, limit to 3
  const featuredPosts = posts.filter((post) => post.featured).slice(0, 3);
  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-4xl">
              Latest Articles
            </h2>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
              Insights on development, cloud engineering, and building great
              software
            </p>
          </motion.div>

          {/* Posts Grid */}
          {featuredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredPosts.map((post, index) => (
                <PostCard key={post.slug} post={post} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                No featured posts available yet. Check back soon for new
                content!
              </p>
            </div>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link href="/blog">
              <Button
                size="lg"
                className="group bg-blue-600 text-white text-md font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                View All Articles
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
