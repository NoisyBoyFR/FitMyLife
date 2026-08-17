# Architecture guardrails and current baseline

> [French translation](fr/architecture.md) — English remains the canonical documentation.

This document records product-level constraints and the small amount of technical structure actually present in the repository. It is not a final application architecture. No frontend, backend, database, deployment target, or concrete framework has been validated.

## Repository baseline

The initial documentation inspection observed package directories with README placeholders and one TypeScript `ProviderAdapter` interface. Since then, the repository has gained one bounded executable `Compatibility Engine` rule comparing candidate GPU length with effective case space, together with automated tests. There is still no complete compatibility engine, product interface, backend, database, or provider integration.

## Need-centred recommendation model

FitMyLife starts from the need or problem, not from a provider offer:

```text
Need or problem
  -> Existing environment (`My Stuff`)
  -> Goals, constraints, and missing information
  -> Candidate solutions
  -> Candidate evaluation
  -> Explainable decision
  -> Relevant providers and offers
```

For each candidate solution, the evaluation can keep independent dimensions visible:

```text
Candidate solution
  ├─ Technical Compatibility
  ├─ Existing Equipment
  ├─ Need or Relevance Fit
  ├─ Financial Fit (future, optional)
  ├─ Household and Usage Context (future)
  ├─ Professional and Time Context (future)
  ├─ Location, Availability and Logistics (future)
  ├─ True Cost of Ownership (future)
  └─ Value and Confidence
             ↓
       Explainable candidate assessment
```

No dimension may silently overwrite another: a technically perfect candidate can remain unaffordable or impractical to obtain. This is a product-level evaluation model, not an implemented orchestration architecture.

## Core contexts

- `LifeContext` — `FUTUR`, optional; its shape and technical model are `À DÉCIDER`.
- `FinancialProfile` — `FUTUR`, strictly optional; its shape and technical model are `À DÉCIDER`.
- `LocationProfile` or an equivalent — `FUTUR`, privacy-first; its shape, precision levels, and technical model are `À DÉCIDER`.

The package placeholders present in the repository do not mean that these contexts or their capabilities are implemented.

## Intended package responsibilities

- `compatibility-engine`: evaluates technical and existing-equipment fit.
- `affordability-engine`: independently assesses whether an optional financial context supports a purchase; it is not financial advice.
- `location-engine`: compares proximity, travel, delivery, local availability, and travel cost.
- `providers`: common adapter contract for permitted product and service data sources. The exact contract is still `À DÉCIDER`.

These names describe intended responsibilities, not completed implementation boundaries. The product modules and architecture choices described in the product documents remain subject to later inspection and user validation.

## Provider contract

Provider integrations use official APIs, partner or affiliate feeds, open data, and authorized exports before any alternative. Every external fact must retain `source`, `timestamp`, `confidence`, and `lastVerified`.

```ts
export interface ProviderAdapter {
  search(query: string): Promise<unknown[]>;
  getProduct(id: string): Promise<unknown>;
  getPrice(id: string): Promise<unknown>;
  getAvailability(id: string): Promise<unknown>;
  getDeliveryOptions(id: string): Promise<unknown[]>;
  getStoreAvailability(id: string): Promise<unknown[]>;
  getOfferDetails(id: string): Promise<unknown>;
}
```

## Provider and data guardrails

Provider integrations must remain replaceable and must prefer official or authorised data sources. External facts need provenance, freshness, confidence, and last-verification information. A canonical catalog, `Product` / `Offer` split, identifier strategy, market model, and retention/licensing model are `ENVISAGÉ` or `À DÉCIDER`, not established implementation contracts.

## True cost — `FUTUR`

The following is an illustrative set of factors, not a final mathematical model:

```text
purchase + delivery + travel + parking/tolls + required accessories
+ installation + subscriptions + consumables + maintenance + insurance
+ financing − discounts − cashback − estimated resale value
```

The separation between acquisition cost and ownership cost, and between exact values, estimates, projections, and values supplied by the user, remains `ENVISAGÉ` / `À DÉCIDER`.
