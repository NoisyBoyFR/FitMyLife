# FitMyLife

> **English — canonical** · [**Français — documentation complète**](README.fr.md)

**English:** FitMyLife helps people choose products and services that fit their real life—not merely their technical requirements.

**Français :** FitMyLife aide les personnes à choisir des produits et services adaptés à leur vie réelle, et pas uniquement à leurs exigences techniques.

## Product direction

A recommendation can combine technical compatibility, existing equipment, household needs, available time, location, delivery, true cost, and optional financial context. Each dimension remains visible and explainable; a single opaque score is not enough.

The historical recommended delivery order is:

1. Compatibility Engine
2. My Stuff
3. PC / Tech
4. Browser Extension
5. Product Catalog
6. Location and providers
7. True Cost
8. Household and Life Context
9. Financial Context
10. Services (ISP, insurance, automotive)

This order remains a roadmap direction, not a firm implementation commitment. The first approved technical slice and its public TypeScript contract are now implemented, tested, and verified. The contract step is `CLOSE`; the French documentation mirrors have been verified and this documentation step is closed. Phase 0 is complete and user-validated; its publication vehicle was PR #1 and its GitHub closure is recorded by Git and GitHub. Phase 1 is complete, verified, and user-validated: PR [#2](https://github.com/NoisyBoyFR/FitMyLife/pull/2) is its publication vehicle and authorized squash merge, carrying a narrow internal in-memory GPU/case bridge that delegates to the existing evaluator without changing the public API. Phase 2 is complete, verified, user-validated, merged, and closed within its approved scope: P2-0 formalized and closed the durable point-by-point loop, and P2-1 added and closed a narrow internal GPU/case-thickness rule. It compares two verified measurements on the same axis and within a compatible geometric reference, remains outside the public API, and is neither an aggregation nor a global compatibility conclusion. The official suite contains 47 tests: 10 Phase 0, 10 Phase 1, and 27 P2-1. PR [#4](https://github.com/NoisyBoyFR/FitMyLife/pull/4) was the historical publication vehicle; its authorized squash merge is recorded on `main`, and the `codex/phase-2` publication branch was deleted after post-merge validation. Git and GitHub remain the sources of truth for the exact result. No Phase 3 has started. The next mission is a distinct `INSPECT` mission.

## Principles

- Privacy is a phase-zero requirement.
- Financial and precise-location data are strictly optional.
- Collect the least precise data that can answer a user need.
- Never log, expose, or send sensitive data to an LLM unless essential and explicitly protected.
- Keep compatibility, affordability, and all other fit dimensions separately explainable.

## Repository layout

```text
packages/
  compatibility-engine/  # technical fit (first MVP engine)
  affordability-engine/  # optional financial fit
  location-engine/       # distance, travel and delivery fit
  providers/             # provider-adapter contracts
docs/
  architecture.md
  decision-framework.md
  privacy-and-security.md
  product-scope-and-roadmap.md
  product-vision.md
.ai-workflow/            # Work ↔ Codex development protocol
TASKS.md                 # product backlog
```

## Development workflow

This repository uses the Work ↔ Codex development loop. The durable protocol is defined by [.ai-workflow/START-HERE.md](.ai-workflow/START-HERE.md) and the files it references.

The cycle is `INSPECT → DECISION → EXECUTE → VERIFY → CLOSE → INSPECT`. Do not begin product implementation during `INSPECT` without explicit user validation.

For a new Work conversation, start by reading `.ai-workflow/START-HERE.md` and the files it references. For a new Codex session, inspect the real repository state and the `.ai-workflow/` context before acting.

## Current workspace verification

The local workspace is the `FitMyLife/` repository. The former local folder name is retained only as historical context. The local rename and npm environment repair were performed manually, verified, and closed. The GitHub rename to `NoisyBoyFR/FitMyLife` and its private visibility have been verified and formally closed; the local remote is correct. Phase 0 was published through the dedicated `codex/phase-0` branch and PR [#1](https://github.com/NoisyBoyFR/FitMyLife/pull/1); its exact resulting commit remains readable in Git and GitHub. The excluded local files are not part of the published project. Phase 1 was published through PR [#2](https://github.com/NoisyBoyFR/FitMyLife/pull/2) from `codex/phase-1`; its squash-merge result and CI history remain readable in Git and GitHub, which are the sources of truth. The bilingual GitHub home was published and merged through PR [#3](https://github.com/NoisyBoyFR/FitMyLife/pull/3); Git and GitHub remain the historical sources of truth. The Phase 0 and Phase 1 changes are published. Phase 2 was published through PR [#4](https://github.com/NoisyBoyFR/FitMyLife/pull/4); its authorized squash merge is recorded on `main`, and the `codex/phase-2` publication branch was deleted after post-merge validation. Git and GitHub remain the sources of truth for the exact result. No Phase 3 has started. The next mission is a distinct `INSPECT` mission.

## Status

This repository establishes product, architecture, and privacy guardrails. The first approved Compatibility Engine slice is implemented and tested: deterministic GPU length versus effective case space. Phase 0 is complete and user-validated; its exact closure is recorded in Git and GitHub. Phase 1 is complete, verified, and user-validated: PR [#2](https://github.com/NoisyBoyFR/FitMyLife/pull/2) carried a narrow in-memory My Stuff bridge limited to candidate GPU length and effective case space, delegating to the existing evaluator without changing the public API. It is not a complete My Stuff model. Phase 2 is complete, verified, user-validated, merged, and closed within its approved scope: P2-0 is closed as the durable point-by-point protocol, and P2-1 is closed as an internal GPU/case-thickness rule. The rule is not exported publicly, does not aggregate other rules, and is not the complete Compatibility Engine. The official package suite contains 47 tests: 10 Phase 0, 10 Phase 1, and 27 P2-1. PR [#4](https://github.com/NoisyBoyFR/FitMyLife/pull/4) was the historical publication vehicle; its authorized squash merge is recorded on `main`, and the `codex/phase-2` publication branch was deleted after post-merge validation. Git and GitHub remain the sources of truth for the exact result. No Phase 3 has started. The next mission is a distinct `INSPECT` mission.

See [the product vision](docs/product-vision.md), [product scope and roadmap](docs/product-scope-and-roadmap.md), [decision framework](docs/decision-framework.md), [architecture guardrails](docs/architecture.md), [privacy and security rules](docs/privacy-and-security.md), and [the backlog](TASKS.md).
