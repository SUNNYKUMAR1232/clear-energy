# Clear Energy — Delivery Management Monorepo

This workspace contains three React Native applications built for Clear Energy: **Customer**, **Driver**, and **Admin Mobile**. They share a unified design language, typed API client, and composable UI components.

## 🚀 Setup & Run

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Mock API** (in a separate terminal)
   ```bash
   npx json-server mock-api.json --port 4000
   ```

3. **Start Applications** (run each in a separate terminal or interchangeably)
   ```bash
   npm run customer
   npm run driver
   npm run admin
   ```

## 🏗️ Technical Choices & Justifications

*   **Monorepo Strategy (npm workspaces)**: Chosen over Turborepo or Nx for sheer speed and zero-configuration overhead. For a 3-app architecture, npm's built-in workspace hoisting is perfectly sufficient without introducing complex build pipelines.
*   **Navigation (`@react-navigation/native-stack`)**: Opted for bare React Navigation instead of Expo Router. File-based routing (Expo Router) adds unnecessary boilerplate and static bundling complexity for single-screen, highly modular apps.
*   **Data Fetching (`@tanstack/react-query`)**: Crucial for gracefully handling the 4 requested states (Loading, Error, Empty, Success). It abstracts away caching, deduplication, and refetching.
*   **App Architecture**: Scalable split. Each app encapsulates its own `src/screens/` and `src/navigation/`, keeping `App.tsx` strictly responsible for root providers.
*   **Shared OrderCard**: Engineered as a highly adaptable component that shifts its layout (flat row vs elevated card) and styling based on the `mode` prop without leaking app-specific data shapes into the component itself.
*   **Custom SVG Icons (Zero-dependency)**: Swapped out `lucide-react-native` for pure, standalone SVG components built on `react-native-svg` and generic HTML tags for the Web build, bypassing Metro's notorious `.mjs` web bundling crashes and eliminating bloated UI libraries.

## 🤖 AI Tool Usage

*   **Tools**: Google Gemini via Antigravity IDE.
*   **Scope**: 
    *   `scaffold`: Bootstrapping the `packages/shared` workspace configuration.
    *   `shared-package`: Writing the boilerplate for the `fetchJSON` wrapper and TypeScript typings.
    *   `screen`: Translating the HTML/Tailwind mockup aesthetics into pure React Native components with pixel-perfect fidelity.

## ⏱️ Time Spent

*   **Actual Hours Spent**: ~2 hours. Focused heavily on ensuring the shared architecture was watertight before applying the visual polish.

---
"# clear-energy" 
"# clear-energy" 
