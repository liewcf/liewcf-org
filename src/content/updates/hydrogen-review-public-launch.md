---
title: Hydrogen Review is now public
summary: I published my Codex skill for getting a second code review from Gemini and checking its findings against the code.
publishedAt: 2026-11-28
draft: false
project: hydrogen-review-skill
---

I built Hydrogen Review for changes that span several files. I can ask Codex for a second review without copying the diff and its surrounding code into another chat. The skill sends the code I approve to Gemini through Antigravity, then Codex checks the findings against the original files.

The first public version includes a macOS launcher, installation instructions, and tests that run without signing in to Antigravity. The source is available under the MIT License. [Initial public source](https://github.com/liewcf/hydrogen-review-skill/commit/35f68b5cae6d3eadce53ebec38904dfeb05caa78)
