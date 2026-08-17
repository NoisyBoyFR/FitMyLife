# Product scope and roadmap

> [French translation](fr/product-scope-and-roadmap.md) — English remains the canonical documentation.

## Current documentation baseline

The repository contains product and architecture documentation, package placeholders, the initial `ProviderAdapter` TypeScript contract, and one bounded executable `Compatibility Engine` rule comparing GPU length with effective case space. Automated tests cover this rule. This slice is not a complete recommendation engine: no product interface or provider integration exists, and the complete application stack and architecture remain `À DÉCIDER`.

## Risk register

These risks are recorded for future re-evaluation. They are not automatically immediate priorities or entries in `.ai-workflow/DEFERRED-ISSUES.md`; their priority depends on the current phase and the scope of the work being developed.

### Product risks

- Drift toward a price-comparison product.
- Drift toward a marketplace or a commission-dominated product.
- Developing too many verticals at the same time.
- Scores creating a false impression of precision.
- Paternalistic recommendations or presentation.
- User context becoming too invasive.
- Collecting more data than the decision requires.
- Losing decision independence in favour of consumption.

The first three risks are considered major product risks because they can change the product's identity and priorities.

### Technical risks

- Excessive dependence on one provider.
- Stale or contradictory provider data.
- Incorrect matching between products.
- Incorrect handling of variants.
- Incomplete compatibility rules.
- Excessive trust in an LLM result.
- Prematurely distributed architecture.
- A catalog that is difficult to normalise.
- Mixing commercial offer data with canonical product data.
- Sensitive-data exposure.
- Poor Household data isolation.
- Personally identifying data in logs.
- Dependence on APIs that may disappear.
- External-data licensing and retention-policy problems.

### Security risks

- IDOR and broken access control.
- Access to another user's data.
- Excessive Household sharing.
- Leaks through logs, analytics, or crash reports.
- Unsafe browser storage.
- Exposure through backups, exports, or uploads.
- LLM calls and prompt injection.
- Exposed secrets.
- Session hijacking.
- Brute force.
- Incomplete data deletion.

## MVP direction — `VALIDÉ`

The MVP must remain narrow. Its functional priority is:

> understand the need + understand what the user owns + check constraints + propose the most relevant decision.

The first domain is PC / technology. The exact product categories, data-entry method for `My Stuff`, release definition, and exit criteria are `À DÉCIDER`.

The minimum product direction includes:

- `My Stuff` as the source of relevant existing-equipment context;
- a deterministic, data-backed `Compatibility Engine` for critical constraints;
- analysis of whether the requested upgrade is actually useful;
- visible explanations of blocking incompatibilities and missing information;
- alternatives within the same category and, where relevant, another solution category;
- a path describing what would need to change to make an option viable;
- the ability to recommend keeping the current equipment or buying nothing.

This list describes product capabilities to validate and build later; it does not claim that they are implemented today.

## Functional boundaries

### In the initial direction — `VALIDÉ`

- PC / technology as the first vertical;
- compatibility and existing-equipment fit;
- need relevance and expected usefulness at a functional level;
- alternatives and correction trajectories;
- independent provider integrations;
- security, privacy, and internationalisation from phase zero.

### Later direction — `FUTUR`

- affordability and financial context;
- location, availability, delivery, and logistics;
- true cost of ownership;
- household and broader life context;
- additional verticals such as home, network, mobile, telecom, automotive, insurance, energy, repair, and services;
- lifecycle management, maintenance, warranty, proactive recommendations, imports, and what-if scenarios.

The order is a roadmap direction, not a promise that every stage will be implemented as listed:

```text
PC / Tech
  -> stronger decision analysis
  -> product catalog and providers
  -> location, availability, and true cost
  -> household and life context
  -> financial context
  -> additional verticals
```

An extension browser is part of the initial roadmap (`VALIDÉ`), but its client technology and exact scope are `À DÉCIDER`. It must connect a viewed product to the user's FitMyLife context rather than reduce the experience to price comparison.

## Functional modules and status

The following names describe product responsibilities, not packages that already exist:

| Capability | Status | Meaning |
| --- | --- | --- |
| `My Stuff` | `VALIDÉ` | Existing-equipment context used by decisions |
| `Compatibility Engine` | `VALIDÉ` | Structured facts and reliable rules for technical constraints |
| Need/relevance analysis | `VALIDÉ` functionally | Determine whether the requested solution addresses the real goal |
| Alternatives and correction trajectories | `VALIDÉ` functionally | Offer another product, category, or corrective step |
| `Affordability Engine` | `FUTUR` | Optional financial fit, not financial advice |
| `Location Engine` | `FUTUR` | Location, distance, travel, and delivery fit |
| `Availability Engine` | `FUTUR` | Availability and freshness of offers |
| `Household Decision Engine` | `FUTUR` | Shared household context and decisions |
| `True Cost Engine` | `FUTUR` | Acquisition and ownership cost |
| `Need Analysis Engine` | `ENVISAGÉ` | Possible named module, not an architectural decision |
| `Expected Benefit Engine` | `ENVISAGÉ` | Possible named module, not an architectural decision |
| `Decision Orchestrator` | `ENVISAGÉ` | Possible named module, not an architectural decision |
| `Decision Trace` | `ENVISAGÉ` | Possible explanation/versioning concept |
| `Upgrade Path Engine` | `ENVISAGÉ` | Possible name for correction trajectories |
| `Substitution Engine` | `ENVISAGÉ` | Possible name for alternatives |

## Providers and markets — `VALIDÉ` direction

The core product must remain independent of Amazon or any other provider. Integrations should prefer official APIs, partner or affiliate feeds, open data, and authorised exports. Fragile or unauthorised scraping must not become a structural dependency.

External facts should retain source, freshness, confidence, and last-verification information. A common provider-adapter direction exists in the repository, but the final interface, canonical catalog, `Product` / `Offer` model, market model, identifier strategy, licensing rules, and retention policy remain `ENVISAGÉ` or `À DÉCIDER`.

The relevant provider market should follow the user's country or primary market. Cross-market comparison is `ENVISAGÉ`, not a launch commitment.

## Internationalisation — `VALIDÉ` direction

French, English, and Simplified Chinese are the initial validated language direction. The exact locale codes, launch timing, countries, translation storage, and i18n framework remain `À DÉCIDER`. Language, country, currency, time zone, and units should remain separate concerns; this is `ENVISAGÉ` as a technical design recommendation.

## Business model — `À DÉCIDER`

No business model, pricing, or distribution model is validated. Open possibilities include free access, freemium, subscription, one-time purchase, licensing, Pro or family plans, SaaS, and paid self-hosting.

### Affiliation — `ENVISAGÉ`

Affiliation has only been discussed as a possible authorised data source and as a possible future commercial mechanism. The principle that a commission should not influence product ranking is coherent with the product vision, but is not ratified as a definitive economic rule.

## Explicit exclusions — `REFUSÉ / ABANDONNÉ`

- price comparison as the primary product purpose;
- a commission-led marketplace or a mandatory purchase outcome;
- Amazon as a required foundation;
- structural reliance on fragile or unauthorised scraping;
- an LLM as the sole source of truth for critical compatibility;
- an opaque global score that hides a blocking incompatibility;
- simultaneous development of every vertical;
- collecting data merely because it might be useful later.

## Launch questions — `À DÉCIDER`

- first MVP persona and expertise level;
- exact PC categories and quality threshold for reliable compatibility;
- `My Stuff` entry and update workflow;
- distinction between compatible and recommended;
- expected-benefit method and uncertainty representation;
- numeric dimensions, qualitative categories, and any global score;
- how to compare upgrades from different categories;
- acceptable level of challenge to the user's initial request;
- non-paternalistic presentation of “buy nothing”;
- initial providers, freshness requirements, countries, and markets;
- simultaneous or staged language launch;
- primary client: web, desktop, mobile, PWA, or other;
- prototype, MVP, and V1 boundaries and exit criteria;
- accessibility target;
- business model;
- technical stack, architecture, data sources, licensing, and testing strategy;
- security and privacy controls proportionate to the first MVP.
