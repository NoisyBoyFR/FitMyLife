# Vision produit FitMyLife

> Traduction française — la version anglaise reste canonique. [English version](../product-vision.md).

## Vocabulaire des statuts

Cette documentation préserve la distinction entre les décisions et les idées :

- `VALIDÉ` — orientation produit explicitement établie.
- `ENVISAGÉ` — proposition sérieuse qui n'est pas ratifiée comme décision.
- `FUTUR` — orientation prévue pour une étape ultérieure.
- `À DÉCIDER` — arbitrage produit ou technique ouvert.
- `HYPOTHÈSE` — déduction plausible, mais pas exigence validée.
- `REFUSÉ / ABANDONNÉ` — élément explicitement exclu ou remplacé.

Les réflexions historiques servent de contexte et ne prouvent ni l'implémentation d'une fonctionnalité ni le choix d'une solution technique.

## Vision — `VALIDÉ`

FitMyLife est un produit d'aide à la décision personnelle. Son objectif n'est pas seulement de répondre à la question :

> Est-ce compatible avec ce que je possède ?

mais aussi à la question :

> Est-ce réellement adapté à ma vie et à ma situation actuelles ?

FitMyLife doit comprendre le problème concret, utiliser les éléments pertinents de l'environnement réel de l'utilisateur et recommander la décision réaliste la plus simple. Le produit demandé n'est qu'un résultat possible. Une bonne recommandation peut être de l'acheter, de modifier d'abord un autre élément, de choisir un autre produit, de choisir une autre catégorie de solution, d'attendre, de conserver l'équipement existant ou de ne rien acheter.

Le produit doit pouvoir remettre en question la demande initiale lorsque les éléments disponibles le justifient. Cette indépendance de décision fait partie de l'identité du produit.

## Positionnement — `VALIDÉ`

FitMyLife est une couche de décision entre la vie réelle d'une personne et le marché :

```text
Need or problem
  -> existing environment
  -> constraints and goals
  -> possible solutions
  -> decision
  -> relevant providers and offers
```

Il doit distinguer :

- le meilleur produit dans l'absolu ;
- le meilleur produit pour cette personne ;
- la meilleure manière de résoudre le besoin de cette personne.

FitMyLife n'a pas vocation à devenir un comparateur de prix, une marketplace pilotée par les commissions, un résumeur de fiches produit, un simple vérificateur de compatibilité ou un système dont l'objectif implicite serait toujours de déclencher un achat.

## Première verticale et scénario de référence — `VALIDÉ`

La première priorité est le domaine **PC / technologie**. Le domaine initial peut inclure les processeurs, GPU, cartes mères, mémoire, alimentations, boîtiers, stockage, refroidissement, écrans et périphériques. La couverture exacte du lancement reste `À DÉCIDER`.

Le scénario canonique est celui d'un utilisateur qui envisage une RTX 5070. Avant de rechercher un prix, FitMyLife doit utiliser les informations pertinentes de `My Stuff`, comme le CPU/GPU actuel, la carte mère, la RAM, l'alimentation, le boîtier, le refroidissement, le stockage, la résolution et la fréquence de l'écran, l'environnement logiciel et l'usage réel.

Il doit clarifier le résultat recherché : davantage de FPS, du jeu en 1440p ou 4K, du ray tracing, du travail professionnel/IA/vidéo, davantage de confort ou un meilleur rapport bénéfice/coût.

Les résultats possibles comprennent une mise à niveau cohérente, un bénéfice attendu faible, un probable goulot d'étranglement CPU, une incompatibilité d'alimentation ou de boîtier, une carte alternative plus adaptée, une autre catégorie de mise à niveau ou l'absence de recommandation d'achat. Lorsqu'une incompatibilité existe, elle doit être visible, expliquée, reliée à la correction nécessaire et accompagnée, lorsque c'est possible, d'alternatives compatibles.

## Principes fondamentaux du produit — `VALIDÉ`

- Partir du besoin réel, et pas seulement du produit nommé.
- Utiliser l'équipement et le contexte existants lorsqu'ils sont pertinents, avec minimisation des données.
- Maintenir la compatibilité, l'accessibilité financière et les autres dimensions d'adéquation séparément explicables.
- Donner la priorité aux contraintes bloquantes sur les scores ou les prix.
- Expliquer pourquoi une recommandation a été formulée et ce qui reste incertain.
- Placer les providers et les offres après la décision de pertinence.
- Préserver la valeur sans dépendre d'un provider unique.
- Traiter la sécurité, la confidentialité et l'internationalisation comme des préoccupations de phase zéro.
- Éviter les dark patterns, la présentation paternaliste et la pression à l'achat.

## `My Stuff` — `VALIDÉ`

`My Stuff` représente ce que l'utilisateur possède déjà et est central pour la qualité de la décision. Pour le domaine PC / technologie, il peut couvrir les composants, les périphériques, les écrans et les configurations complètes. Son objectif n'est pas seulement la gestion d'un inventaire : il doit faire apparaître les relations entre les équipements et alimenter l'analyse de compatibilité et de décision.

Un graphe de contexte personnel plus large couvrant le logement, le réseau, la TV, le NAS, la maison connectée, la mobilité ou les véhicules est `FUTUR` / `ENVISAGÉ`. Cela ne valide ni un modèle de données en graphe ni une base de données graphe.

## Utilisateurs et posture du produit

La persona officielle, le niveau d'expertise, la tranche d'âge et le positionnement B2C/B2B sont `À DÉCIDER`.

Les publics initiaux possibles sont des `HYPOTHÈSES` : propriétaires de PC, joueurs, passionnés de technologie, foyers prenant des décisions d'achat, personnes souhaitant éviter les incompatibilités et personnes qui veulent évaluer l'intérêt d'une mise à niveau. Il ne s'agit pas de personas validées.

## Contrôle de cohérence FitMyLife

Les décisions futures doivent être testées avec ces questions :

1. Le produit comprend-il le vrai problème ?
2. Utilise-t-il ce que l'utilisateur possède déjà ?
3. Peut-il détecter et expliquer une incompatibilité ?
4. Peut-il dire ce qui doit changer ?
5. Peut-il proposer une alternative de produit ou une autre catégorie de solution ?
6. Peut-il recommander de conserver l'équipement existant ou de ne rien acheter ?
7. Les prix et les providers interviennent-ils après l'analyse de pertinence ?
8. La valeur est-elle préservée sans Amazon ni autre provider unique ?
9. La collecte de données et la précision de localisation sont-elles minimisées ?
10. La sécurité, la confidentialité et l'indépendance vis-à-vis des langues sont-elles conçues dès le départ ?
