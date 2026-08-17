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

Cet ordre reste une orientation de roadmap et non un engagement ferme d'implémentation. La première tranche technique approuvée et son contrat TypeScript public sont désormais implémentés, testés et vérifiés. L'étape du contrat est `CLOSE` ; les miroirs documentaires français ont été vérifiés et cette étape documentaire est fermée. La Phase 0 est terminée et validée par l'utilisateur ; son véhicule de publication était la PR n° 1 et sa clôture GitHub est enregistrée par Git et GitHub. La Phase 1 est terminée, vérifiée et validée par l'utilisateur : la PR [n° 2](https://github.com/NoisyBoyFR/FitMyLife/pull/2) en est le véhicule de publication et le squash merge autorisé ; elle porte une passerelle interne étroite en mémoire entre GPU et boîtier, qui délègue à l'évaluateur existant sans modifier l'API publique. La suite officielle contient 20 tests et la CI durable valide les futures pull requests vers `main`. Aucune Phase 2 n'a commencé.

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

Le workspace local est le dépôt `FitMyLife/`. L'ancien nom local du dossier est conservé uniquement comme contexte historique. Le renommage local et la réparation de l'environnement npm ont été effectués manuellement, vérifiés et fermés. Le renommage GitHub vers `NoisyBoyFR/FitMyLife` et sa visibilité privée ont été vérifiés et formellement fermés ; le remote local est correct. La Phase 0 a été publiée par la branche dédiée `codex/phase-0` et la PR [n° 1](https://github.com/NoisyBoyFR/FitMyLife/pull/1) ; son commit résultant exact reste consultable dans Git et GitHub. Les fichiers locaux exclus ne font pas partie du projet publié. La Phase 1 a été publiée par la PR [n° 2](https://github.com/NoisyBoyFR/FitMyLife/pull/2) depuis `codex/phase-1` ; le résultat de son squash merge et l'historique CI restent consultables dans Git et GitHub, sources de vérité. La prochaine mission distincte est l'inspection de la présentation bilingue de l'accueil GitHub, en conservant l'anglais comme version canonique et `README.fr.md` comme miroir français. Aucun tag, release ou développement de Phase 2 ne fait partie de cette clôture.

## Statut

Ce dépôt établit les garde-fous produit, d'architecture et de confidentialité. La première tranche approuvée du Compatibility Engine est implémentée et testée : longueur GPU déterministe contre espace effectif du boîtier. La Phase 0 est terminée et validée par l'utilisateur ; sa clôture exacte est enregistrée dans Git et GitHub. La Phase 1 est terminée, vérifiée et validée par l'utilisateur : la [PR n° 2](https://github.com/NoisyBoyFR/FitMyLife/pull/2) a porté une passerelle `My Stuff` étroite en mémoire, limitée au GPU candidat et au boîtier existant, qui délègue à l'évaluateur existant sans modifier l'API publique. Elle ne constitue pas un modèle `My Stuff` complet. La suite officielle du package contient 20 tests et la CI est configurée pour les futures pull requests vers `main`. Aucune Phase 2 n'a commencé. La prochaine mission est une inspection distincte de la présentation bilingue de l'accueil GitHub, avec l'anglais comme version canonique et `README.fr.md` comme miroir français.

Voir [la vision produit](docs/fr/product-vision.md), [le périmètre produit et la roadmap](docs/fr/product-scope-and-roadmap.md), [le cadre de décision](docs/fr/decision-framework.md), [les garde-fous d'architecture](docs/fr/architecture.md), [les règles de confidentialité et de sécurité](docs/fr/privacy-and-security.md) et [le backlog](TASKS.md).
