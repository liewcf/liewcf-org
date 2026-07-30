---
title: Auto-Tomato 1.1.1 manual package verified
summary: The Apple Silicon package was checked for versioning, architecture, archive integrity, and code-signature validity; it remains ad-hoc signed and unnotarized.
publishedAt: 2026-07-31
draft: false
project: auto-tomato
---

Version 1.1.1 uses the repository's root `VERSION` file as the source for both macOS bundle version fields. The manual packaging script builds the release executable, assembles and signs `AutoTomato.app`, and creates a zip for trusted-user distribution.

The recorded release check ran 156 XCTest tests with no failures. It also verified a thin `arm64` executable, both bundle version fields at `1.1.1`, strict code-signature validity, archive integrity, and clean extracted contents.

This remains a deliberately limited release path: the package supports Apple Silicon, uses ad-hoc signing, and is not notarized. It is not presented as a standard public macOS download, and macOS 26 users may need to enable notifications manually.
