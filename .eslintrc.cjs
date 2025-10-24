// .eslintrc.cjs — versão estável BMAD/Notecraft + React 18 + TS 5.9 + Vitest
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: { jsx: true }
  },
  env: { browser: true, es2021: true, node: true },
  plugins: ["@typescript-eslint", "react", "react-hooks"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  settings: {
    react: { version: "detect" }
  },

  // ⚙️ regras base — leves, não travam commits
  rules: {
    // JSX runtime moderno não precisa de import React
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
    "react/prop-types": "off",

    // TypeScript — avisos, não erros
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
    ],
    "@typescript-eslint/ban-ts-comment": "off"
  },

  ignorePatterns: [
    "node_modules/",
    "dist/",
    "build/",
    "coverage/",
    ".husky/",
    ".bmad-core/",
    ".claude/",
    ".cursor/",
    ".storybook/",
    "public/",
    "scripts/**",
    "apple-design-system/**"
  ],

  overrides: [
    // ⚡ Guardrails Notecraft: sem HTML cru fora dos atoms
    {
      files: [
        "src/components/molecules/**/*.{ts,tsx}",
        "src/components/organisms/**/*.{ts,tsx}",
        "src/pages/**/*.{ts,tsx}"
      ],
      rules: {
        "no-restricted-syntax": [
          "error",
          { selector: 'JSXOpeningElement[name.name="button"]', message: "Use <Button /> (shadcn/ui)" },
          { selector: 'JSXOpeningElement[name.name="input"]',  message: "Use <Input /> (shadcn/ui)" },
          { selector: 'JSXOpeningElement[name.name="select"]', message: "Use <Select /> (shadcn/ui)" },
          { selector: 'JSXOpeningElement[name.name="img"]',    message: "Use componente de imagem padronizado" },
          { selector: 'JSXOpeningElement[name.name="a"]',      message: "Use <Link /> padronizado" },
          { selector: 'JSXAttribute[name.name="style"]',       message: "Sem inline style; use Tailwind" }
        ]
      }
    },
    // Atoms podem usar HTML primitivo (onde os wrappers nascem)
    { files: ["src/components/atoms/**/*.{ts,tsx}"], rules: {} },

    // ✅ Testes Vitest — sem plugins extras
    {
      files: ["**/*.test.{ts,tsx}", "**/*.spec.{ts,tsx}"],
      env: { node: true },
      globals: {
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        vi: "readonly"
      }
    }
  ]
};
