import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

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
  {
    name: "Email",
    href: `mailto:${process.env.NEXT_PUBLIC_EMAIL}`,
    icon: Mail,
  },
];

const navigation = {
  company: [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ],
  resources: [
    { name: "Blog", href: "/blog" },
    { name: "Projects", href: "#projects" },
    { name: "Resume", href: "#resume" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500 text-white">
                JD
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                John Doe
              </span>
            </Link>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Developer & Cloud Engineer passionate about building great
              software and sharing knowledge.
            </p>
            {/* Social Links */}
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((item) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 transition-colors hover:text-primary-600 dark:hover:text-primary-400"
                    aria-label={item.name}
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-50">
              Professional Information
            </h3>
            <ul className="mt-4 space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-50">
              Resources
            </h3>
            <ul className="mt-4 space-y-3">
              {navigation.resources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter/CTA Section */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-50">
              Stay Updated
            </h3>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Get the latest posts and insights delivered to your inbox. (Coming
              soon!)
            </p>
            <div className="mt-4">
              <Link
                href="/blog"
                className="inline-flex items-center justify-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >
                Read Blog
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 dark:border-gray-800">
          <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} John Doe. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-600 dark:text-gray-400">
              <Link
                href="/privacy"
                className="hover:text-primary-600 dark:hover:text-primary-400"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="hover:text-primary-600 dark:hover:text-primary-400"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
