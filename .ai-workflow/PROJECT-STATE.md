# Project State

> Ce fichier décrit le dernier état connu du projet. Il ne remplace pas une inspection réelle du dépôt.

## 1. Identification

**Projet :** FitMyLife

**Repository :** https://github.com/NoisyBoyFR/FitMyLife
**Objectif produit :** assistant personnel d'aide à la décision pour recommander des produits et services réellement adaptés à la vie de l'utilisateur, de manière explicable et privacy-first.

## 2. Phase actuelle du workflow

**Phase :** `VERIFY`

Le contrat API TypeScript public de Phase 0 est fermé. La première vague de traduction française et les corrections documentaires associées ont été vérifiées et l'étape est fermée. Le renommage local vers le dépôt `FitMyLife/` et la réparation manuelle de la jonction npm sont vérifiés et fermés. Le renommage GitHub vers `FitMyLife` et la visibilité privée ont été vérifiés par Work et sont formellement fermés ; la permission administrateur et le remote local correct sont confirmés. La Phase 0 est terminée et validée par l'utilisateur ; sa publication a été portée par la PR n° 1. La passerelle interne `My Stuff` GPU/boîtier de Phase 1 est terminée, vérifiée et validée par l'utilisateur : elle reste étroite, en mémoire, délègue entièrement à `evaluateGpuCaseLength` et ne modifie pas l'API publique. La PR n° 2 constitue son véhicule de publication et le squash merge autorisé ; l'état exact du résultat est la source de vérité de Git et GitHub et cet état documentaire devient canonique sur `main` après le merge. La suite officielle contient 20 tests et la CI durable valide les futures pull requests vers `main`. Aucune liste exhaustive auto-référentielle des commits de branche ni aucun hash futur de clôture n'est figé ici. La présentation bilingue de l'accueil GitHub est publiée sur `codex/bilingual-github-home` et portée par la PR brouillon n° 3 (https://github.com/NoisyBoyFR/FitMyLife/pull/3). La phase courante du workflow est `VERIFY` ; la CI applicable et l'état exact de son run doivent être consultés dans GitHub. La description GitHub et les topics restent inchangés ; aucun tag ni release n'a été créé. Aucune Phase 2 n'a commencé. La prochaine étape est la vérification Work du rendu, de la PR et de la CI.

**Dernière mise à jour :** 2026-08-17

## 3. Référence Git et état de publication

**Branche de publication historique :** `codex/phase-0`

**HEAD de base de `main` :** `1d7faca4bd414723ae99b1c3e73d97cd6680cd03` — `Initialize FitMyLife`

**Historique et HEAD de publication :** à inspecter dans Git et GitHub ; ce document ne fige ni le HEAD courant de sa propre branche ni le hash du futur squash merge.

**État publié :** les documents, la configuration npm et le Compatibility Engine de Phase 0 sont suivis dans le périmètre publié. `node_modules/` et `dist/` restent ignorés ; les trois fichiers locaux exclus restent non suivis et ne font pas partie du projet publié.

La branche historique `codex/phase-0` a porté la publication contrôlée et la PR n° 1. Son résultat exact est consultable dans Git et GitHub. Aucun tag, release, issue ou changement de visibilité n'est requis par cette clôture. La passerelle interne GPU/boîtier est la seule tranche de Phase 1 implémentée ; l'étape technique et la validation de sa publication sont fermées. La PR n° 2 constitue le véhicule de publication de la Phase 1 et son squash merge autorisé rend cet état canonique sur `main`. Git et GitHub restent la source de vérité du commit de squash ; aucune liste exhaustive auto-référentielle des commits ni aucun hash futur n'est fixé ici. Aucun contenu de Phase 2 n'est commencé.

## 4. État technique réellement observé

- Les documents techniques et produit de Phase 0 sont désormais suivis dans l'état publié ; `architecture.md` et `privacy-and-security.md` proviennent de la base et les documents produit ont été ajoutés par la publication.
- Package READMEs pour `compatibility-engine`, `affordability-engine`, `location-engine` et `providers`.
- Contrat TypeScript initial `packages/providers/src/provider-adapter.ts`.
- Backlog dans `TASKS.md`.
- Une tranche exécutable et testée du `Compatibility Engine` existe dans `packages/compatibility-engine/` : longueur GPU candidate contre espace GPU effectif du boîtier.
- Cette tranche comprend un modèle TypeScript minimal, une fonction pure, 10 tests Node natifs et des scripts npm de typecheck/test.
- La Phase 1 ajoute une passerelle interne étroite entre deux faits `My Stuff` en mémoire — longueur du GPU candidat et espace GPU effectif du boîtier existant — et `evaluateGpuCaseLength`. Elle ne duplique aucune validation ni règle métier, ne modifie pas l'API publique et ajoute 10 tests ciblés séparés.
- La commande officielle `npm test` exécute désormais les 20 tests de la tranche : 10 tests Phase 0 et 10 tests de la passerelle Phase 1.
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
- `README.md` : introduction bilingue compacte de l'accueil GitHub, navigation vers la documentation produit et clarification de l'ordre historique d'implémentation.
- `packages/compatibility-engine/README.md` : contrat API TypeScript public de Phase 0, usage, types, statuts, codes, preuves, marge, invalidité et limites.
- `README.fr.md` : miroir français du README racine.
- `docs/fr/` : miroirs français de la vision produit, du périmètre et de la roadmap, du cadre de décision, de l'architecture et de la confidentialité/sécurité.
- `packages/compatibility-engine/README.fr.md` : miroir français du contrat API public du package.
- `packages/compatibility-engine/package.json` : manifeste, scripts, format ESM et commande officielle intégrant les deux fichiers de test.
- `packages/compatibility-engine/tsconfig.json` : configuration TypeScript minimale.
- `packages/compatibility-engine/src/` : types, codes de raison, évaluation pure de la longueur GPU et passerelle interne `My Stuff` GPU/boîtier.
- `packages/compatibility-engine/src/my-stuff-gpu-case.ts` : contrats internes étroits et adaptateur pur vers la règle GPU/boîtier existante.
- `packages/compatibility-engine/test/` : 10 tests publics de Phase 0 et 10 tests ciblés de la passerelle interne, exécutés par la suite officielle de 20 tests sans élargir l'entrée publique du package.
- `package-lock.json` : verrouillage des dépendances npm minimales.
- Workspace local actuel : dépôt `FitMyLife/`. L'ancien nom local du dossier est conservé uniquement comme historique documentaire.
- La jonction `node_modules/@fitmylife/compatibility-engine` est de type `Junction` vers `packages/compatibility-engine`.
- Depuis une nouvelle tâche correctement rattachée à ce workspace, le build, le typecheck, la suite officielle de 20 tests, l'import public du package et les déclarations TypeScript générées ont réussi.
- Repository canonique : `https://github.com/NoisyBoyFR/FitMyLife`. L'ancien nom `fitmylife` est conservé uniquement comme historique. La publication contrôlée est portée par la PR n° 1 et son squash merge autorisé ; son historique et le commit exact résultant sont consultables dans Git et GitHub.
- Le renommage GitHub et la visibilité privée sont vérifiés par Work et formellement fermés.

`.ai-workflow/DEFERRED-ISSUES.md` n'a pas été modifié : l'inspection n'a révélé aucun défaut reporté nécessitant une nouvelle entrée durable.

## 7. Étape actuelle et exclusions

**Étape terminée :** conception, documentation, tests et vérification du contrat API TypeScript public de Phase 0, puis création et vérification de la première vague de miroirs français et correction des deux baselines anglaises obsolètes.

**Étape terminée :** inspection et renommage du repository GitHub en `FitMyLife`, avec visibilité privée conservée et remote local actualisé.

**Étape formellement fermée :** vérification Work du renommage GitHub et de la visibilité privée.

**Étape formellement fermée :** préparation documentaire de la publication Phase 0, vérifiée par Work.

**Prochaine étape attendue :** vérification Work du rendu de l'accueil bilingue, de la PR brouillon n° 3 et de la CI distante.

**Étape formellement fermée :** implémentation, vérification et validation utilisateur de la passerelle minimale `My Stuff` GPU/boîtier. La Phase 1 est terminée ; la PR n° 2 en constitue le véhicule de publication et le squash merge autorisé.

**Exclusions de publication :** `AGENTS.md`, `BOOTSTRAP-CODEX.txt`, `BOOTSTRAP-WORK.txt`, `node_modules/`, `dist/`, caches, fichiers temporaires, secrets et autres artefacts locaux ignorés.
**Hors périmètre actuel :** moteur complet, autres règles PC, modèle `My Stuff` générique, inventaire, catalogue, providers, UI, API HTTP ou service réseau, persistance, authentification, scoring, LLM, recommandations d'achat et toute fonctionnalité de Phase 2. La seule tranche Phase 1 implémentée est la passerelle interne limitée au GPU et au boîtier existant.

Ne pas commencer de fonctionnalité de Phase 2. La mission actuelle est limitée à la vérification du rendu de l'accueil bilingue, de la PR brouillon n° 3 et de la CI.

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

**Type :** publication contrôlée de l'accueil GitHub bilingue
**Statut :** `VERIFY — PR BROUILLON ET CI À VÉRIFIER`

Le dépôt `FitMyLife/` et la racine Git sont cohérents. La passerelle interne `My Stuff` GPU/boîtier de Phase 1 reste terminée, vérifiée et validée par l'utilisateur ; la Phase 1 est fermée et aucune Phase 2 n'a commencé. L'introduction compacte de l'accueil GitHub rend désormais visibles les résumés anglais et français, conserve l'anglais comme canonique et conserve `README.fr.md` comme miroir français complet. La publication est portée par `codex/bilingual-github-home` et la PR brouillon n° 3 (https://github.com/NoisyBoyFR/FitMyLife/pull/3). La CI durable est applicable à cette PR ; son état exact doit être vérifié dans GitHub. La description GitHub, les topics, les tags et les releases restent inchangés. La prochaine étape est la vérification Work du rendu, de la PR et de la CI ; aucun merge n'est effectué.

## Règles de mise à jour

Mettre à jour ce fichier lorsque la phase, l'étape active, une décision structurante, une fonctionnalité terminée, une contrainte durable, un risque important ou la prochaine entrée attendue change. Ne pas y recopier tout l'historique du projet.
