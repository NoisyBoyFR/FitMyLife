# START HERE — Work ↔ Codex Development Loop

Ce dossier définit le protocole de développement assisté par IA du projet.

Il doit permettre à une nouvelle conversation ChatGPT Work ou à une nouvelle session Codex de reprendre le projet sans dépendre uniquement de l'historique conversationnel.

---

## 1. Ordre de lecture recommandé

Lire :

1. `METHOD.md`
2. `PROJECT-STATE.md`
3. `DEFERRED-ISSUES.md`
4. `HANDOFF-PROTOCOL.md`
5. `CODEX-PROMPTS.md`

`.ai-workflow/START-HERE.md` et les fichiers qu'il référence constituent le protocole durable Work ↔ Codex.

---

## 2. Répartition des rôles

### Utilisateur

L'utilisateur :

- définit la vision produit ;
- choisit les priorités ;
- arbitre les propositions ;
- valide les étapes importantes ;
- conserve l'autorité finale.

### ChatGPT Work

Work :

- maintient le contexte fonctionnel ;
- analyse les rapports Codex ;
- challenge les propositions ;
- détecte les dérives de périmètre ;
- prépare les passations vers Codex ;
- conserve la continuité entre les étapes ;
- ne doit pas prétendre connaître l'état réel du dépôt sans preuve suffisante.

### Codex

Codex :

- inspecte le dépôt réel ;
- vérifie Git, le code, les tests et la documentation ;
- établit la vérité technique ;
- propose des solutions fondées sur cet état ;
- implémente les étapes validées ;
- exécute les validations techniques.

### Git / GitHub

Git et GitHub assurent :

- la traçabilité ;
- l'historique ;
- la vérification des changements ;
- la référence sur les branches, commits et PR.

---

## 3. Principe central

**Work transmet l'intention et le contexte. Codex établit la vérité technique. L'utilisateur arbitre. Codex exécute. Work analyse le résultat.**

Une hypothèse technique formulée par Work doit être présentée comme une hypothèse à vérifier lorsqu'une inspection du dépôt peut la confirmer ou l'infirmer.

---

## 4. Cycle standard

```text
INSPECT
   ↓
DECISION
   ↓
EXECUTE
   ↓
VERIFY
   ↓
CLOSE
   ↓
INSPECT
```

Le projet doit toujours avoir une phase explicite dans `PROJECT-STATE.md`.

---

## 5. Démarrage d'une nouvelle conversation Work

Message minimal recommandé :

> Lis d'abord `.ai-workflow/START-HERE.md` et les fichiers qu'il référence.
>
> Utilise-les comme protocole de travail pour cette conversation.
>
> Prends connaissance de `.ai-workflow/PROJECT-STATE.md` et détermine où nous sommes dans le cycle Work ↔ Codex.
> Ne lance aucune implémentation de toi-même.

---

## 6. Démarrage d'une nouvelle session Codex

Message minimal recommandé :

> Inspecte le projet et prends connaissance de son contexte et de ses règles avant toute action.
> Base-toi sur l'état réel du dépôt et sur les fichiers de `.ai-workflow/`.

Le protocole durable est défini par ce dossier et les fichiers qu'il référence.

---

## 7. Quand le dépôt et les fichiers de contexte divergent

Priorité :

1. état réel du dépôt ;
2. Git / GitHub ;
3. résultats des tests ;
4. documentation technique récente ;
5. `PROJECT-STATE.md` ;
6. anciens rapports et anciens résumés.

La divergence doit être signalée et, si nécessaire, `PROJECT-STATE.md` doit être corrigé.

---

## 8. Ce que ce workflow cherche à éviter

- développement piloté par un résumé obsolète ;
- Codex utilisé comme simple générateur de code ;
- refontes inutiles ;
- gold plating ;
- dérive de périmètre ;
- perte des défauts mineurs ;
- décisions importantes prises sans validation utilisateur ;
- opérations Git non autorisées ;
- répétition de longues explications à chaque conversation.
