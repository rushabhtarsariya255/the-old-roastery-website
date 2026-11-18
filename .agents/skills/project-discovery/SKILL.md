---
name: project-discovery
description: "Map an unfamiliar repository, identify its stack and conventions, and produce a verified technical overview without changing files."
---
# Project discovery
1. List the repository structure while excluding generated/vendor folders where useful.
2. Read manifests, lockfiles, configuration, entry points, routing, and existing documentation.
3. Identify language/framework versions, package manager, scripts, build/test/lint/typecheck commands.
4. Trace the main app flow and key architectural boundaries.
5. Identify risks, missing documentation, and unknowns.
6. Produce a concise architecture map and recommended next steps.
7. Do not edit files, install packages, or run destructive commands.
