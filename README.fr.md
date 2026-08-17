# FitMyLife

> Traduction française — la version anglaise reste canonique. [English version](README.md).

FitMyLife aide les personnes à choisir des produits et services adaptés à leur vie réelle, et pas uniquement à leurs exigences techniques.

## Orientation produit

Une recommandation peut combiner la compatibilité technique, l'équipement existant, les besoins du foyer, le temps disponible, la localisation, la livraison, le coût réel et un contexte financier optionnel. Chaque dimension reste visible et explicable ; un score opaque unique ne suffit pas.

L'ordre historique recommandé de mise en œuvre est :

1. Compatibility Engine
2. My Stuff
3. PC / Tech
4. Browser Extension
5. Product Catalog
6. Location and providers
7. True Cost
8. Household and Life Context
9. Financial Context
10. Services (ISP, insurance, automotive)

Cet ordre reste une orientation de roadmap et non un engagement ferme d'implémentation. La première tranche technique approuvée et son contrat TypeScript public sont désormais implémentés, testés et vérifiés. L'étape du contrat est `CLOSE` ; les miroirs documentaires français ont été vérifiés et cette étape documentaire est fermée. La Phase 0 est terminée et validée par l'utilisateur ; son véhicule de publication est la PR n° 1 et sa clôture GitHub autorisée est un squash merge. Git et GitHub restent la source de vérité du commit résultant. La première tranche technique de Phase 1 est maintenant implémentée et vérifiée : une passerelle interne en mémoire limitée à la longueur du GPU candidat et à l'espace effectif du boîtier. Aucune autre fonctionnalité de Phase 1 n'est validée ou commencée.

## Principes

- La confidentialité est une exigence de la phase zéro.
- Les données financières et de localisation précise sont strictement optionnelles.
- Collecter la donnée la moins précise qui permette de répondre au besoin de l'utilisateur.
- Ne jamais journaliser, exposer ou envoyer des données sensibles à un LLM sauf si cela est essentiel et explicitement protégé.
- Maintenir la compatibilité, l'accessibilité financière et toutes les autres dimensions d'adéquation séparément explicables.

## Organisation du dépôt

```text
packages/
  compatibility-engine/  # technical fit (first MVP engine)
  affordability-engine/  # optional financial fit
  location-engine/       # distance, travel and delivery fit
  providers/             # provider-adapter contracts
docs/
  architecture.md
  decision-framework.md
  privacy-and-security.md
  product-scope-and-roadmap.md
  product-vision.md
.ai-workflow/            # Work ↔ Codex development protocol
TASKS.md                 # product backlog
```

## Workflow de développement

Ce dépôt utilise la boucle de développement Work ↔ Codex. Le protocole durable est défini par [.ai-workflow/START-HERE.md](.ai-workflow/START-HERE.md) et les fichiers qu'il référence.

Le cycle est `INSPECT → DECISION → EXECUTE → VERIFY → CLOSE → INSPECT`. Ne pas commencer une implémentation produit pendant `INSPECT` sans validation explicite de l'utilisateur.

Pour une nouvelle conversation Work, commencer par lire `.ai-workflow/START-HERE.md` et les fichiers qu'il référence. Pour une nouvelle session Codex, inspecter le dépôt réel et le contexte `.ai-workflow/` avant toute action.

## Vérification du workspace actuel

Le workspace local est le dépôt `FitMyLife/`. L'ancien nom local du dossier est conservé uniquement comme contexte historique. Le renommage local et la réparation de l'environnement npm ont été effectués manuellement, vérifiés et fermés. Le renommage GitHub vers `NoisyBoyFR/FitMyLife` et sa visibilité privée ont été vérifiés et formellement fermés ; le remote local est correct. La Phase 0 a été publiée par la branche dédiée `codex/phase-0` et la PR [n° 1](https://github.com/NoisyBoyFR/FitMyLife/pull/1), dont la clôture GitHub autorisée est un squash merge. L'historique exact de la branche et le commit résultant restent consultables dans Git et GitHub plutôt que d'être figés exhaustivement dans ce document. Les fichiers locaux exclus ne font pas partie du projet publié. La Phase 1 reste ouverte jusqu'à son inspection de publication et à la réévaluation de la décision CI.

## Statut

Ce dépôt établit les garde-fous produit, d'architecture et de confidentialité. La première tranche approuvée du Compatibility Engine est maintenant implémentée et testée : longueur GPU déterministe contre espace effectif du boîtier. La Phase 0 est terminée et validée par l'utilisateur ; sa clôture est représentée par la [PR n° 1](https://github.com/NoisyBoyFR/FitMyLife/pull/1) et le squash merge autorisé vers `main`. La première tranche de Phase 1 est implémentée et vérifiée : une passerelle `My Stuff` étroite en mémoire, limitée au GPU candidat et au boîtier existant, qui délègue à l'évaluateur existant sans modifier l'API publique. Elle ne constitue pas un modèle `My Stuff` complet. La suite officielle du package contient 20 tests. La Phase 1 reste ouverte jusqu'à l'inspection de publication et à la réévaluation de la CI ; aucune autre fonctionnalité de Phase 1 n'a commencé.

Voir [la vision produit](docs/fr/product-vision.md), [le périmètre produit et la roadmap](docs/fr/product-scope-and-roadmap.md), [le cadre de décision](docs/fr/decision-framework.md), [les garde-fous d'architecture](docs/fr/architecture.md), [les règles de confidentialité et de sécurité](docs/fr/privacy-and-security.md) et [le backlog](TASKS.md).
