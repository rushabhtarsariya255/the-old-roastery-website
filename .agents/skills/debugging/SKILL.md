---
name: debugging
description: "Reproduce, isolate, diagnose, and safely fix bugs using evidence rather than guesses."
---
# Debugging procedure
1. Capture the exact error, reproduction steps, expected behavior, and actual behavior.
2. Inspect relevant code, logs, configuration, versions, and recent changes.
3. Form ranked hypotheses and test the least invasive ones first.
4. Find the root cause; do not mask symptoms or disable safeguards.
5. Present the cause, proposed fix, files, and verification plan; wait for approval before edits.
6. Implement the approved fix and add a regression test where practical.
7. Report what was verified and what remains unverified.
