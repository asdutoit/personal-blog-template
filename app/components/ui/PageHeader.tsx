"use client";

import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="text-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-5xl"
      >
        {title}
      </motion.h1>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400"
        >
          {description}
        </motion.p>
      )}
      {children && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}
