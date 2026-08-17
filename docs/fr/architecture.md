# Garde-fous d'architecture et baseline actuelle

> Traduction française — la version anglaise reste canonique. [English version](../architecture.md).

Ce document consigne les contraintes produit et la petite quantité de structure technique réellement présente dans le dépôt. Il ne s'agit pas d'une architecture applicative finale. Aucun frontend, backend, base de données, cible de déploiement ou framework concret n'a été validé.

## Baseline du dépôt

L'inspection documentaire initiale a observé des répertoires de packages contenant des placeholders README et une interface TypeScript `ProviderAdapter`. Depuis, le dépôt a reçu une règle exécutable bornée du `Compatibility Engine`, comparant la longueur d'un GPU candidat à l'espace effectif du boîtier, ainsi que des tests automatisés. Il n'existe toujours pas de moteur de compatibilité complet, d'interface produit, de backend, de base de données ou d'intégration provider.

## Modèle de recommandation centré sur le besoin

FitMyLife part du besoin ou du problème, et non d'une offre provider :

```text
Need or problem
  -> Existing environment (`My Stuff`)
  -> Goals, constraints, and missing information
  -> Candidate solutions
  -> Candidate evaluation
  -> Explainable decision
  -> Relevant providers and offers
```

Pour chaque solution candidate, l'évaluation peut maintenir visibles des dimensions indépendantes :

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

Aucune dimension ne doit en remplacer silencieusement une autre : une solution techniquement parfaite peut rester trop chère ou impossible à obtenir. Il s'agit d'un modèle d'évaluation produit, et non d'une architecture d'orchestration implémentée.

## Contextes fondamentaux

- `LifeContext` — `FUTUR`, optionnel ; sa forme et son modèle technique sont `À DÉCIDER`.
- `FinancialProfile` — `FUTUR`, strictement optionnel ; sa forme et son modèle technique sont `À DÉCIDER`.
- `LocationProfile` ou équivalent — `FUTUR`, privacy-first ; sa forme, ses niveaux de précision et son modèle technique sont `À DÉCIDER`.

La présence des placeholders de packages dans le dépôt ne signifie pas que ces contextes ou leurs capacités sont implémentés.

## Responsabilités prévues des packages

- `compatibility-engine` : évalue l'adéquation technique et à l'équipement existant.
- `affordability-engine` : évalue indépendamment si un contexte financier optionnel permet de soutenir un achat ; ce n'est pas un conseil financier.
- `location-engine` : compare la proximité, les déplacements, la livraison, la disponibilité locale et le coût du déplacement.
- `providers` : contrat d'adapter commun pour les sources autorisées de données produit et service. Le contrat exact reste `À DÉCIDER`.

Ces noms décrivent des responsabilités prévues et non des limites d'implémentation achevées. Les modules produit et les choix d'architecture décrits dans les documents produit restent soumis à une inspection ultérieure et à la validation de l'utilisateur.

## Contrat provider

Les intégrations provider utilisent d'abord les API officielles, les flux partenaires ou affiliés, les données ouvertes et les exports autorisés, avant toute autre solution. Chaque fait externe doit conserver `source`, `timestamp`, `confidence` et `lastVerified`.

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

## Garde-fous providers et données

Les intégrations provider doivent rester remplaçables et privilégier les sources officielles ou autorisées. Les faits externes doivent conserver leur provenance, leur fraîcheur, leur confiance et leur dernière date de vérification. Un catalogue canonique, la séparation `Product` / `Offer`, la stratégie d'identifiants, le modèle de marché et le modèle de conservation/licence sont `ENVISAGÉ` ou `À DÉCIDER`, et non des contrats d'implémentation établis.

## Coût réel — `FUTUR`

L'ensemble suivant est une liste illustrative de facteurs et non un modèle mathématique final :

```text
purchase + delivery + travel + parking/tolls + required accessories
+ installation + subscriptions + consumables + maintenance + insurance
+ financing − discounts − cashback − estimated resale value
```

La séparation entre coût d'acquisition et coût de possession, ainsi qu'entre valeurs exactes, estimations, projections et valeurs fournies par l'utilisateur, reste `ENVISAGÉ` / `À DÉCIDER`.
