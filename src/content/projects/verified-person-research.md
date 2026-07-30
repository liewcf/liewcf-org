---
title: verified-person-research
summary: A Codex skill that produces cited, evidence-bounded professional background research without inventing missing facts.
repositoryUrl: https://github.com/liewcf/verified-person-research
categories:
  - Codex
  - Developer Tool
  - Research
featured: true
featuredOrder: 3
draft: false
---

## What it does

The skill turns a LinkedIn URL, or a name plus workplace context, into cited professional background research. Quick, Standard, and Deep modes scale the research budget to the request.

## The problem

Professional-background research often starts with a thin or self-interested public record. A fluent summary can quietly merge names, repeat a subject's own claims as independent fact, or fill gaps with plausible detail that no opened source supports.

## Important decisions

Identity Resolution is a hard gate before substantive research. Every surviving claim must then pass an Identity Fingerprint check and carry one of five Claim Confidence labels: Confirmed, Probable, Self-reported, Inferred, or Unverified. Evidence that clears neither gate is removed instead of softened with vague language.

Quick and Standard modes stay within the Public Professional Record and run in the current agent. Deep Research requires explicit intent, and any parallel or subagent work needs separate permission. All modes return results in chat by default; a Saved Report is written only when requested and never overwrites an existing file without approval.

## Implementation

`SKILL.md` routes requests into Quick, Standard, or Deep Research. Bundled references define mode selection, evidence rules, report structure, and search tactics. The search playbook treats blocked or inaccessible pages as unavailable evidence, rejects search snippets as evidence, and directs the workflow toward independently accessible sources.

An offline validator checks the skill metadata, bundled references, evaluation JSON, trigger balance, internal links, and safety contracts. Behavioral fixtures cover identity resolution, mode routing, evidence gating, confidence labels, permissions, privacy boundaries, saved reports, and prohibited uses.

## Verification evidence

The 15 July 2026 verification record maps 227 requirements to implementation or test evidence and reports all of them passing. Repository and installed-package validators passed, package parity passed, and the installed behavior run recorded 49 evaluation cases, 200 assertions, and all 30 trigger cases passing.

## Limitations and status

The verified runtime is Codex v0.1; the release does not claim support guarantees for other agent hosts. Its verification record intentionally excludes live-web discovery quality, real access blocks, publication, deployment, contact actions, real private data, and production use. Thin evidence still produces a shorter answer, and formal background checks, suitability scoring, contact enrichment, surveillance, data brokers, and protected-trait inference remain out of scope.
