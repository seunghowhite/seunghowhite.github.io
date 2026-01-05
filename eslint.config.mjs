import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import { defineConfig, globalIgnores } from "eslint/config";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const prettierConfig = require("eslint-config-prettier");
const prettierPlugin = require("eslint-plugin-prettier");

const eslintConfig = defineConfig([
  // Next.js Core Web Vitals 설정
  ...nextVitals,

  // TypeScript 전용 규칙
  ...nextTs,

  // Prettier 통합 (충돌하는 ESLint 규칙 비활성화)
  // eslint-config-prettier는 Prettier와 충돌하는 ESLint 규칙을 자동으로 비활성화합니다
  {
    ...prettierConfig,
  },

  // Prettier 플러그인 (Prettier 포맷팅 이슈를 ESLint 에러로 표시)
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierConfig.rules,
      "prettier/prettier": "error",
      "arrow-body-style": "off",
      "prefer-arrow-callback": "off",
    },
  },

  // 커스텀 규칙 설정
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "no-console": "warn",
      "linebreak-style": ["error", "unix"],
      "max-len": ["off"], // Prettier가 처리
      "react/react-in-jsx-scope": "off",
      "react/jsx-filename-extension": [1, { extensions: [".ts", ".tsx"] }],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "react-hooks/exhaustive-deps": "off",
    },
  },

  // 무시할 파일/디렉토리 설정
  globalIgnores([
    // Next.js 기본 무시 파일들
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // 추가 무시 파일들
    "node_modules/**",
    "dist/**",
    "coverage/**",
    ".cache/**",
    "storybook-static/**",
    "public/**",
  ]),
]);

export default eslintConfig;
