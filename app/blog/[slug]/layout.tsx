import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="flex-1 mx-auto max-w-5xl mt-8">{children}</div>;
}
