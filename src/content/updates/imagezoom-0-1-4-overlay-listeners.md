---
title: ImageZoom 0.1.4 limits event handling to the open overlay
summary: Zoom and drag listeners now run only while the image overlay is open, avoiding unnecessary event handling during normal browsing.
publishedAt: 2026-09-22
draft: false
project: imagezoom
---

ImageZoom now attaches its wheel, keyboard, click, and pointer listeners when the image overlay opens, then removes them when it closes. Only the double-click activation listener remains active between uses. This removes the non-passive wheel listener from ordinary page browsing.

The change adds regression coverage for listener cleanup and dragging. The repository version is 0.1.4, and its README describes the package as prepared for Chrome Web Store submission. The store checklist marks it as a draft; this is not confirmation of a published store release.

Sources: [listener lifecycle change and tests](https://github.com/liewcf/imagezoom/commit/1a3dff85fe1b23818952ffcdd36f6e07cfcf93a1), [0.1.4 version and submission status](https://github.com/liewcf/imagezoom/commit/4d60260b14d196b711ac0b35c00a38b2c1714e9d).
