---
name: release-readiness
description: "Assess whether a project change is ready to ship and prepare a safe release checklist."
---
# Release readiness
1. Inspect project scripts, CI configuration, versioning, changelog, and deployment docs.
2. Verify tests, lint, typecheck, build, migrations, configuration, and rollback plan.
3. Check secrets, dependency risks, accessibility, monitoring, and known issues.
4. Never deploy, publish, tag, or run migrations without explicit approval.
5. Produce a go/no-go summary with evidence, blockers, and a release checklist.
