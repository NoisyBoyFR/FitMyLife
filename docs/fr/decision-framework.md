# Cadre de décision

> Traduction française — la version anglaise reste canonique. [English version](../decision-framework.md).

## Objectif

FitMyLife doit produire une décision explicable plutôt qu'un classement de produits opaque. L'élément demandé est un point de départ pour l'analyse, et non une conclusion présumée.

## Séquence de décision — `VALIDÉ` fonctionnellement

```text
User need and goal
  -> relevant existing equipment (`My Stuff`)
  -> known constraints and missing information
  -> critical compatibility rules
  -> expected usefulness and alternatives
  -> optional affordability, location, logistics, and true cost
  -> recommendation with evidence, uncertainty, and next steps
```

Les offres et les prix des providers interviennent après l'analyse de pertinence. Cet ordre est un principe produit et ne prétend pas décrire un workflow implémenté.

## Compatibilité et contraintes bloquantes — `VALIDÉ`

La compatibilité critique doit reposer sur des données structurées et des règles fiables. Un LLM peut aider à interpréter une demande ou à expliquer un résultat, mais ne doit pas être l'unique source de vérité lorsqu'une règle déterministe est possible.

Au minimum, une évaluation de compatibilité doit distinguer :

- `BLOCKING CONSTRAINT` — l'option ne devrait pas être recommandée sans correction ;
- `WARNING` — préoccupation importante qui n'empêche pas nécessairement l'utilisation ;
- `MISSING INFORMATION` — la confiance est limitée parce qu'un fait nécessaire est absent ;
- `VALID` — les contraintes vérifiées passent avec les éléments disponibles.

Les contraintes bloquantes priment sur le prix, le bénéfice ou tout score futur. Un bon prix ne peut pas compenser une incompatibilité sérieuse.

## Dimensions d'adéquation — partiellement validées

Le principe selon lequel les dimensions restent séparées et explicables est `VALIDÉ`. Les dimensions historiques comprennent :

- Technical Fit ;
- Need or Relevance Fit ;
- Financial Fit ;
- Household Fit ;
- Time Fit ;
- Location Fit ;
- Logistics Fit ;
- Value Fit ;
- Confidence.

Les scores numériques, les libellés qualitatifs, les pondérations, les règles de disqualification, la présentation de l'incertitude et l'existence d'un score global sont `À DÉCIDER`. Un score global opaque est `REFUSÉ / ABANDONNÉ`.

Le produit doit également préserver la distinction entre :

- techniquement compatible ;
- probablement utile pour l'objectif indiqué ;
- recommandé dans la situation actuelle ;
- disponible et concrètement accessible.

## Résultats possibles d'une recommandation — `VALIDÉ` fonctionnellement

Une décision peut être de :

- acheter le produit demandé ;
- acheter un autre produit de la même catégorie ;
- choisir une autre catégorie de solution ;
- modifier d'abord un autre composant ;
- attendre ou recueillir des informations manquantes ;
- conserver l'équipement actuel ;
- ne rien acheter.

Chaque résultat doit exposer les éléments importants, les conditions bloquantes, les hypothèses, les données manquantes et la prochaine étape suggérée. L'interface détaillée et la représentation formelle d'une explication sont `À DÉCIDER`.

## Limites liées au coût et au contexte

L'accessibilité financière, le foyer, la localisation, la disponibilité, la logistique et le coût réel sont des dimensions distinctes. Le contexte financier est strictement optionnel et ne constitue pas un conseil financier. La localisation précise est optionnelle et ne doit jamais être utilisée avec une précision supérieure à ce qui est nécessaire.

Le coût réel est `FUTUR` en tant que capacité complète. Il pourra éventuellement inclure l'achat, la livraison, le déplacement, le stationnement/péage, les accessoires nécessaires, l'installation, les abonnements, les consommables, la maintenance, l'assurance, le financement, les remises et la valeur de revente. La séparation entre coût d'acquisition, coût de possession, valeurs exactes, estimations et projections reste `ENVISAGÉ`.

## Décisions ouvertes qui influencent le cadre — `À DÉCIDER`

- la manière de mesurer le bénéfice attendu ;
- l'effet de la qualité et de la fraîcheur des preuves sur la confiance ;
- le niveau d'incertitude acceptable avant de ne pas formuler de recommandation ;
- la comparaison d'alternatives entre catégories ;
- la manière de communiquer « ne rien acheter » sans pression ni paternalisme ;
- l'utilité éventuelle d'un score numérique ;
- la manière de représenter les versions de la décision et des règles.
