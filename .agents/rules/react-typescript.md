---
trigger: glob
globs: "*.ts, *.tsx, **/*.ts, **/*.tsx"
description: "Apply TypeScript and React conventions to TypeScript source files."
---
# TypeScript and React
- Preserve the project's React version, framework conventions, and compiler settings.
- Prefer explicit, useful types; avoid `any` unless justified and isolated.
- Keep components focused and compose small reusable pieces.
- Use functional components and hooks where appropriate.
- Keep side effects in the correct lifecycle/hooks and clean them up.
- Avoid unnecessary state duplication and unstable derived state.
- Handle nullable and asynchronous data explicitly.
- Follow the repository's linting, formatting, and import conventions.
