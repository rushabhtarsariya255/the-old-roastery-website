---
trigger: model_decision
description: "Use when changing schemas, queries, migrations, indexes, or data access."
---
# Database
- Identify the database engine, ORM/query layer, migration tool, and existing conventions first.
- Preserve data integrity with appropriate constraints and transactions.
- Consider query plans, indexes, pagination, and N+1 access patterns.
- Never run a migration or destructive data operation without explicit approval.
- Prefer backward-compatible, staged schema changes for production systems.
- Never invent production data or claim a migration succeeded unless verified.
