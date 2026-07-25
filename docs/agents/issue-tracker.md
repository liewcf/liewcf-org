# Issue tracker: Private Local Markdown

Issues and specs for this repo live as Markdown files in `.scratch/`.

`.scratch/` is ignored by Git because this is a public repository. Never force-add or commit its contents.

## Conventions

- One feature per directory: `.scratch/<feature-slug>/`
- The spec is `.scratch/<feature-slug>/spec.md`
- Implementation issues are one file per ticket at `.scratch/<feature-slug>/issues/<NN>-<slug>.md`, numbered from `01`
- Triage state is recorded as a `Status:` line near the top of each issue
- Comments append under a `## Comments` heading

## When a skill says "publish to the issue tracker"

Create a file under `.scratch/<feature-slug>/`, creating the directory when needed.

## When a skill says "fetch the relevant ticket"

Read the referenced local file. The user will normally supply its path or issue number.

## Wayfinding operations

- Map: `.scratch/<effort>/map.md`
- Child ticket: `.scratch/<effort>/issues/NN-<slug>.md`
- Blocking: record `Blocked by: NN, NN`
- Frontier: choose the first open, unblocked, unclaimed ticket by number
- Claim: set `Status: claimed`
- Resolve: add the answer under `## Answer`, set `Status: resolved`, and add a context pointer to the map
