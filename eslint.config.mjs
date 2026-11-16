import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

// =============================================================================
// Linting configuration
// =============================================================================

export default defineConfig([
  // Project exclusions
  {
    ignores: ['dist/**', 'coverage/**'],
  },

  // TypeScript validation
  {
    files: ['source/**/*.ts', 'tests/**/*.ts'],
    extends: [js.configs.recommended, tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
