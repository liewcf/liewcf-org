# Domain Docs

How engineering skills consume this repository's domain documentation.

## Before exploring, read these

- Root `CONTEXT.md`, when present
- Root `CONTEXT-MAP.md`, when present
- Relevant ADRs under `docs/adr/`

If these files do not exist, proceed silently. `/domain-modeling`, normally reached through `/grill-with-docs`, creates them lazily when terminology or decisions are resolved.

## File structure

This is a single-context repository:

```text
/
├── CONTEXT.md
└── docs/adr/
```

## Use the glossary's vocabulary

Use domain concepts as defined in `CONTEXT.md`. Avoid synonyms the glossary explicitly rejects.

If a needed concept is missing, reconsider whether new terminology is necessary or record the gap for `/domain-modeling`.

## Flag ADR conflicts

Explicitly surface output that conflicts with an existing ADR instead of silently overriding it.
