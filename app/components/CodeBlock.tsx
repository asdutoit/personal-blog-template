"use client";

import React, { useEffect, useState, useRef } from "react";
import { Check, Copy } from "lucide-react";
import Prism from "prismjs";

// Import Prism theme and languages
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-python";
import "prismjs/components/prism-go";
import "prismjs/components/prism-java";
import "prismjs/components/prism-docker";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-hcl";

interface CodeBlockProps {
  children: string;
  language?: string;
  className?: string;
}

export function CodeBlock({
  children,
  language,
  className = "",
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);
  const lang = language || "text";

  useEffect(() => {
    if (codeRef.current && Prism.languages[lang]) {
      Prism.highlightElement(codeRef.current);
    }
  }, [children, lang]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  return (
    <div className="relative group mb-6">
      <pre
        className={`bg-gray-900 dark:bg-gray-950 text-gray-100 rounded-lg p-6 overflow-x-auto border border-gray-200 dark:border-gray-800`}
        style={{
          userSelect: "text",
          WebkitUserSelect: "text",
          MozUserSelect: "text",
          msUserSelect: "text",
        }}
      >
        <code
          ref={codeRef}
          className={`language-${lang} block font-mono text-sm leading-relaxed`}
          style={{
            userSelect: "text",
            WebkitUserSelect: "text",
            MozUserSelect: "text",
            msUserSelect: "text",
          }}
        >
          {children}
        </code>
      </pre>

      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 rounded-md bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-all duration-200 opacity-0 group-hover:opacity-100"
        style={{ zIndex: 10 }}
        title={copied ? "Copied!" : "Copy to clipboard"}
        type="button"
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </button>

      {/* Language label */}
      {language && (
        <span className="absolute top-3 right-14 text-xs font-mono text-gray-500 uppercase tracking-wide">
          {lang}
        </span>
      )}
    </div>
  );
}
