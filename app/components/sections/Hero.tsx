"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const socialLinks = [
  {
    name: "LinkedIn",
    href: `${process.env.NEXT_PUBLIC_LINKEDIN_URL}`,
    icon: Linkedin,
  },
  {
    name: "GitHub",
    href: `${process.env.NEXT_PUBLIC_GITHUB_URL}`,
    icon: Github,
  },
  {
    name: "Email",
    href: `mailto:${process.env.NEXT_PUBLIC_EMAIL}`,
    icon: Mail,
  },
];

export function Hero() {
  const [imageError, setImageError] = React.useState(false);
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-white via-gray-50 to-primary-50 dark:from-gray-950 dark:via-gray-900 dark:to-primary-950">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-primary-100 dark:bg-primary-900 rounded-full mix-blend-multiply opacity-70 animate-blob" />
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-purple-100 dark:bg-purple-900 rounded-full mix-blend-multiply opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-100 dark:bg-pink-900 rounded-full mix-blend-multiply opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="container mx-auto px-4 py-16 sm:py-24 relative z-10">
        <div className="text-center">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="mb-8"
          >
            <div className="inline-block">
              <div className="relative">
                <div className="w-32 h-32 mx-auto rounded-full bg-linear-to-r from-primary-500 to-purple-600 p-1">
                  <div className="w-full h-full rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    {/* Conditionally render Image or initials using state and onError */}
                    {!imageError ? (
                      <Image
                        src={"/images/authors/image.png"}
                        alt={"john-doe-profile-image"}
                        width={100}
                        height={100}
                        className="content-center object-cover rounded-full w-full"
                        onError={() => setImageError(true)}
                        priority
                      />
                    ) : (
                      <span className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                        JD
                      </span>
                    )}
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-900 animate-pulse" />
              </div>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50 sm:text-6xl">
              Hi, I&apos;m{" "}
              <span className="bg-linear-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                John Doe
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 sm:text-2xl">
              Senior Backend Developer & Cloud Engineer
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-400"
          >
            8+ years of experience designing scalable cloud-native systems,
            backend services, and full stack applications. Expert in AWS,
            Kubernetes, and IaC tools with a proven track record of reducing
            infrastructure costs and implementing observability standards.
            Actively integrating AI and machine learning capabilities to drive
            intelligent solutions.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/blog">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-blue-600 text-md font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-white dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-400"
              >
                Read My Blog
              </Button>
            </Link>
            <Button
              variant="default"
              size="lg"
              onClick={scrollToAbout}
              className="w-full sm:w-auto text-md font-semibold bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700"
            >
              Learn More
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 flex justify-center space-x-6"
          >
            {socialLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.name}
                >
                  <IconComponent className="h-6 w-6" />
                </motion.a>
              );
            })}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.button
              onClick={scrollToAbout}
              className="text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              aria-label="Scroll to content"
            >
              <ArrowDown className="h-6 w-6" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
