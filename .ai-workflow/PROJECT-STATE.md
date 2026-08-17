# Project State

> Ce fichier décrit le dernier état connu du projet. Il ne remplace pas une inspection réelle du dépôt.

## 1. Identification

**Projet :** FitMyLife

**Repository :** https://github.com/NoisyBoyFR/FitMyLife
**Objectif produit :** assistant personnel d'aide à la décision pour recommander des produits et services réellement adaptés à la vie de l'utilisateur, de manière explicable et privacy-first.

## 2. Phase actuelle du workflow

**Phase :** `CLOSE`

**État courant autoritatif :** les points `P2-0 — Formalisation durable de la
boucle séquentielle par point`, `P2-1 — Règle GPU/épaisseur interne` et
`P2-PUB-1 — Actualisation des README racine avant publication` sont `CLOSED`.
La Phase 2 est validée par Work et par l'utilisateur ; l'autorisation explicite
du squash merge est enregistrée. La PR brouillon n° 4 est son véhicule de
publication et la Phase 2 sera fermée lorsque cet état documentaire sera
présent sur `main` par le merge de cette PR. Git et GitHub restent les sources
de vérité pour le squash commit et l'état exact du merge. La baseline validée
comprend 47 tests, dont 27 tests P2-1. La règle GPU/épaisseur reste interne,
l'API publique reste limitée à `evaluateGpuCaseLength`, et aucune agrégation,
nouvelle contrainte ou dépendance n'est autorisée. Aucun P2-2 n'a commencé.
Chaque point validé reste soumis aux missions distinctes `EXECUTE`, `VERIFY`
et `CLOSE`, et aucun point n'est actif. Après la clôture réussie, la prochaine
mission est une nouvelle mission `INSPECT`, distincte, avant toute décision de
Phase 3. L'arrêt est obligatoire après la clôture de la Phase 2.

Les éléments historiques détaillés dans la description qui suit ne remplacent
pas cet état courant.

### Historique des états antérieurs

Le contrat API TypeScript public de Phase 0 est fermé. La première vague de traduction française et les corrections documentaires associées ont été vérifiées et l'étape est fermée. Le renommage local vers le dépôt `FitMyLife/` et la réparation manuelle de la jonction npm sont vérifiés et fermés. Le renommage GitHub vers `FitMyLife` et la visibilité privée ont été vérifiés par Work et sont formellement fermés ; la permission administrateur et le remote local correct sont confirmés. La Phase 0 est terminée et validée par l'utilisateur ; sa publication a été portée par la PR n° 1. La passerelle interne `My Stuff` GPU/boîtier de Phase 1 est terminée, vérifiée et validée par l'utilisateur : elle reste étroite, en mémoire, délègue entièrement à `evaluateGpuCaseLength` et ne modifie pas l'API publique. La PR n° 2 constitue son véhicule de publication et son squash merge est enregistré par Git et GitHub. La suite officielle contient 20 tests et la CI durable valide les futures pull requests vers `main`. Aucune liste exhaustive auto-référentielle des commits de branche ni aucun hash futur de clôture n'est figé ici. L'accueil GitHub bilingue est terminé, vérifié et validé par l'utilisateur : les résumés anglais et français sont directement visibles, `README.md` reste canonique en anglais et `README.fr.md` reste le miroir français complet. La PR n° 3 constitue son véhicule de publication et son squash merge autorisé rend cet état canonique sur `main` après le merge ; Git et GitHub restent la source de vérité du commit résultant. La description GitHub et les topics restent inchangés ; aucun tag ni release n'a été créé. À cette date, la phase courante du workflow était `CLOSE`. À cette date, aucun contenu de Phase 2 n'avait encore commencé. La prochaine étape prévue à cette date était une nouvelle mission `INSPECT` avant toute décision de Phase 2.

**Dernière mise à jour :** 2026-08-17

## 3. Référence Git et état de publication

**Branche de publication historique :** `codex/phase-0`

**HEAD de base de `main` :** `1d7faca4bd414723ae99b1c3e73d97cd6680cd03` — `Initialize FitMyLife`

**Historique et HEAD de publication :** à inspecter dans Git et GitHub ; ce document ne fige ni le HEAD courant de sa propre branche ni le hash du futur squash merge.

**État publié :** les documents, la configuration npm et le Compatibility Engine de Phase 0 sont suivis dans le périmètre publié. `node_modules/` et `dist/` restent ignorés ; les trois fichiers locaux exclus restent non suivis et ne font pas partie du projet publié.

La branche historique `codex/phase-0` a porté la publication contrôlée et la PR n° 1. Son résultat exact est consultable dans Git et GitHub. Aucun tag, release, issue ou changement de visibilité n'est requis par cette clôture. La passerelle interne GPU/boîtier est la seule tranche de Phase 1 implémentée ; l'étape technique et la validation de sa publication sont fermées. La PR n° 2 constitue le véhicule de publication de la Phase 1 et son squash merge autorisé rend cet état canonique sur `main`. Git et GitHub restent la source de vérité du commit de squash ; aucune liste exhaustive auto-référentielle des commits ni aucun hash futur n'est fixé ici. À la clôture de la Phase 1, aucun contenu de Phase 2 n'avait encore commencé.

## 4. État technique réellement observé

- Les documents techniques et produit de Phase 0 sont désormais suivis dans l'état publié ; `architecture.md` et `privacy-and-security.md` proviennent de la base et les documents produit ont été ajoutés par la publication.
- Package READMEs pour `compatibility-engine`, `affordability-engine`, `location-engine` et `providers`.
- Contrat TypeScript initial `packages/providers/src/provider-adapter.ts`.
- Backlog dans `TASKS.md`.
- Une tranche exécutable et testée du `Compatibility Engine` existe dans `packages/compatibility-engine/` : longueur GPU candidate contre espace GPU effectif du boîtier.
- Cette tranche comprend un modèle TypeScript minimal, une fonction pure, 10 tests Node natifs et des scripts npm de typecheck/test.
- La Phase 1 ajoute une passerelle interne étroite entre deux faits `My Stuff` en mémoire — longueur du GPU candidat et espace GPU effectif du boîtier existant — et `evaluateGpuCaseLength`. Elle ne duplique aucune validation ni règle métier, ne modifie pas l'API publique et ajoute 10 tests ciblés séparés.
- Historiquement, avant l'ajout de la règle candidate, la commande officielle `npm test` exécutait 20 tests : 10 tests Phase 0 et 10 tests de la passerelle Phase 1.
- Aucun moteur complet, aucune interface produit, aucune intégration fournisseur, aucune persistance et aucune décision d'achat ne sont implémentés.
- `package.json` définit un workspace npm et Node `>=22` ; TypeScript est la seule dépendance de développement de la tranche.

### État de travail observé pour P2-1

- Les 27 tests dédiés de P2-1 sont validés et la baseline locale validée comprend
  47 tests au total ; cette baseline reste locale et non publiée.
- L'API publique observée reste limitée à `evaluateGpuCaseLength`.
- `packages/compatibility-engine/src/gpu-case-thickness.ts` et son fichier de
  tests sont présents comme règle interne validée et fermée, uniquement dans le
  working tree.
- Le manifeste du package inclut déjà le fichier de test candidat ; ce changement
  est préexistant et n'est pas modifié par P2-1.
- P2-1 n'ajoute aucune API publique, agrégation, autre contrainte PC, nouvelle
  dépendance ou publication Phase 2.

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
- `packages/compatibility-engine/package.json` : manifeste, scripts, format ESM et commande officielle intégrant les trois fichiers de test.
- `packages/compatibility-engine/tsconfig.json` : configuration TypeScript minimale.
- `packages/compatibility-engine/src/` : types, codes de raison, évaluation pure de la longueur GPU et passerelle interne `My Stuff` GPU/boîtier.
- `packages/compatibility-engine/src/my-stuff-gpu-case.ts` : contrats internes étroits et adaptateur pur vers la règle GPU/boîtier existante.
- Historiquement, `packages/compatibility-engine/test/` comprenait 10 tests publics de Phase 0 et 10 tests ciblés de la passerelle interne, exécutés par la suite officielle de 20 tests sans élargir l'entrée publique du package.
- `package-lock.json` : verrouillage des dépendances npm minimales.
- Workspace local actuel : dépôt `FitMyLife/`. L'ancien nom local du dossier est conservé uniquement comme historique documentaire.
- La jonction `node_modules/@fitmylife/compatibility-engine` est de type `Junction` vers `packages/compatibility-engine`.
- Historiquement, depuis une nouvelle tâche correctement rattachée à ce workspace, le build, le typecheck, la suite officielle de 20 tests, l'import public du package et les déclarations TypeScript générées ont réussi.
- Repository canonique : `https://github.com/NoisyBoyFR/FitMyLife`. L'ancien nom `fitmylife` est conservé uniquement comme historique. La publication contrôlée est portée par la PR n° 1 et son squash merge autorisé ; son historique et le commit exact résultant sont consultables dans Git et GitHub.
- Le renommage GitHub et la visibilité privée sont vérifiés par Work et formellement fermés.

`.ai-workflow/DEFERRED-ISSUES.md` n'a pas été modifié : l'inspection n'a révélé aucun défaut reporté nécessitant une nouvelle entrée durable.

## 7. Étape actuelle et exclusions

### État courant de la boucle

- Phase workflow : `CLOSE`.
- Aucun point actif.
- Statut : Phase 2 validée par Work et par l'utilisateur ; clôture portée par la PR n° 4.
- P2-0 : `CLOSED`.
- P2-1 : `CLOSED`.
- P2-PUB-1 : `CLOSED`.
- Audit global de Phase 2 : conforme.
- Préparation documentaire : fermée.
- Les README racine sont actualisés et vérifiés ; les README du package sont cohérents.
- Tous les points actuellement validés de Phase 2 sont fermés.
- Un seul point peut être actif à la fois.
- Aucun passage automatique au point suivant n'est autorisé.
- La branche `codex/phase-2` et la PR n° 4 portent la publication contrôlée ; le squash merge autorisé est le véhicule de clôture.
- La règle GPU/épaisseur est validée, fermée et reste interne.
- La baseline locale validée est de 47 tests, dont 27 tests P2-1.
- L'API publique reste limitée à `evaluateGpuCaseLength`.
- Aucune agrégation, autre contrainte ou nouvelle dépendance n'est autorisée.
- La PR n° 4 reste le véhicule du squash merge autorisé ; Git et GitHub feront foi pour son résultat exact.
- Aucune autre contrainte PC, agrégation ou nouvelle fonctionnalité Phase 2 n'est autorisée.
- La Phase 2 est fermée lorsque cet état documentaire est présent sur `main` par le merge de la PR n° 4.
- La prochaine mission après clôture réussie est une nouvelle mission `INSPECT`, avant toute décision de Phase 3.

**Étape terminée :** conception, documentation, tests et vérification du contrat API TypeScript public de Phase 0, puis création et vérification de la première vague de miroirs français et correction des deux baselines anglaises obsolètes.

**Étape terminée :** inspection et renommage du repository GitHub en `FitMyLife`, avec visibilité privée conservée et remote local actualisé.

**Étape formellement fermée :** vérification Work du renommage GitHub et de la visibilité privée.

**Étape formellement fermée :** préparation documentaire de la publication Phase 0, vérifiée par Work.

**Étape historique avant P2-0 :** une nouvelle mission `INSPECT` était attendue avant toute décision de Phase 2.

**Étape formellement fermée :** implémentation, vérification et validation utilisateur de la passerelle minimale `My Stuff` GPU/boîtier. La Phase 1 est terminée ; la PR n° 2 en constitue le véhicule de publication et le squash merge autorisé.

**Exclusions de publication :** `AGENTS.md`, `BOOTSTRAP-CODEX.txt`, `BOOTSTRAP-WORK.txt`, `node_modules/`, `dist/`, caches, fichiers temporaires, secrets et autres artefacts locaux ignorés.
**Hors périmètre non autorisé au stade courant :** moteur complet, autres règles PC, modèle `My Stuff` générique, inventaire, catalogue, providers, UI, API HTTP ou service réseau, persistance, authentification, scoring, LLM, recommandations d'achat, toute nouvelle fonctionnalité Phase 2, toute opération Git ou GitHub hors du squash merge autorisé et de la suppression conditionnelle prévue. La seule tranche Phase 1 implémentée est la passerelle interne limitée au GPU et au boîtier existant ; P2-1 reste une règle interne étroite et fermée.

Ne pas commencer de nouvelle fonctionnalité Phase 2 ni d'autre contrainte PC. Après la clôture réussie, la prochaine mission attendue est une nouvelle mission `INSPECT` avant toute décision de Phase 3 ; aucun P2-2 ne peut commencer.

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

### Rapport courant — clôture Phase 2 avant merge

P2-0, P2-1 et P2-PUB-1 sont fermés et la Phase 2 est validée par Work et par
l'utilisateur. La PR n° 4 est le véhicule de publication et l'autorisation
explicite de son squash merge est enregistrée. Cet état de `CLOSE` devient
canonique lorsque ce document est présent sur `main` par le merge ; Git et
GitHub restent les sources de vérité pour le squash commit et l'état exact du
merge.

La baseline validée est de 47 tests, dont 27 tests dédiés à P2-1. La règle
GPU/épaisseur reste interne, l'API publique reste limitée à
`evaluateGpuCaseLength`, et aucune agrégation, nouvelle contrainte ou
dépendance n'est ajoutée. Aucun P2-2 n'a commencé. Après la clôture réussie,
la prochaine mission est une nouvelle mission `INSPECT`, distincte, avant toute
décision de Phase 3. L'arrêt est obligatoire après la clôture de la Phase 2.

### Rapport historique précédent

**Date :** 2026-08-17

**Type :** clôture contrôlée de l'accueil GitHub bilingue
**Statut :** `CLOSE — ACCUEIL GITHUB BILINGUE TERMINÉ ET VALIDÉ`

Le dépôt `FitMyLife/` et la racine Git sont cohérents. La passerelle interne `My Stuff` GPU/boîtier de Phase 1 reste terminée, vérifiée et validée par l'utilisateur ; la Phase 1 est fermée et aucune Phase 2 n'a commencé. L'introduction compacte de l'accueil GitHub rend directement visibles les résumés anglais et français, conserve l'anglais comme canonique et conserve `README.fr.md` comme miroir français complet. La PR n° 3 constitue le véhicule de publication de cette étape et son squash merge autorisé rend cet état canonique sur `main` après le merge. Git et GitHub restent la source de vérité du commit résultant ; aucun hash futur ni total auto-référentiel de commits n'est figé. La description GitHub et les topics restent inchangés, aucun tag ou release n'a été créé, et aucune Phase 2 n'a commencé. La prochaine étape est une nouvelle mission `INSPECT` avant toute décision de Phase 2.

## Règles de mise à jour

Mettre à jour ce fichier lorsque la phase, l'étape active, une décision structurante, une fonctionnalité terminée, une contrainte durable, un risque important ou la prochaine entrée attendue change. Ne pas y recopier tout l'historique du projet.
