"use client";

import React, { useState, useEffect } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "./providers/ThemeProvider";
import { Button } from "./ui/button";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun className="h-4 w-4" />;
      case "dark":
        return <Moon className="h-4 w-4" />;
      case "system":
        return <Monitor className="h-4 w-4" />;
    }
  };

  const cycleTheme = () => {
    const themes: Array<"light" | "dark" | "system"> = [
      "light",
      "dark",
      "system",
    ];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <Button
      variant="default"
      size="sm"
      onClick={cycleTheme}
      className="p-2 bg-white hover:bg-gray-100 dark:bg-gray-800 text-black dark:text-white border-1"
      aria-label={`Switch to ${
        theme === "light" ? "dark" : theme === "dark" ? "system" : "light"
      } theme`}
    >
      {getThemeIcon()}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
