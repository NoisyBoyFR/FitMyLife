# Protocole de passation Work ↔ Codex

Ce fichier définit les informations qui doivent survivre entre les outils, sessions et conversations.

---

# 1. Work → Codex

Une mission Codex doit contenir uniquement le contexte utile.

## Champs recommandés

### CONTEXTE

Ce que Codex doit savoir pour comprendre la mission.

### OBJECTIF

Un résultat clair et vérifiable.

### PHASE

`INSPECT`, `EXECUTE`, `VERIFY` ou `CLOSE`.

### PÉRIMÈTRE

Ce qui fait partie de la mission.

### EXCLUSIONS

Ce qui ne doit pas être traité.

### CONTRAINTES

Exemples :

- compatibilité ;
- conventions ;
- sécurité ;
- i18n ;
- données ;
- performances ;
- plateformes ;
- architecture existante.

### VALIDATION UTILISATEUR

Préciser si l'étape est :

- proposée ;
- validée ;
- en attente d'arbitrage.

### VÉRIFICATIONS REQUISES

Tests, inspection, reproduction ou commandes attendues.

### AUTORISATIONS GIT

Indiquer explicitement si Codex peut :

- commit ;
- push ;
- ouvrir une PR ;
- merge ;
- modifier l'historique.

Par défaut : non.

---

# 2. Codex → Work

Le rapport Codex doit être structuré pour permettre une analyse indépendante.

## ÉTAT INITIAL

- branche ;
- HEAD ;
- working tree ;
- éléments importants détectés avant modification.

## DIAGNOSTIC OU OBJECTIF

Ce que Codex a compris de la mission.

## TRAVAIL RÉALISÉ

- changements effectués ;
- composants touchés ;
- logique adoptée.

## FICHIERS PRINCIPAUX

Lister les fichiers principaux modifiés ou créés.

Éviter les listes gigantesques si elles n'apportent rien.

## CHOIX TECHNIQUES

Expliquer les décisions non triviales.

## TESTS

- tests ajoutés ;
- tests modifiés ;
- tests supprimés, avec justification.

## VALIDATIONS

Donner les commandes importantes réellement exécutées et leur résultat.

Exemples :

- typecheck ;
- lint ;
- format ;
- build ;
- tests ciblés ;
- suite complète ;
- vérification spécifique au dépôt.

## PROBLÈMES RENCONTRÉS

Distinguer :

- problème résolu ;
- problème restant ;
- anomalie extérieure à la mission.

## DETTE / LIMITES

Lister explicitement :

- défauts mineurs non corrigés ;
- TODO reportés ;
- limites connues ;
- risques ;
- zones non couvertes.

## ÉTAT FINAL

- branche ;
- HEAD ;
- working tree ;
- opérations Git réalisées ;
- fichiers non suivis pertinents ;
- changement extérieur éventuellement détecté.

## STATUT

Utiliser un statut clair :

- `INSPECTION TERMINÉE — EN ATTENTE DE DÉCISION`
- `IMPLÉMENTATION TERMINÉE — À VÉRIFIER`
- `VÉRIFICATION TERMINÉE`
- `ÉTAPE FERMÉE`
- `BLOQUÉ`

---

# 3. Work analyse le rapport, il ne le paraphrase pas seulement

Après réception d'un rapport, Work doit vérifier :

- cohérence avec la vision produit ;
- cohérence du périmètre ;
- présence éventuelle de gold plating ;
- dépendances sautées ;
- hypothèses non démontrées ;
- validations insuffisantes ;
- dette perdue ;
- changement architectural disproportionné ;
- besoin d'un arbitrage utilisateur.

---

# 4. Règle des hypothèses

Si Work pense :

> Cette méthode JavaScript perd son `this`.

il ne doit pas nécessairement envoyer :

> Transforme toutes les méthodes en fonctions fléchées.

Il doit préférer :

> Un risque de perte de contexte `this` a été identifié. Vérifie si les méthodes publiques sont utilisées non liées et si cela peut provoquer l'erreur observée. Si le risque est confirmé, propose la correction minimale.

Le dépôt décide, pas l'intuition.

---

# 5. Continuité du projet

Après une étape significative, les informations durables doivent être reportées dans :

- `PROJECT-STATE.md`
- `DEFERRED-ISSUES.md`

Une conversation seule ne doit pas être la seule source de mémoire du projet.
