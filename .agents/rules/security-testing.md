---
trigger: model_decision
description: "Use for security-sensitive changes, test planning, and verification."
---
# Security and testing
- Threat-model authentication, authorization, input validation, file uploads, and external integrations as relevant.
- Never weaken security controls to satisfy a test.
- Never expose secrets or personal data in logs, fixtures, screenshots, or commits.
- Select tests proportional to risk: unit, integration, end-to-end, and regression.
- Run existing lint, typecheck, tests, and build commands when appropriate and approved.
- Report exact commands and outcomes; separate skipped checks from passed checks.
