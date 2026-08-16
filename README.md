# FitMyLife

FitMyLife helps people choose products and services that fit their real life—not merely their technical requirements.

## Product direction

A recommendation can combine technical compatibility, existing equipment, household needs, available time, location, delivery, true cost, and optional financial context. Each dimension remains visible and explainable; a single opaque score is not enough.

The initial delivery order is:

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
  privacy-and-security.md
TASKS.md                 # product backlog
```

## Status

This repository establishes the architecture and privacy guardrails. Product implementation begins with the Compatibility Engine.

See [the architecture](docs/architecture.md), [privacy and security rules](docs/privacy-and-security.md), and [the backlog](TASKS.md).
