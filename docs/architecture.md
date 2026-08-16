# Architecture

## Recommendation model

FitMyLife evaluates independent dimensions, then produces an explicit recommendation:

```text
Product or service
  ├─ Technical Compatibility
  ├─ Existing Equipment
  ├─ Household and Usage Context
  ├─ Professional and Time Context
  ├─ Financial Fit (optional)
  ├─ Location, Availability and Logistics
  ├─ True Cost of Ownership
  └─ Value and Confidence
             ↓
       Explainable recommendation
```

No dimension may silently overwrite another: a technically perfect product can remain unaffordable or impractical to obtain.

## Core contexts

`LifeContext` is opt-in and can hold household, professional, usage, time, and preference information. `FinancialProfile` is strictly optional and supports minimal budget, intermediate income/expenses, and advanced profiles. `LocationProfile` supports country through exact location, and must use the least precise level needed.

## Packages

- `compatibility-engine`: evaluates technical and existing-equipment fit.
- `affordability-engine`: independently assesses whether an optional financial context supports a purchase; it is not financial advice.
- `location-engine`: compares proximity, travel, delivery, local availability, and travel cost.
- `providers`: common adapter contract for permitted product and service data sources.

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

## True cost

`True Cost = product + delivery + travel + parking/tolls + required accessories + installation + subscriptions + consumables + maintenance + insurance + financing − discounts − cashback − estimated resale value`.
