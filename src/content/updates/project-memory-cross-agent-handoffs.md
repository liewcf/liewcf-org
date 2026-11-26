---
title: Project Memory adds handoffs between Codex, Claude Code, and OpenCode
summary: A new coding session can find the next task and the checks already completed, even when you switch assistants.
publishedAt: 2026-11-20
draft: false
project: project-memory
---

For example, you can finish a change in Codex, record which tests passed, and leave a mobile layout check in `docs/TASKS.md`. When you open the same project in Claude Code, the handoff points to that check. The notes stay with the project, so you can also read them yourself.

The setup preview shows which files Project Memory would create or update. Codex and OpenCode read the shared instructions in `AGENTS.md`. Claude Code can import those instructions from `CLAUDE.md`.

[Handoff changes and checks](https://github.com/liewcf/project-memory/commit/1ce5fd929c3f98f1722ef229436bb42d635f1321)
