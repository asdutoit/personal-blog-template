# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a Next.js 15 project configured for MDX blog development with Turbopack, TypeScript, Tailwind CSS v4, and Biome for linting/formatting. The project uses the App Router architecture and is currently in a minimal bootstrapped state with MDX dependencies installed.

## Development Commands

### Core Development
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm start` - Start production server

### Code Quality
- `npm run lint` - Run Biome linter checks
- `npm run format` - Format code with Biome

## Architecture & Structure

### Key Technologies
- **Next.js 15** with App Router and Turbopack
- **MDX Integration**: @next/mdx, @mdx-js/loader, @mdx-js/react for MDX content
- **Styling**: Tailwind CSS v4 with PostCSS
- **Fonts**: Geist Sans and Geist Mono via next/font/google
- **Code Quality**: Biome for linting, formatting, and import organization
- **TypeScript**: Strict mode enabled with Next.js plugin

### Directory Structure
- `app/` - Next.js App Router pages and layouts
  - `layout.tsx` - Root layout with font configuration and global styles
  - `page.tsx` - Homepage component
  - `globals.css` - Global styles with Tailwind imports and CSS variables
- `public/` - Static assets (SVG icons)

### Configuration Files
- `next.config.ts` - Next.js configuration (currently minimal)
- `biome.json` - Biome configuration with Next.js/React rules
- `tsconfig.json` - TypeScript config with path aliases (@/*)
- `postcss.config.mjs` - PostCSS with Tailwind CSS v4

## MDX Configuration

The project has MDX dependencies installed but requires configuration:
- MDX loader and React integration are available
- `next.config.ts` needs MDX configuration (withMDX wrapper or pageExtensions)
- No MDX content files exist yet - typically would be in `posts/`, `content/`, or similar

## Styling System

### Tailwind CSS v4 Setup
- Uses new `@tailwindcss/postcss` plugin
- CSS variables for theming in `globals.css`
- Dark mode support via `prefers-color-scheme`
- Font variables integrated with Tailwind theme

### Design Tokens
- Background/foreground color variables
- Font family variables for Geist Sans/Mono
- Responsive design patterns established

## Development Notes

### Code Quality Standards
- Biome configuration includes:
  - 2-space indentation
  - Import organization on save
  - Next.js and React recommended rules
  - Git integration enabled
  - Unknown file types ignored

### TypeScript Configuration
- Strict mode enabled
- Path alias `@/*` maps to project root
- Next.js plugin integration
- ES2017 target with modern library support

### Current State
This appears to be a freshly bootstrapped Next.js project with MDX dependencies installed but not yet configured. The project needs:
- MDX configuration in `next.config.ts`
- Blog post content structure
- MDX component customization
- Routing for blog posts

### Font Setup
- Geist Sans as primary font family
- Geist Mono for code/monospace content
- CSS variables automatically injected for Tailwind integration
