# Project State

> Ce fichier décrit le dernier état connu du projet. Il ne remplace pas une inspection réelle du dépôt.

## 1. Identification

**Projet :** FitMyLife

**Repository :** https://github.com/NoisyBoyFR/FitMyLife
**Objectif produit :** assistant personnel d'aide à la décision pour recommander des produits et services réellement adaptés à la vie de l'utilisateur, de manière explicable et privacy-first.

## 2. Phase actuelle du workflow

**Phase :** `VERIFY`

Le contrat API TypeScript public de Phase 0 est fermé. La première vague de traduction française et les corrections documentaires associées ont été vérifiées et l'étape est fermée. Le renommage local vers le dépôt `FitMyLife/` et la réparation manuelle de la jonction npm sont vérifiés et fermés. Le renommage GitHub vers `FitMyLife` et la visibilité privée ont été vérifiés par Work et sont formellement fermés ; la permission administrateur, le remote local correct et le HEAD distant inchangé sont confirmés. La publication contrôlée de Phase 0 est effectuée et suivie sur `codex/phase-0`. Les commits `aebc2a03319e5e5d661fb9692f60140b3e667634` et `3141c2b048c5f940b85fcd4862fdbc1565279260` constituent les deux jalons substantiels connus ; `82dc928a090222772a3087bacb8af0aca5fce55e` et `3c830cfea6aec4144abc7cb79ca85cf14eadd61d` sont des jalons documentaires connus. L'historique complet et le HEAD courant doivent être lus dans Git et GitHub. La PR brouillon n° 1 reste ouverte. La Phase 0 produit reste ouverte jusqu'à la validation utilisateur, au merge autorisé et à la clôture finale ; aucun merge n'a été effectué.

**Dernière mise à jour :** 2026-08-17

## 3. Référence Git et état de publication

**Branche de publication :** `codex/phase-0`

**HEAD de base de `main` :** `1d7faca4bd414723ae99b1c3e73d97cd6680cd03` — `Initialize FitMyLife`

**HEAD de la branche de publication :** à inspecter dans Git et GitHub ; ce document ne fige pas le HEAD courant de sa propre branche.

**État local :** les documents, la configuration npm et le Compatibility Engine de Phase 0 sont suivis et publiés sur `codex/phase-0`. `node_modules/` et `dist/` restent ignorés ; les trois fichiers locaux exclus restent non suivis.

La branche `codex/phase-0` a été poussée avec les changements de publication et des jalons documentaires d'état. La PR brouillon n° 1 cible `main` et se trouve à l'adresse `https://github.com/NoisyBoyFR/FitMyLife/pull/1`. `main` reste inchangée. Aucun merge, tag, release, issue ou changement de visibilité n'a été réalisé. La prochaine étape est la vérification indépendante de la PR par Work, puis la décision utilisateur.

## 4. État technique réellement observé

- Les documents techniques et produit de Phase 0 sont désormais suivis sur la branche de publication `codex/phase-0` ; `architecture.md` et `privacy-and-security.md` proviennent de la base et les documents produit ont été ajoutés par la publication.
- Package READMEs pour `compatibility-engine`, `affordability-engine`, `location-engine` et `providers`.
- Contrat TypeScript initial `packages/providers/src/provider-adapter.ts`.
- Backlog dans `TASKS.md`.
- Une tranche exécutable et testée du `Compatibility Engine` existe dans `packages/compatibility-engine/` : longueur GPU candidate contre espace GPU effectif du boîtier.
- Cette tranche comprend un modèle TypeScript minimal, une fonction pure, 10 tests Node natifs et des scripts npm de typecheck/test.
- Aucun moteur complet, aucune interface produit, aucune intégration fournisseur, aucune persistance et aucune décision d'achat ne sont implémentés.
- `package.json` définit un workspace npm et Node `>=22` ; TypeScript est la seule dépendance de développement de la tranche.

## 5. Contexte produit durable

Les éléments suivants sont documentés dans `docs/` avec leur statut explicite :

- la première verticale prioritaire est PC / Tech ;
- `My Stuff`, l'analyse de la pertinence du besoin et le `Compatibility Engine` sont centraux ;
- le produit peut déconseiller l'achat demandé, proposer une autre catégorie de solution, recommander une correction, conserver l'existant ou ne rien acheter ;
- les contraintes bloquantes priment sur les scores et les prix ;
- l'indépendance vis-à-vis des fournisseurs, la sécurité, la confidentialité et l'internationalisation sont des contraintes validées ;
- les langues initiales visées sont le français, l'anglais et le chinois simplifié, tandis que les locales exactes et le calendrier de lancement restent ouverts ;
- le périmètre exact du MVP, les personas, la représentation de l'incertitude, le client principal, la stack, l'architecture, les sources de données et plusieurs choix produit restent `À DÉCIDER` ;
- les recommandations techniques de type modular monolith, PostgreSQL, catalogue canonique, séparation `Product` / `Offer`, gateway IA, etc. restent `ENVISAGÉES` et ne sont pas des décisions acquises.

## 6. Documentation créée ou mise à jour

- `docs/product-vision.md` : vision, positionnement, principes, `My Stuff`, utilisateurs et test de cohérence.
- `docs/product-scope-and-roadmap.md` : périmètre MVP, roadmap, capacités, risques, statuts et modèle économique ouvert.
- `docs/decision-framework.md` : séquence de décision, contraintes bloquantes, dimensions et sorties ; aucune question de contournement ajoutée.
- `docs/architecture.md` : flux centré sur le besoin, contextes futurs, `Financial Fit` futur et distinction entre structure actuelle et architecture future.
- `docs/privacy-and-security.md` : nuances sur le consentement, le stockage navigateur, le chiffrement applicatif envisagé, la résilience à une compromission et le No Trust by Default.
- `README.md` : navigation vers la documentation produit et clarification de l'ordre historique d'implémentation.
- `packages/compatibility-engine/README.md` : contrat API TypeScript public de Phase 0, usage, types, statuts, codes, preuves, marge, invalidité et limites.
- `README.fr.md` : miroir français du README racine.
- `docs/fr/` : miroirs français de la vision produit, du périmètre et de la roadmap, du cadre de décision, de l'architecture et de la confidentialité/sécurité.
- `packages/compatibility-engine/README.fr.md` : miroir français du contrat API public du package.
- `packages/compatibility-engine/package.json` : manifeste, scripts et format ESM du package.
- `packages/compatibility-engine/tsconfig.json` : configuration TypeScript minimale.
- `packages/compatibility-engine/src/` : types, codes de raison et évaluation pure de la longueur GPU.
- `packages/compatibility-engine/test/` : 10 tests ciblés sur les cas valides, bloquants, absents et invalides, exécutés via l'entrée publique du package.
- `package-lock.json` : verrouillage des dépendances npm minimales.
- Workspace local actuel : dépôt `FitMyLife/`. L'ancien nom local du dossier est conservé uniquement comme historique documentaire.
- La jonction `node_modules/@fitmylife/compatibility-engine` est de type `Junction` vers `packages/compatibility-engine`.
- Depuis une nouvelle tâche correctement rattachée à ce workspace, le build, le typecheck, les 10 tests, l'import public du package et les déclarations TypeScript générées ont réussi.
- Repository canonique : `https://github.com/NoisyBoyFR/FitMyLife`. L'ancien nom `fitmylife` est conservé uniquement comme historique ; `main` reste à `1d7faca4bd414723ae99b1c3e73d97cd6680cd03`. La publication contrôlée est portée par `codex/phase-0`, ses deux jalons substantiels, ses jalons documentaires connus et la PR brouillon n° 1.
- Le renommage GitHub et la visibilité privée sont vérifiés par Work et formellement fermés.

`.ai-workflow/DEFERRED-ISSUES.md` n'a pas été modifié : l'inspection n'a révélé aucun défaut reporté nécessitant une nouvelle entrée durable.

## 7. Étape actuelle et exclusions

**Étape terminée :** conception, documentation, tests et vérification du contrat API TypeScript public de Phase 0, puis création et vérification de la première vague de miroirs français et correction des deux baselines anglaises obsolètes.

**Étape terminée :** inspection et renommage du repository GitHub en `FitMyLife`, avec visibilité privée conservée et remote local actualisé.

**Étape formellement fermée :** vérification Work du renommage GitHub et de la visibilité privée.

**Étape formellement fermée :** préparation documentaire de la publication Phase 0, vérifiée par Work.

**Prochaine étape attendue :** vérification indépendante de la PR brouillon n° 1 par Work, puis décision utilisateur.

**Exclusions de publication :** `AGENTS.md`, `BOOTSTRAP-CODEX.txt`, `BOOTSTRAP-WORK.txt`, `node_modules/`, `dist/`, caches, fichiers temporaires, secrets et autres artefacts locaux ignorés.
**Hors périmètre actuel :** moteur complet, autres règles PC, `My Stuff`, catalogue, providers, UI, API HTTP ou service réseau, persistance, authentification, scoring, LLM et recommandations d'achat.

Ne pas commencer une fonctionnalité avant cette inspection et les arbitrages correspondants.

**Manifeste Phase 0 validé pour publication :**

- `.gitignore`, `TASKS.md`, `README.md`, `README.fr.md` ;
- `docs/architecture.md`, `docs/privacy-and-security.md`, `docs/product-vision.md`, `docs/product-scope-and-roadmap.md`, `docs/decision-framework.md` et les cinq miroirs de `docs/fr/` ;
- `package.json` et `package-lock.json` ;
- les README existants des packages et `packages/providers/src/provider-adapter.ts` ;
- `.ai-workflow/` assaini ;
- le manifeste, la configuration, les sources, les tests et les deux README de `packages/compatibility-engine/`.

**Déjà présents dans le HEAD de base :** `.gitignore`, `TASKS.md`, les README des packages `affordability-engine`, `location-engine`, `providers` et `compatibility-engine`, `packages/providers/src/provider-adapter.ts`, `docs/architecture.md`, `docs/privacy-and-security.md` et le manifeste racine `package.json`.

**Fichiers modifiés ou ajoutés par la publication :** `README.md`, `README.fr.md`, les modifications des deux documents techniques anglais, les trois documents produit anglais et leurs cinq miroirs français, `package.json`, `package-lock.json`, `.ai-workflow/` assaini et l'ensemble du manifeste/configuration/sources/tests/README français de `packages/compatibility-engine/`. Ces 27 fichiers du manifeste sont suivis sur la branche et présents dans la PR ; leur historique détaillé doit être lu dans Git.

Les fichiers exclus ci-dessus restent locaux et ne sont ni supprimés ni ajoutés aux règles d'ignorance.

## 8. Risques et questions ouvertes

Les risques produit, techniques et de sécurité sont désormais recensés dans la section `Risk register` de `docs/product-scope-and-roadmap.md` et complétés par les garde-fous de `docs/privacy-and-security.md`. Les questions prioritaires restent dans `docs/product-scope-and-roadmap.md` et `docs/decision-framework.md`. Ces éléments ne constituent pas automatiquement des tâches prioritaires ni des entrées de `DEFERRED-ISSUES.md` ; ils doivent être réévalués selon la phase et le périmètre développé.

## 9. Dernier rapport Codex

**Date :** 2026-08-17

**Type :** publication contrôlée de Phase 0 et création d'une PR brouillon
**Statut :** `PHASE 0 PUBLIÉE EN PR BROUILLON — À VÉRIFIER PAR WORK`

Le dépôt local `FitMyLife/` et la racine Git sont cohérents. Le repository canonique est `https://github.com/NoisyBoyFR/FitMyLife`, l'ancien nom `fitmylife` étant conservé uniquement comme historique. La publication contrôlée est portée par `codex/phase-0` ; les deux jalons substantiels et les jalons documentaires connus sont consultables dans Git et GitHub. La PR brouillon n° 1 cible `main` à l'adresse `https://github.com/NoisyBoyFR/FitMyLife/pull/1`. Le build, le typecheck, les 10 tests, l'import public, les déclarations TypeScript et `git diff --check` ont réussi. Aucun merge n'a été effectué. La Phase 0 reste ouverte pour la vérification Work et la validation utilisateur.

## Règles de mise à jour

Mettre à jour ce fichier lorsque la phase, l'étape active, une décision structurante, une fonctionnalité terminée, une contrainte durable, un risque important ou la prochaine entrée attendue change. Ne pas y recopier tout l'historique du projet.
