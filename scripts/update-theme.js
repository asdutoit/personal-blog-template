#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Import theme configuration (you'll need to adjust the path)
const themes = {
  green: {
    light: { primary: "oklch(0.723 0.219 149.579)", primaryForeground: "oklch(0.982 0.018 155.826)" },
    dark: { primary: "oklch(0.696 0.17 162.48)", primaryForeground: "oklch(0.393 0.095 152.535)" },
    hue: 150
  },
  blue: {
    light: { primary: "oklch(0.6 0.25 252)", primaryForeground: "oklch(0.98 0.02 252)" },
    dark: { primary: "oklch(0.65 0.2 252)", primaryForeground: "oklch(0.98 0.02 252)" },
    hue: 252
  },
  purple: {
    light: { primary: "oklch(0.6 0.25 285)", primaryForeground: "oklch(0.98 0.02 285)" },
    dark: { primary: "oklch(0.65 0.2 285)", primaryForeground: "oklch(0.98 0.02 285)" },
    hue: 285
  },
  orange: {
    light: { primary: "oklch(0.65 0.25 45)", primaryForeground: "oklch(0.98 0.02 45)" },
    dark: { primary: "oklch(0.7 0.2 45)", primaryForeground: "oklch(0.1 0.02 45)" },
    hue: 45
  }
};

function generateColorScale(hue) {
  return {
    50: `oklch(0.98 0.02 ${hue})`,
    100: `oklch(0.94 0.05 ${hue})`,
    200: `oklch(0.88 0.1 ${hue})`,
    300: `oklch(0.81 0.15 ${hue})`,
    400: `oklch(0.74 0.19 ${hue})`,
    500: 'var(--primary)',
    600: `oklch(0.65 0.22 ${hue})`,
    700: `oklch(0.55 0.2 ${hue})`,
    800: `oklch(0.45 0.17 ${hue})`,
    900: `oklch(0.35 0.13 ${hue})`,
    950: `oklch(0.25 0.09 ${hue})`
  };
}

function updateGlobalsCss(themeName) {
  const theme = themes[themeName];
  if (!theme) {
    console.error(`Theme "${themeName}" not found!`);
    return;
  }

  const globalsPath = path.join(process.cwd(), 'app/globals.css');
  const cssContent = fs.readFileSync(globalsPath, 'utf8');
  
  const colorScale = generateColorScale(theme.hue);
  
  // Replace primary colors in light mode
  let updatedCss = cssContent.replace(
    /--primary: oklch\([^)]+\);/,
    `--primary: ${theme.light.primary};`
  );
  
  updatedCss = updatedCss.replace(
    /--primary-foreground: oklch\([^)]+\);/,
    `--primary-foreground: ${theme.light.primaryForeground};`
  );
  
  // Replace primary colors in dark mode
  updatedCss = updatedCss.replace(
    /(\.dark\s*{[^}]*)--primary: oklch\([^)]+\);/,
    `$1--primary: ${theme.dark.primary};`
  );
  
  updatedCss = updatedCss.replace(
    /(\.dark\s*{[^}]*)--primary-foreground: oklch\([^)]+\);/,
    `$1--primary-foreground: ${theme.dark.primaryForeground};`
  );
  
  // Replace color scale
  Object.entries(colorScale).forEach(([shade, value]) => {
    const pattern = new RegExp(`--color-primary-${shade}: oklch\\([^)]+\\);`);
    updatedCss = updatedCss.replace(pattern, `--color-primary-${shade}: ${value};`);
  });
  
  // Update theme comment
  updatedCss = updatedCss.replace(
    /\/\* Primary color scale - .* theme \*\//,
    `/* Primary color scale - ${themeName.charAt(0).toUpperCase() + themeName.slice(1)} theme */`
  );
  
  fs.writeFileSync(globalsPath, updatedCss);
  console.log(`✅ Updated globals.css with ${themeName} theme`);
}

// Get theme from command line argument
const themeName = process.argv[2];
if (!themeName) {
  console.log('Usage: node scripts/update-theme.js <theme-name>');
  console.log('Available themes:', Object.keys(themes).join(', '));
  process.exit(1);
}

updateGlobalsCss(themeName);