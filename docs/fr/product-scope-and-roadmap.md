# Périmètre produit et roadmap

> Traduction française — la version anglaise reste canonique. [English version](../product-scope-and-roadmap.md).

## Baseline documentaire actuelle

Le dépôt contient de la documentation produit et d'architecture, des placeholders de packages, le contrat TypeScript initial `ProviderAdapter` et une règle exécutable bornée du `Compatibility Engine` comparant la longueur d'un GPU à l'espace effectif du boîtier. Des tests automatisés couvrent cette règle. Cette tranche ne constitue pas un moteur de recommandation complet : aucune interface produit ni intégration provider n'existe, et la stack applicative complète ainsi que l'architecture restent `À DÉCIDER`.

## Registre des risques

Ces risques sont enregistrés pour une réévaluation future. Ils ne constituent pas automatiquement des priorités immédiates ni des entrées de `.ai-workflow/DEFERRED-ISSUES.md` ; leur priorité dépend de la phase actuelle et du périmètre du travail développé.

### Risques produit

- Évoluer vers un produit de comparaison de prix.
- Évoluer vers une marketplace ou un produit dominé par les commissions.
- Développer trop de verticales simultanément.
- Des scores qui créent une fausse impression de précision.
- Des recommandations ou une présentation paternalistes.
- Un contexte utilisateur devenant trop intrusif.
- Collecter plus de données que la décision ne l'exige.
- Perdre l'indépendance de décision au profit de la consommation.

Les trois premiers risques sont considérés comme des risques produit majeurs, car ils peuvent modifier l'identité et les priorités du produit.

### Risques techniques

- Dépendance excessive à un provider.
- Données provider obsolètes ou contradictoires.
- Correspondance incorrecte entre produits.
- Gestion incorrecte des variantes.
- Règles de compatibilité incomplètes.
- Confiance excessive dans un résultat de LLM.
- Architecture distribuée prématurément.
- Catalogue difficile à normaliser.
- Mélange des données d'offres commerciales avec les données produit canoniques.
- Exposition de données sensibles.
- Isolation insuffisante des données du foyer.
- Données permettant d'identifier une personne dans les logs.
- Dépendance à des API susceptibles de disparaître.
- Problèmes de licence des données externes et de politique de conservation.

### Risques de sécurité

- IDOR et contrôle d'accès défaillant.
- Accès aux données d'un autre utilisateur.
- Partage excessif au sein du foyer.
- Fuites par les logs, les analytics ou les rapports de crash.
- Stockage navigateur non sûr.
- Exposition par les sauvegardes, exports ou uploads.
- Appels LLM et prompt injection.
- Secrets exposés.
- Détournement de session.
- Brute force.
- Suppression incomplète des données.

## Orientation MVP — `VALIDÉ`

Le MVP doit rester étroit. Sa priorité fonctionnelle est la suivante :

> comprendre le besoin + comprendre ce que possède l'utilisateur + vérifier les contraintes + proposer la décision la plus pertinente.

Le premier domaine est le PC / la technologie. Les catégories exactes de produits, la méthode de saisie de `My Stuff`, la définition de la release et les critères de sortie sont `À DÉCIDER`.

L'orientation produit minimale comprend :

- `My Stuff` comme source du contexte pertinent sur l'équipement existant ;
- un `Compatibility Engine` déterministe et fondé sur les données pour les contraintes critiques ;
- l'analyse de l'utilité réelle de la mise à niveau demandée ;
- des explications visibles sur les incompatibilités bloquantes et les informations manquantes ;
- des alternatives dans la même catégorie et, lorsque c'est pertinent, une autre catégorie de solution ;
- une trajectoire décrivant ce qui devrait changer pour rendre une option viable ;
- la possibilité de recommander de conserver l'équipement actuel ou de ne rien acheter.

Cette liste décrit des capacités produit à valider et à construire ultérieurement ; elle n'affirme pas qu'elles sont implémentées aujourd'hui.

## Limites fonctionnelles

### Dans l'orientation initiale — `VALIDÉ`

- PC / technologie comme première verticale ;
- compatibilité et adéquation à l'équipement existant ;
- pertinence du besoin et utilité attendue au niveau fonctionnel ;
- alternatives et trajectoires de correction ;
- intégrations provider indépendantes ;
- sécurité, confidentialité et internationalisation dès la phase zéro.

### Orientation ultérieure — `FUTUR`

- accessibilité financière et contexte financier ;
- localisation, disponibilité, livraison et logistique ;
- coût réel de possession ;
- contexte du foyer et contexte de vie plus large ;
- verticales supplémentaires comme le logement, le réseau, le mobile, les télécoms, l'automobile, l'assurance, l'énergie, la réparation et les services ;
- gestion du cycle de vie, maintenance, garantie, recommandations proactives, imports et scénarios « et si ».

L'ordre est une orientation de roadmap et non la promesse que chaque étape sera implémentée comme indiqué :

```text
PC / Tech
  -> stronger decision analysis
  -> product catalog and providers
  -> location, availability, and true cost
  -> household and life context
  -> financial context
  -> additional verticals
```

Une extension navigateur fait partie de la roadmap initiale (`VALIDÉ`), mais sa technologie cliente et son périmètre exact sont `À DÉCIDER`. Elle doit relier un produit consulté au contexte FitMyLife de l'utilisateur plutôt que réduire l'expérience à une comparaison de prix.

## Modules fonctionnels et statut

Les noms suivants décrivent des responsabilités produit et non des packages qui existent déjà :

| Capacité | Statut | Signification |
| --- | --- | --- |
| `My Stuff` | `VALIDÉ` | Contexte de l'équipement existant utilisé par les décisions |
| `Compatibility Engine` | `VALIDÉ` | Faits structurés et règles fiables pour les contraintes techniques |
| Need/relevance analysis | `VALIDÉ` fonctionnellement | Déterminer si la solution demandée répond au véritable objectif |
| Alternatives and correction trajectories | `VALIDÉ` fonctionnellement | Proposer un autre produit, une autre catégorie ou une étape corrective |
| `Affordability Engine` | `FUTUR` | Adéquation financière optionnelle, sans conseil financier |
| `Location Engine` | `FUTUR` | Adéquation liée à la localisation, la distance, au déplacement et à la livraison |
| `Availability Engine` | `FUTUR` | Disponibilité et fraîcheur des offres |
| `Household Decision Engine` | `FUTUR` | Contexte et décisions partagés au sein du foyer |
| `True Cost Engine` | `FUTUR` | Coût d'acquisition et de possession |
| `Need Analysis Engine` | `ENVISAGÉ` | Module nommé possible, pas une décision d'architecture |
| `Expected Benefit Engine` | `ENVISAGÉ` | Module nommé possible, pas une décision d'architecture |
| `Decision Orchestrator` | `ENVISAGÉ` | Module nommé possible, pas une décision d'architecture |
| `Decision Trace` | `ENVISAGÉ` | Concept possible d'explication et de versionnement |
| `Upgrade Path Engine` | `ENVISAGÉ` | Nom possible pour les trajectoires de correction |
| `Substitution Engine` | `ENVISAGÉ` | Nom possible pour les alternatives |

## Providers et marchés — orientation `VALIDÉ`

Le produit central doit rester indépendant d'Amazon ou de tout autre provider. Les intégrations doivent privilégier les API officielles, les flux partenaires ou affiliés, les données ouvertes et les exports autorisés. Un scraping fragile ou non autorisé ne doit pas devenir une dépendance structurelle.

Les faits externes doivent conserver leur source, leur fraîcheur, leur confiance et leur dernière date de vérification. Une orientation commune d'adapter provider existe dans le dépôt, mais l'interface finale, le catalogue canonique, le modèle `Product` / `Offer`, le modèle de marché, la stratégie d'identifiants, les règles de licence et la politique de conservation restent `ENVISAGÉ` ou `À DÉCIDER`.

Le marché provider pertinent doit suivre le pays ou le marché principal de l'utilisateur. La comparaison entre marchés est `ENVISAGÉ` et ne constitue pas un engagement de lancement.

## Internationalisation — orientation `VALIDÉ`

Le français, l'anglais et le chinois simplifié constituent l'orientation initiale validée pour les langues. Les codes de locale exacts, le calendrier de lancement, les pays, le stockage des traductions et le framework d'i18n restent `À DÉCIDER`. La langue, le pays, la devise, le fuseau horaire et les unités doivent rester des sujets distincts ; cette séparation est une recommandation technique `ENVISAGÉ`.

## Modèle économique — `À DÉCIDER`

Aucun modèle économique, de tarification ou de distribution n'est validé. Les possibilités ouvertes comprennent l'accès gratuit, le freemium, l'abonnement, l'achat unique, la licence, les offres Pro ou famille, le SaaS et l'auto-hébergement payant.

### Affiliation — `ENVISAGÉ`

L'affiliation n'a été évoquée que comme source de données autorisée possible et comme mécanisme commercial futur possible. Le principe selon lequel une commission ne devrait pas influencer le classement des produits est cohérent avec la vision produit, mais n'est pas ratifié comme règle économique définitive.

## Exclusions explicites — `REFUSÉ / ABANDONNÉ`

- la comparaison de prix comme objectif produit principal ;
- une marketplace dominée par les commissions ou un résultat d'achat obligatoire ;
- Amazon comme fondation requise ;
- une dépendance structurelle à un scraping fragile ou non autorisé ;
- un LLM comme unique source de vérité pour la compatibilité critique ;
- un score global opaque qui masque une incompatibilité bloquante ;
- le développement simultané de toutes les verticales ;
- la collecte de données au seul motif qu'elles pourraient être utiles plus tard.

## Questions de lancement — `À DÉCIDER`

- la première persona du MVP et son niveau d'expertise ;
- les catégories PC exactes et le seuil de qualité nécessaire pour une compatibilité fiable ;
- le workflow de saisie et de mise à jour de `My Stuff` ;
- la distinction entre compatible et recommandé ;
- la méthode de bénéfice attendu et la représentation de l'incertitude ;
- les dimensions numériques, catégories qualitatives et éventuel score global ;
- la manière de comparer des mises à niveau de catégories différentes ;
- le niveau acceptable de remise en question de la demande initiale de l'utilisateur ;
- la présentation non paternaliste de « ne rien acheter » ;
- les providers initiaux, les exigences de fraîcheur, les pays et les marchés ;
- le lancement simultané ou progressif des langues ;
- le client principal : web, desktop, mobile, PWA ou autre ;
- les limites et critères de sortie du prototype, du MVP et de la V1 ;
- l'objectif d'accessibilité ;
- le modèle économique ;
- la stack technique, l'architecture, les sources de données, les licences et la stratégie de tests ;
- les contrôles de sécurité et de confidentialité proportionnés au premier MVP.
