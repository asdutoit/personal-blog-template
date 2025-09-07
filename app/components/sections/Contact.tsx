"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Mail,
  Github,
  Linkedin,
  Twitter,
  Send,
  MapPin,
  Phone,
  Loader2Icon,
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import toast from "react-hot-toast";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "johndoe@example.com",
    href: "mailto:johndoe@example.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "South Africa",
    href: null,
  },
  {
    icon: Phone,
    label: "Available for",
    value: "Remote Opportunities",
    href: null,
  },
];

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
    name: "Twitter",
    href: `${process.env.NEXT_PUBLIC_TWITTER_URL}`,
    icon: Twitter,
  },
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Show loading toast
    const loadingToast = toast.loading("Sending your message...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        // Success - dismiss loading and show success toast
        toast.dismiss(loadingToast);
        toast.success("Message sent successfully! I'll get back to you soon.", {
          duration: 5000,
        });

        // Reset form
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else if (response.status === 202) {
        // Fallback case - service unavailable but message logged
        toast.dismiss(loadingToast);
        toast.success(
          "Your message has been received! Due to high volume, email notifications are temporarily unavailable, but I'll respond directly to your email soon.",
          {
            duration: 8000,
          }
        );

        // Reset form
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        // Error from API
        toast.dismiss(loadingToast);
        toast.error(
          result.error || "Failed to send message. Please try again.",
          {
            duration: 7000,
          }
        );
      }
    } catch (error) {
      // Network or other error
      toast.dismiss(loadingToast);
      toast.error(
        "Something went wrong. Please try again later or email me directly.",
        {
          duration: 5000,
        }
      );
      console.error("Contact form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gray-50 dark:bg-gray-900">
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
              Let&apos;s Work Together
            </h2>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Have a project in mind? Let&apos;s discuss how we can bring your
              ideas to life. I&apos;m always open to new opportunities and
              interesting challenges.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-50 mb-6">
                  Get in Touch
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  I&apos;m currently available for freelance projects and
                  full-time opportunities. Whether you&apos;re a startup looking
                  to build your MVP or an established company seeking to expand
                  your team, I&apos;d love to hear from you.
                </p>

                <div className="space-y-6">
                  {contactInfo.map((item) => {
                    const IconComponent = item.icon;
                    const content = (
                      <div className="flex items-center space-x-4">
                        <div className="shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
                            {item.label}
                          </p>
                          <p className="text-gray-600 dark:text-gray-400">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    );

                    return item.href ? (
                      <a
                        key={item.label}
                        href={item.href}
                        className="block hover:bg-white dark:hover:bg-gray-800 p-3 rounded-lg transition-colors -mx-3"
                      >
                        {content}
                      </a>
                    ) : (
                      <div key={item.label} className="p-3 -mx-3">
                        {content}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-4">
                  Connect with me
                </h4>
                <div className="flex space-x-4">
                  {socialLinks.map((link) => {
                    const IconComponent = link.icon;
                    return (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:shadow-md transition-all duration-200"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={link.name}
                      >
                        <IconComponent className="w-6 h-6" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 transition-colors"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 transition-colors"
                    placeholder="Project Discussion"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full group bg-blue-600 text-md font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-white"
                  disabled={isSubmitting}
                >
                  <Send className="mr-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
