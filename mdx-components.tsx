import type { MDXComponents } from "mdx/types";
import Image, { ImageProps } from "next/image";
import Counter from "@/app/components/counter";

const components: MDXComponents = {
  Counter,
  h1: (props) => (
    <h1 className="text-5xl font-bold my-8 text-gray-700" {...props} />
  ),
  h2: (props) => (
    <h2 className="text-4xl font-bold my-6 text-gray-700" {...props} />
  ),
  h3: (props) => (
    <h3 className="text-3xl font-bold my-4 text-gray-700" {...props} />
  ),
  h4: (props) => (
    <h4 className="text-2xl font-bold my-3 text-gray-700" {...props} />
  ),
  h5: (props) => (
    <h5 className="text-xl font-bold my-2 text-gray-700" {...props} />
  ),
  h6: (props) => (
    <h6 className="text-lg font-bold my-1 text-gray-700" {...props} />
  ),
  p: (props) => <p className="my-4 text-gray-600" {...props} />,
  a: (props) => <a className="text-blue-600 hover:underline" {...props} />,
  ul: (props) => <ul className="list-disc list-inside my-4" {...props} />,
  ol: (props) => <ol className="list-decimal list-inside my-4" {...props} />,
  li: (props) => <li className="my-2" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-4"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="bg-gray-100 rounded-lg p-4 overflow-x-auto my-4"
      {...props}
    />
  ),
  code: (props) => (
    <code className="bg-gray-200 rounded px-1 py-0.5 text-sm" {...props} />
  ),
  img: (props) => (
    <Image
      sizes="100vw"
      style={{ width: "100%", height: "auto" }}
      {...(props as ImageProps)}
    />
  ),
  table: (props) => (
    <table
      className="border-collapse border border-gray-300 my-4 w-full"
      {...props}
    />
  ),
  thead: (props) => <thead className="bg-gray-50" {...props} />,
  tbody: (props) => <tbody {...props} />,
  tr: (props) => <tr className="border-b border-gray-200" {...props} />,
  th: (props) => (
    <th
      className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700"
      {...props}
    />
  ),
  td: (props) => (
    <td className="border border-gray-300 px-4 py-2 text-gray-600" {...props} />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
