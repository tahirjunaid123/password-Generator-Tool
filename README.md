# Passify - High-Performance Password Tool

Passify is a fast, edge-ready, neon-cyber web application offering a Password Generator, Strength Analyzer, and Secure Notes storage.

## Folder Architecture

The project is structured elegantly for Next.js 14 App Router:

- `/src/app`
  - Purpose: Next.js file-system routing. Handles all pages (`page.tsx`), global layouts (`layout.tsx`), and styles (`globals.css`).
  - Subdirectories: `(auth)` for authentication routes securely grouped, `(dashboard)` for premium user views, `api` for serverless API functions.
- `/src/components`
  - Purpose: React UI components.
  - `/ui`: Atomic, generic UI components (buttons, sliders, inputs) powered by Tailwind & generic logic.
  - `/features`: Feature-specific logic components like `PasswordGenerator`, `StrengthAnalyzer`, and `SecureNotes`.
  - `/layout`: Shared layout wrappers (navbar, footer).
- `/src/lib`
  - Purpose: Core utilities, helper functions, and third-party initializations.
  - Examples: `crypto.ts` for secure `crypto.getRandomValues()` logic, `analyze.ts` for entropy calculation.
- `/src/store`
  - Purpose: Global state management using Zustand for fast, predictable client-side state mapping.
- `/src/actions`
  - Purpose: Next.js Server Actions for handling form submissions without traditional API routes overhead.
- `/src/types`
  - Purpose: Global TypeScript interfaces and type definitions for strong typing.
- `/src/hooks`
  - Purpose: Custom React hooks (e.g., `useMediaQuery`) for modular component logic.
- `/src/config`
  - Purpose: App-wide constants, navigation links, and theme configurations.

## Tech Stack highlights
- Next.js 14 (App Router)
- React 18
- TailwindCSS (Neon-cyber aesthetic)
- Zustand
- Lucide-React & Framer Motion

## Getting Started

1. Install dependencies with `npm install`
2. Run development server with `npm run dev`
3. View on `http://localhost:3000`
