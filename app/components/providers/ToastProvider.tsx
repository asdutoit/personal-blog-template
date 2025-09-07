"use client";

import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: "hsl(var(--background))",
          color: "hsl(var(--foreground))",
          border: "1px solid hsl(var(--border))",
        },
        success: {
          style: {
            background: "#10b981",
            color: "white",
          },
          iconTheme: {
            primary: "white",
            secondary: "#10b981",
          },
        },
        error: {
          style: {
            background: "#ef4444",
            color: "white",
          },
          iconTheme: {
            primary: "white",
            secondary: "#ef4444",
          },
        },
        loading: {
          style: {
            background: "#3b82f6",
            color: "white",
          },
        },
      }}
    />
  );
}
