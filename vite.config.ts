import { join } from "node:path"
import { defineConfig } from "vite-plus"
import react from "@vitejs/plugin-react-swc"
import { TanStackRouterVite } from "@tanstack/router-plugin/vite"
import unocss from "unocss/vite"
import unimport from "unimport/unplugin"
import dotenv from "dotenv"
import nitro from "./nitro.config"
import { projectDir } from "./shared/dir"
import pwa from "./pwa.config"

dotenv.config({
  path: join(projectDir, ".env.server"),
})

export default defineConfig({
  resolve: {
    alias: {
      "~": join(projectDir, "src"),
      "@shared": join(projectDir, "shared"),
      "#": join(projectDir, "server"),
    },
  },
  test: {
    globals: true,
    environment: "node",
    include: ["server/**/*.test.ts", "shared/**/*.test.ts", "test/**/*.test.ts"],
    setupFiles: ["./test_imports.ts"],
  },
  lint: {
    ignorePatterns: ["src/routeTree.gen.ts", "imports.app.d.ts", "public/", ".vscode", "**/*.json"],
  },
  fmt: {
    ignorePatterns: ["src/routeTree.gen.ts", "imports.app.d.ts", "public/", ".vscode", "**/*.json"],
  },
  staged: {
    "*": "vp check --fix",
  },
  plugins: [
    TanStackRouterVite({
      // error with auto import and vite-plugin-pwa
      // autoCodeSplitting: true,
    }),
    unimport.vite({
      dirs: ["src/hooks", "shared", "src/utils", "src/atoms"],
      presets: ["react", {
        from: "jotai",
        imports: ["atom", "useAtom", "useAtomValue", "useSetAtom"],
      }],
      imports: [
        { from: "clsx", name: "clsx", as: "$" },
        { from: "jotai/utils", name: "atomWithStorage" },
      ],
      dts: "imports.app.d.ts",
    }),
    // https://github.com/unjs/nitro/blob/v2/src/core/config/resolvers/imports.ts
    unimport.vite({
      imports: [],
      presets: [
        {
          package: "h3",
          ignore: [/^[A-Z]/, r => r === "use"],
        },
      ],
      dirs: ["server/utils", "shared"],
      // dts: false,
    }),
    unocss(),
    react(),
    pwa(),
    nitro(),
  ],
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
})
