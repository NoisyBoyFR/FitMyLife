# FitMyLife product vision

> [French translation](fr/product-vision.md) — English remains the canonical documentation.

## Status vocabulary

This documentation preserves the distinction between decisions and ideas:

- `VALIDÉ` — explicitly established product direction.
- `ENVISAGÉ` — serious proposal that is not ratified as a decision.
- `FUTUR` — direction intended for a later stage.
- `À DÉCIDER` — an open product or technical arbitration.
- `HYPOTHÈSE` — a plausible deduction, not a validated requirement.
- `REFUSÉ / ABANDONNÉ` — explicitly excluded or replaced.

Historical brainstorming is context, not proof of an implemented feature or a technical choice.

## Vision — `VALIDÉ`

FitMyLife is a personal decision-support product. Its purpose is to answer not only:

> Is this compatible with what I own?

but also:

> Is this actually appropriate for my current life and situation?

FitMyLife should understand the concrete problem, use the relevant parts of the user's real environment, and recommend the simplest realistic decision. The requested product is only one possible outcome. A good recommendation may be to buy it, change something first, choose another product, choose another category of solution, wait, keep the existing equipment, or buy nothing.

The product must be able to challenge the initial request when the evidence supports doing so. This independence of decision is part of the product identity.

## Positioning — `VALIDÉ`

FitMyLife is a decision layer between a person's real life and the market:

```text
Need or problem
  -> existing environment
  -> constraints and goals
  -> possible solutions
  -> decision
  -> relevant providers and offers
```

It must distinguish:

- the best product in the abstract;
- the best product for this person;
- the best way to solve this person's need.

FitMyLife is not intended to become a price-comparison site, a commission-led marketplace, a product-sheet summarizer, an isolated compatibility checker, or a system whose implicit objective is always to trigger a purchase.

## First vertical and reference scenario — `VALIDÉ`

The first priority is **PC / technology**. The initial domain may include CPUs, GPUs, motherboards, memory, power supplies, cases, storage, cooling, displays, and peripherals. The exact launch coverage remains `À DÉCIDER`.

The canonical scenario is a user considering an RTX 5070. Before looking for a price, FitMyLife should use relevant information from `My Stuff`, such as the current CPU/GPU, motherboard, RAM, power supply, case, cooling, storage, display resolution and refresh rate, software environment, and actual usage.

It should clarify the desired outcome: more FPS, 1440p or 4K gaming, ray tracing, professional/AI/video work, comfort, or a better benefit-to-cost trade-off.

Possible outcomes include a coherent upgrade, low expected benefit, a likely CPU bottleneck, a power-supply or case incompatibility, a better alternative card, another category of upgrade, or no purchase recommendation. When an incompatibility exists, it must be visible, explained, connected to the required correction, and accompanied by compatible alternatives where possible.

## Core product principles — `VALIDÉ`

- Start from the real need, not only the named product.
- Use existing equipment and context when relevant, with data minimisation.
- Keep compatibility, affordability, and other fit dimensions separately explainable.
- Give blocking constraints priority over scores or prices.
- Explain why a recommendation was made and what remains uncertain.
- Place providers and offers after the relevance decision.
- Preserve value without dependence on one provider.
- Treat security, privacy, and internationalisation as phase-zero concerns.
- Avoid dark patterns, paternalistic presentation, and purchase pressure.

## `My Stuff` — `VALIDÉ`

`My Stuff` represents what the user already owns and is central to decision quality. For PC / technology it may cover components, peripherals, displays, and complete configurations. Its purpose is not merely inventory management: it should expose relationships between equipment and feed compatibility and decision analysis.

A broader personal-context graph covering home, network, TV, NAS, smart home, mobility, or vehicles is `FUTUR` / `ENVISAGÉ`. It does not validate a graph data model or graph database.

## Users and product posture

The official persona, expertise level, age range, and B2C/B2B positioning are `À DÉCIDER`.

Potential initial audiences are `HYPOTHÈSES`: PC owners, gamers, technology enthusiasts, households making purchase decisions, people avoiding incompatibilities, and people who want to assess whether an upgrade is worthwhile. These are not validated personas.

## FitMyLife Soul Check

Future decisions should be tested against these questions:

1. Does the product understand the real problem?
2. Does it use what the user already owns?
3. Can it detect and explain incompatibility?
4. Can it say what must change?
5. Can it suggest a product alternative or another category of solution?
6. Can it recommend keeping existing equipment or buying nothing?
7. Do prices and providers come after relevance analysis?
8. Does it retain value without Amazon or another single provider?
9. Are data collection and location precision minimised?
10. Are security, privacy, and language independence designed from the start?
