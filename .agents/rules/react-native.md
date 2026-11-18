---
trigger: model_decision
description: "Use when working on React Native or Expo applications."
---
# React Native
- Inspect whether the project uses bare React Native or Expo before proposing commands or libraries.
- Respect the installed React Native, Expo, navigation, and native-module versions.
- Consider iOS and Android behavior separately where platform differences exist.
- Use safe-area handling, accessible touch targets, keyboard-aware layouts, and performant lists.
- Avoid unnecessary renders and expensive work on the JS thread.
- Check native setup implications before adding or changing native dependencies.
- Do not claim a native build passed unless it was actually run successfully.
