# FitMyLife

> [Version française](README.fr.md) — English remains the canonical documentation.

FitMyLife helps people choose products and services that fit their real life—not merely their technical requirements.

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

This order remains a roadmap direction, not a firm implementation commitment. The first approved technical slice and its public TypeScript contract are now implemented, tested, and verified. The contract step is `CLOSE`; the French documentation mirrors have been verified and this documentation step is closed. The Phase 0 product remains open.

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

The local workspace is the `FitMyLife/` repository. The former local folder name is retained only as historical context. The local rename and npm environment repair were performed manually, verified, and closed. The GitHub rename to `NoisyBoyFR/FitMyLife` and its private visibility have been verified and formally closed; the local remote is correct. Phase 0 has been published on the dedicated `codex/phase-0` branch: `aebc2a0` and `3141c2b` are the two substantive commits, followed by `82dc928` recording the publication state, with draft PR [#1](https://github.com/NoisyBoyFR/FitMyLife/pull/1). The PR remains open for Work verification and user validation; no merge has occurred.

## Status

This repository establishes product, architecture, and privacy guardrails. The first approved Compatibility Engine slice is now implemented and tested: deterministic GPU length versus effective case space. The complete engine and subsequent features remain subject to verification and further user validation. The next step is independent Work verification of [draft PR #1](https://github.com/NoisyBoyFR/FitMyLife/pull/1), followed by user validation and the later decision to merge and close Phase 0.

See [the product vision](docs/product-vision.md), [product scope and roadmap](docs/product-scope-and-roadmap.md), [decision framework](docs/decision-framework.md), [architecture guardrails](docs/architecture.md), [privacy and security rules](docs/privacy-and-security.md), and [the backlog](TASKS.md).
