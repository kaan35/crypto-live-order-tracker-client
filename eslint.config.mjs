import { FlatCompat } from '@eslint/eslintrc';
import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import { dirname } from 'path';
import tseslint from 'typescript-eslint';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  eslintConfigPrettier,
  eslintPluginPrettier,
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'arrow-body-style': 'warn',
      'no-duplicate-imports': ['error', { includeExports: true }],
      'no-undef': 'warn',
      'no-unused-vars': 'warn',
      'require-await': 'warn',
      'sort-keys': 'warn',
      'sort-vars': 'warn',
    },
  },
];

export default eslintConfig;
