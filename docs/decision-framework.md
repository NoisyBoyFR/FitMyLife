# Decision framework

> [French translation](fr/decision-framework.md) — English remains the canonical documentation.

## Purpose

FitMyLife should produce an explainable decision rather than a single opaque product ranking. The requested item is an input to investigate, not an assumed conclusion.

## Decision sequence — `VALIDÉ` functionally

```text
User need and goal
  -> relevant existing equipment (`My Stuff`)
  -> known constraints and missing information
  -> critical compatibility rules
  -> expected usefulness and alternatives
  -> optional affordability, location, logistics, and true cost
  -> recommendation with evidence, uncertainty, and next steps
```

Provider offers and prices belong after the relevance analysis. This ordering is a product principle, not a claim about an implemented workflow.

## Compatibility and blocking constraints — `VALIDÉ`

Critical compatibility must rely on structured data and reliable rules. An LLM may help interpret a request or explain a result, but must not be the only source of truth when a deterministic rule is possible.

At minimum, a compatibility assessment must distinguish:

- `BLOCKING CONSTRAINT` — the option should not be recommended without correction;
- `WARNING` — a material concern that does not necessarily prevent use;
- `MISSING INFORMATION` — confidence is limited because a needed fact is absent;
- `VALID` — the checked constraints pass with the available evidence.

Blocking constraints take priority over price, benefit, or any future score. A good price cannot compensate for a serious incompatibility.

## Fit dimensions — partially validated

The principle that dimensions remain separate and explainable is `VALIDÉ`. Historical dimensions include:

- Technical Fit;
- Need or Relevance Fit;
- Financial Fit;
- Household Fit;
- Time Fit;
- Location Fit;
- Logistics Fit;
- Value Fit;
- Confidence.

Numeric scores, qualitative labels, weights, disqualification rules, uncertainty presentation, and the existence of a global score are `À DÉCIDER`. A global opaque score is `REFUSÉ / ABANDONNÉ`.

The product must also preserve the distinction between:

- technically compatible;
- likely useful for the stated goal;
- recommended in the current situation;
- available and practical to obtain.

## Recommendation outcomes — `VALIDÉ` functionally

A decision may be:

- buy the requested product;
- buy another product in the same category;
- choose another category of solution;
- change another component first;
- wait or gather missing information;
- keep the current equipment;
- buy nothing.

Each outcome should expose the important evidence, blocking conditions, assumptions, missing data, and suggested next step. The detailed UI and the formal representation of an explanation are `À DÉCIDER`.

## Cost and context boundaries

Affordability, household, location, availability, logistics, and true cost are separate dimensions. Financial context is strictly optional and is not financial advice. Precise location is optional and must never be used at greater precision than necessary.

True cost is `FUTUR` as a full capability. It may eventually include purchase, delivery, travel, parking/tolls, accessories, installation, subscriptions, consumables, maintenance, insurance, financing, discounts, and resale value. The separation between acquisition cost, ownership cost, exact values, estimates, and projections remains `ENVISAGÉ`.

## Open decisions that affect the framework — `À DÉCIDER`

- how expected benefit is measured;
- how evidence quality and freshness affect confidence;
- how much uncertainty is acceptable before a recommendation is withheld;
- how alternatives across categories are compared;
- how to communicate “no purchase” without pressure or paternalism;
- whether a numeric score is useful at all;
- how the decision and rule versions should be represented.
