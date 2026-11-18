---
trigger: model_decision
description: "Use when designing or changing backend services, APIs, or server-side code."
---
# Backend and API
- Inspect the current service architecture, routing, middleware, and error conventions.
- Validate inputs at trust boundaries and authorize every protected operation.
- Use consistent status codes, response shapes, pagination, and error contracts.
- Keep secrets out of code and logs.
- Consider idempotency, rate limiting, timeouts, retries, and observability where relevant.
- Avoid leaking internal stack traces or sensitive fields to clients.
- Add integration tests for important API behavior when the project supports them.
