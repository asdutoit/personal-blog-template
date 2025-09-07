"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, User, Tag } from "lucide-react";
import { motion } from "framer-motion";

interface BlogPostClientProps {
  metadata: { [key: string]: any };
  children: React.ReactNode;
}

export default function BlogPostClient({
  metadata,
  children,
}: BlogPostClientProps) {
  const formattedDate = new Date(metadata.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen dark:bg-gray-950 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300 ease-out" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight text-gray-900 dark:text-gray-50">
            {metadata.title}
          </h1>

          {metadata.excerpt && (
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
              {metadata.excerpt}
            </p>
          )}

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            {metadata.author && (
              <div className="flex items-center gap-1.5">
                {/* Either use User Avatar icon or actual photo avatar of user */}
                {metadata.authorImage ? (
                  <Image
                    src={metadata.authorImage}
                    alt={metadata.author}
                    className="w-12 h-12 rounded-full"
                    width={64}
                    height={64}
                  />
                ) : (
                  <User className="w-4 h-4" />
                )}
                <span className="font-bold">{metadata.author}</span>
              </div>
            )}

            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <time dateTime={metadata.date}>{formattedDate}</time>
            </div>

            {metadata.readingTime && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{metadata.readingTime}</span>
              </div>
            )}
          </div>

          {/* Tags */}
          {metadata.tags && metadata.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-4">
              <Tag className="w-4 h-4 text-gray-500 dark:text-gray-500" />
              {metadata.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-medium bg-primary-100 dark:bg-gray-800 text-primary-700 dark:text-primary-300 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {metadata.heroImage && (
          <div className="mb-8 overflow-hidden rounded-lg shadow-lg">
            <Image
              src={metadata.heroImage}
              alt={metadata.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              width={600}
              height={600}
            />
          </div>
        )}

        <hr className="border-gray-200 dark:border-gray-800 mb-12" />

        {/* MDX Content */}
        <article className="prose dark:prose-invert lg:prose-xl mx-auto my-8 px-4 prose-headings:dark:text-gray-50 prose-p:dark:text-gray-300 prose-strong:dark:text-gray-100 prose-li:dark:text-gray-300 prose-code:dark:text-gray-200">
          {children}
        </article>
      </div>
    </div>
  );
}
