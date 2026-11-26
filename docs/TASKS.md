---
title: Current Tasks
description: Current tasks, blockers, verification state, and recommended next actions.
doc_type: task_state
status: active
created: 2026-07-19
updated: 2026-11-26
tags:
  - project-memory
  - tasks
  - current-state
audience:
  - agent
  - maintainer
related:
  - PROJECT_CONTEXT.md
  - DECISIONS.md
  - CHANGELOG_WORK.md
---

# Tasks

## Contact form rollout

- Local release checks passed. Production setup and a real delivery test remain pending. See the contact form section in the README for the Worker, Turnstile, email verification, and Pages steps.

## Audit fixes — complete on 2026-11-19

- Fixed the audited project-link names, detail navigation, and contact redirect configuration. Migrated the three homepage WebMCP tools to the current browser API and kept the CSP intact.
- The full release check passed with 40 Playwright tests. Chrome 158 registered and executed all three tools locally with the WebMCP testing feature enabled. Playwright verified the generated redirect rules.
- Shipped as [`4076118`](https://github.com/liewcf/liewcf-org/commit/40761187d7d3b6bcdec1b51ebac46167376f030c) on `main`. Cloudflare Pages reported [production deployment success](https://637ca0d1.liewcf-org.pages.dev/) for that commit.
- Verified on production that both contact paths return one 301 to the homepage, all three native WebMCP tools return the expected results, and the Cloudflare bridge still loads. Home, About, Projects, and Updates preserved the CSP and showed no analytics beacon in HTML or browser requests.

## Next action

- No follow-up remains for the audit fixes.
