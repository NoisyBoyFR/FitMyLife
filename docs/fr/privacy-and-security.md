# Baseline de confidentialité et de sécurité

> Traduction française — la version anglaise reste canonique. [English version](../privacy-and-security.md).

La sécurité et la confidentialité sont des contraintes produit de phase zéro `VALIDÉ`. Les contrôles ci-dessous sont des garde-fous produit ; ils ne prétendent pas que le dépôt les implémente déjà.

## Classification des données

| Niveau | Exemples |
| --- | --- |
| `PUBLIC` | Spécifications produit publiques |
| `INTERNAL` | Métadonnées opérationnelles |
| `PERSONAL` | Équipement possédé |
| `SENSITIVE` | Adresse ou informations du foyer |
| `HIGHLY_SENSITIVE` | Salaire, dettes, localisation précise, documents financiers |

## Garde-fous validés

- Un objectif clair est requis pour chaque catégorie ou champ de données personnelles utilisé par une décision.
- Les contextes sensibles restent optionnels et nécessitent un consentement approprié. Le modèle détaillé de consentement, notamment la question de savoir s'il est géré par finalité ou par champ, reste `ENVISAGÉ` / `À DÉCIDER`.
- Minimisation des données et visibilité au niveau du champ, y compris au sein des foyers.
- TLS en transit, chiffrement au repos et sauvegardes chiffrées sont des objectifs validés.
- Un chiffrement applicatif supplémentaire des données hautement sensibles est `ENVISAGÉ` et peut être utilisé lorsqu'il apporte une protection réelle ; sa nécessité, son périmètre et ses technologies seront déterminés lors d'un cadrage ultérieur.
- Moindre privilège, autorisation côté serveur par défaut refusée, MFA, limitation de débit, révocation des sessions et audit des événements sensibles.
- Aucune exposition inutile de données sensibles dans les URL, logs, analytics, rapports de crash, télémétrie ou messages d'erreur.
- Éviter le stockage inutile de données hautement sensibles en clair dans `localStorage`, `sessionStorage`, `IndexedDB` ou des cookies accessibles au JavaScript.
- Aucun secret ne doit figurer dans le dépôt, le frontend, la documentation ou les logs.
- Capacités d'export et de suppression, y compris la suppression des copies secondaires en fonction de la durée de conservation.

Le système doit résister à une compromission partielle : la compromission d'une couche ne doit pas révéler automatiquement l'ensemble du contexte de l'utilisateur. Les garde-fous associés sont la séparation des responsabilités, l'isolation et la segmentation, le moindre privilège, le chiffrement, la rotation des secrets et la limitation des accès. Il s'agit d'exigences de sécurité et non de la preuve d'une architecture implémentée.

## No Trust by Default

Le système ne doit pas faire automatiquement confiance au frontend, aux paramètres d'URL, aux identifiants fournis par le client, aux données provider, aux données extraites par une IA, aux uploads ou aux métadonnées client. L'autorisation doit être vérifiée côté serveur. Aucune technologie d'authentification ou de sécurité n'est sélectionnée par ce document.

## Limite de confidentialité de l'IA — `ENVISAGÉ`

Tout futur appel à un LLM devrait passer par une classification, une minimisation, un caviardage et une pseudonymisation. Il ne doit pas recevoir automatiquement les salaires, dettes, données bancaires, adresses exactes, localisations précises, documents fiscaux ou secrets. Un composant nommé `AI Security Gateway` est `ENVISAGÉ`, et non implémenté.

## Boucle de revue de sécurité — orientation de processus `VALIDÉ`

Les fonctionnalités touchant aux profils financiers, à la localisation, aux foyers, à l'identité ou aux documents exigent : implémentation → tests → revue de sécurité → revue confidentialité/fuite de données → corrections → nouveaux tests → seconde revue.

Un reviewer permanent sécurité, confidentialité et fuite de données est une exigence de processus `VALIDÉ` pour les développements sensibles. Le framework d'automatisation et le mécanisme de notification restent `À DÉCIDER`.

Les revues couvrent l'authentification, l'autorisation/IDOR, les logs, les réponses API, les caches, le stockage navigateur, les sauvegardes, les analytics, la gestion des erreurs, les uploads, les exports, les foyers partagés, les appels LLM, les intégrations provider, la recherche de secrets, les dépendances, la validation des entrées et la sécurité des API.
