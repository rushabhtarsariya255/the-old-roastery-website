---
trigger: model_decision
description: "Use when implementing animation, transitions, media-heavy UI, or performance-sensitive interfaces."
---
# Animation and performance
- Animation must communicate state or improve feedback, not distract.
- Prefer transform and opacity animations; avoid expensive layout/paint work when possible.
- Respect reduced-motion settings and provide non-animated alternatives.
- Avoid blocking the main/UI thread; use platform-appropriate animation tools already installed.
- Measure before optimizing and report the device/browser or environment used.
- Lazy-load or optimize large media where the stack supports it.
