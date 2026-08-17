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

Cet ordre reste une orientation de roadmap et non un engagement ferme d'implémentation. La première tranche technique approuvée et son contrat TypeScript public sont désormais implémentés, testés et vérifiés. L'étape du contrat est `CLOSE` ; les miroirs documentaires français ont été vérifiés et cette étape documentaire est fermée. La Phase 0 est terminée et validée par l'utilisateur ; son véhicule de publication était la PR n° 1 et sa clôture GitHub est enregistrée par Git et GitHub. La Phase 1 est terminée, vérifiée et validée par l'utilisateur : la PR [n° 2](https://github.com/NoisyBoyFR/FitMyLife/pull/2) en est le véhicule de publication et le squash merge autorisé ; elle porte une passerelle interne étroite en mémoire entre GPU et boîtier, qui délègue à l'évaluateur existant sans modifier l'API publique. La Phase 2 a avancé localement dans son périmètre approuvé : P2-0 a formalisé et fermé la boucle durable par point, et P2-1 a ajouté et fermé localement une règle interne GPU/épaisseur étroite. Elle compare deux mesures vérifiées sur exactement le même axe et dans un référentiel géométrique compatible, reste absente de l'API publique et ne constitue ni une agrégation ni une conclusion de compatibilité globale. La suite officielle contient désormais 47 tests : 10 Phase 0, 10 Phase 1 et 27 P2-1. La Phase 2 est validée localement dans son périmètre, mais n'est pas encore publiée.

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

Le workspace local est le dépôt `FitMyLife/`. L'ancien nom local du dossier est conservé uniquement comme contexte historique. Le renommage local et la réparation de l'environnement npm ont été effectués manuellement, vérifiés et fermés. Le renommage GitHub vers `NoisyBoyFR/FitMyLife` et sa visibilité privée ont été vérifiés et formellement fermés ; le remote local est correct. La Phase 0 a été publiée par la branche dédiée `codex/phase-0` et la PR [n° 1](https://github.com/NoisyBoyFR/FitMyLife/pull/1) ; son commit résultant exact reste consultable dans Git et GitHub. Les fichiers locaux exclus ne font pas partie du projet publié. La Phase 1 a été publiée par la PR [n° 2](https://github.com/NoisyBoyFR/FitMyLife/pull/2) depuis `codex/phase-1` ; le résultat de son squash merge et l'historique CI restent consultables dans Git et GitHub, sources de vérité. L'accueil GitHub bilingue a été publié et fusionné par la PR [n° 3](https://github.com/NoisyBoyFR/FitMyLife/pull/3) ; Git et GitHub restent les sources de vérité historiques. Les changements des Phases 0 et 1 sont publiés. Les changements de Phase 2 sont actuellement validés localement mais non publiés ; aucune branche, PR, release ou tag Phase 2 n'existe. La prochaine étape est la préparation contrôlée de la publication Phase 2 après vérification de cette correction documentaire.

## Statut

Ce dépôt établit les garde-fous produit, d'architecture et de confidentialité. La première tranche approuvée du Compatibility Engine est implémentée et testée : longueur GPU déterministe contre espace effectif du boîtier. La Phase 0 est terminée et validée par l'utilisateur ; sa clôture exacte est enregistrée dans Git et GitHub. La Phase 1 est terminée, vérifiée et validée par l'utilisateur : la [PR n° 2](https://github.com/NoisyBoyFR/FitMyLife/pull/2) a porté une passerelle `My Stuff` étroite en mémoire, limitée au GPU candidat et au boîtier existant, qui délègue à l'évaluateur existant sans modifier l'API publique. Elle ne constitue pas un modèle `My Stuff` complet. La Phase 2 est validée localement dans son périmètre actuel : P2-0 est fermé comme protocole durable séquentiel par point et P2-1 est fermé localement comme règle interne GPU/épaisseur. La règle n'est pas exportée publiquement, n'effectue aucune agrégation et ne constitue pas le Compatibility Engine complet. La suite officielle du package contient 47 tests : 10 Phase 0, 10 Phase 1 et 27 P2-1. La Phase 2 n'est pas publiée. La prochaine étape est la préparation contrôlée de la publication Phase 2, sans autorisation implicite de créer une branche, un commit, un push ou une PR.

Voir [la vision produit](docs/fr/product-vision.md), [le périmètre produit et la roadmap](docs/fr/product-scope-and-roadmap.md), [le cadre de décision](docs/fr/decision-framework.md), [les garde-fous d'architecture](docs/fr/architecture.md), [les règles de confidentialité et de sécurité](docs/fr/privacy-and-security.md) et [le backlog](TASKS.md).
