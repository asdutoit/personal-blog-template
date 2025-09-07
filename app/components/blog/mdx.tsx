import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import React from "react";
import remarkGfm from "remark-gfm";
import {
  Alert as AlertComponent,
  AlertDescription,
  AlertTitle,
} from "@/app/components/ui/alert";
import { Button as ButtonComponent } from "@/app/components/ui/button";
import {
  Card as CardComponent,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { CodeBlock } from "../CodeBlock";
import Counter from "../counter";
import { ChartAreaGradient } from "../charts/chart-area-gradient";
import { HeroCarousel } from "../ImageComponents/HeroCarousel";
import { ImageGrid } from "../ImageComponents/ImageGrid";

interface TableData {
  headers: string[];
  rows: string[][];
}

interface LinkProps {
  href?: string;
  children: React.ReactNode;
  [key: string]: any;
}

interface ImageProps {
  alt: string;
  [key: string]: any;
}

interface CodeProps {
  className?: string;
  children: React.ReactNode;
  [key: string]: any;
}

interface HeadingProps {
  children: React.ReactNode;
}

interface ComponentProps {
  [key: string]: any;
}

interface MDXProps {
  source: string;
  components?: Record<string, React.ComponentType<any>>;
  [key: string]: any;
}

function Table({ data }: { data: TableData }) {
  let headers = data.headers.map((header: string, index: number) => (
    <th key={index}>{header}</th>
  ));
  let rows = data.rows.map((row: string[], index: number) => (
    <tr key={index}>
      {row.map((cell: string, cellIndex: number) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function CustomLink(props: LinkProps) {
  const href = props.href || "";

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function RoundedImage(props: ImageProps) {
  const { alt, src, ...rest } = props;
  return (
    <Image src={src || ""} alt={alt || ""} className="rounded-lg" {...rest} />
  );
}

function Code({ children, className, ...props }: CodeProps) {
  const isInlineCode = !className;

  if (!isInlineCode) {
    return (
      <code className="px-1.5 py-0.5 rounded-sm bg-gray-100 dark:bg-gray-800 text-primary-600 dark:text-primary-400 font-mono text-sm">
        {children}
      </code>
    );
  }

  return (
    <code className={`font-mono text-sm leading-relaxed ${className}`}>
      {children}
    </code>
  );
}

function Card({
  children,
  title,
  description,
  footer,
  ...props
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
  footer?: string;
  [key: string]: any;
}) {
  return (
    <CardComponent>
      <CardHeader>
        <CardTitle>{title || "Default Title"}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footer && (
        <CardFooter>
          <p>{props.footer || null}</p>
        </CardFooter>
      )}
    </CardComponent>
  );
}

function slugify(str: React.ReactNode): string {
  if (typeof str === "string") {
    return str
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/&/g, "-and-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-");
  }

  // Handle non-string ReactNode by converting to string
  const stringValue = String(str) || "";
  return stringValue
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

function Alert({
  type,
  title,
  description,
  children,
}: {
  type: "info" | "success" | "warning" | "error";
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  const variantMap = {
    info: "default",
    success: "success",
    warning: "warning",
    error: "destructive",
  } as const;

  const variant = variantMap[type] || "default";

  return (
    <AlertComponent variant={variant} className="my-6">
      {title && <AlertTitle>{title}</AlertTitle>}
      {children && <AlertDescription>{children}</AlertDescription>}
    </AlertComponent>
  );
}

function YouTube({
  id,
  title = "YouTube video",
}: {
  id: string;
  title?: string;
}) {
  return (
    <div className="my-8 relative aspect-video w-full overflow-hidden rounded-lg shadow-lg">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}

function Grid({
  cols = "2",
  gap = "4",
  children,
}: {
  cols?: "1" | "2" | "3" | "4" | "5" | "6";
  gap?: "1" | "2" | "3" | "4" | "5" | "6" | "8";
  children: React.ReactNode;
}) {
  const getGridClasses = (cols: string) => {
    switch (cols) {
      case "1":
        return "grid-cols-1";
      case "2":
        return "grid-cols-1 md:grid-cols-2";
      case "3":
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      case "4":
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
      case "5":
        return "grid-cols-1 md:grid-cols-3 lg:grid-cols-5";
      case "6":
        return "grid-cols-1 md:grid-cols-3 lg:grid-cols-6";
      default:
        return "grid-cols-1 md:grid-cols-2";
    }
  };

  const gapClass =
    {
      "1": "gap-1",
      "2": "gap-2",
      "3": "gap-3",
      "4": "gap-4",
      "5": "gap-5",
      "6": "gap-6",
      "8": "gap-8",
    }[gap] || "gap-4";

  return (
    <div className={`grid ${getGridClasses(cols)} ${gapClass} my-6`}>
      {children}
    </div>
  );
}
function createHeading(level: number) {
  const Heading = ({ children }: HeadingProps) => {
    let slug = slugify(children);
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

function Button({
  href,
  children,
  ...props
}: {
  href?: string;
  children: React.ReactNode;
  [key: string]: any;
}) {
  return (
    <ButtonComponent asChild {...props}>
      {href ? (
        <Link href={href} className="no-underline hover:no-underline">
          {children}
        </Link>
      ) : (
        <span>{children}</span>
      )}
    </ButtonComponent>
  );
}

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  pre: ({ children }: any) => {
    const extractContent = (node: any): string => {
      if (typeof node === "string") return node;
      if (node?.props?.children) return extractContent(node.props.children);
      if (Array.isArray(node)) return node.map(extractContent).join("");
      return "";
    };

    const extractLanguage = (node: any): string | undefined => {
      if (node?.props?.className) {
        const match = node.props.className.match(/language-(\w+)/);
        return match ? match[1] : undefined;
      }
      return undefined;
    };

    const content = extractContent(children);
    const language = extractLanguage(children);

    return <CodeBlock language={language}>{content}</CodeBlock>;
  },
  Table,
  table: (props: ComponentProps) => (
    <table
      className="border-collapse border border-gray-300 my-6 w-full rounded-lg overflow-hidden shadow-sm"
      {...props}
    />
  ),
  thead: (props: ComponentProps) => (
    <thead className="bg-gray-50 dark:bg-gray-500 rounded" {...props} />
  ),
  tbody: (props: ComponentProps) => <tbody {...props} />,
  tr: (props: ComponentProps) => (
    <tr className="border-b border-gray-200 hover:bg-gray-50" {...props} />
  ),
  th: (props: ComponentProps) => (
    <th
      className="border border-gray-300 px-8 py-6 text-left font-semibold text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-200"
      {...props}
    />
  ),
  td: (props: ComponentProps) => (
    <td className="border border-gray-300 px-8 py-6 text-gray-600" {...props} />
  ),
  Alert,
  Button,
  Card,
  Grid,
  YouTube,
  Counter,
  ChartAreaGradient,
  HeroCarousel,
  ImageGrid,
};

export function CustomMDX(props: MDXProps) {
  console.log("MDX props:", props);
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
        },
      }}
    />
  );
}
