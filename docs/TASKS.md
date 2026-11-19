---
title: Current Tasks
description: Current tasks, blockers, verification state, and recommended next actions.
doc_type: task_state
status: active
created: 2026-07-19
updated: 2026-11-19
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

## Audit fixes — 2026-11-19

- Fixed the audited project-link names, detail navigation, and contact redirect configuration. Migrated the three homepage WebMCP tools to the current browser API and kept the CSP intact.
- The full release check passed with 40 Playwright tests. Chrome 158 registered and executed all three tools locally with the WebMCP testing feature enabled. Playwright verified the generated redirect rules.
- Disabled zone analytics auto-injection and confirmed the beacon was absent from HTML and requests across the four top-level pages. The CSP and zone WebMCP bridge were preserved.

## Next action

- The owner authorized publishing the audit fixes. Verify both contact redirects, the homepage tools, the zone bridge, the CSP, and beacon absence on the production deployment.
