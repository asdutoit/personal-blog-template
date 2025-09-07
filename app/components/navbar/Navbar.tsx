"use client";

import React, { useState, useEffect } from "react";
import { ThemeToggle } from "../ThemeToggle";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Skills", href: "/#skills" },
  { name: "Contact", href: "/#contact" },
  { name: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-lg border-b border-gray-200 dark:bg-gray-950/80 dark:border-gray-800"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/"
              className="flex items-center space-x-2 text-xl font-bold text-gray-900 dark:text-gray-50"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500 text-white">
                JD
              </div>
              <span className="hidden sm:block">John Doe</span>
            </Link>
          </motion.div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href))
                    ? "text-primary-600 dark:text-primary-400"
                    : "text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                }`}
              >
                {item.name}
                {(pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href))) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-primary-500"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>
          {/* Theme Toggle and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />

            {/* Mobile menu button */}
            <Button
              variant="default"
              size="sm"
              className="p-2 md:hidden bg-white dark:bg-gray-800 text-black dark:text-white border-1"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation - positioned absolutely outside nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-0 right-0 md:hidden z-40"
          >
            <div className="mx-4 sm:mx-6 lg:mx-8 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-800">
              <div className="py-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 text-base font-medium transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-800 ${
                      pathname === item.href ||
                      (item.href !== "/" && pathname.startsWith(item.href))
                        ? "text-primary-600 dark:text-primary-400"
                        : "text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
