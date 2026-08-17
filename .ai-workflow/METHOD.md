# Méthode — Work ↔ Codex Development Loop

## 1. Objectif

Cette méthode structure un développement logiciel réalisé avec :

- un humain qui garde l'autorité ;
- une couche de contexte et d'orchestration ;
- un agent capable d'inspecter et de modifier réellement le dépôt ;
- Git comme système de traçabilité.

Elle vise à éviter qu'une IA de contexte invente l'état technique du projet ou qu'un agent de code développe sans cadre.

---

# 2. Sources d'autorité

| Domaine | Autorité principale |
|---|---|
| Vision produit | Utilisateur |
| Arbitrage | Utilisateur |
| Contexte fonctionnel | Work |
| État technique réel | Codex |
| Historique | Git / GitHub |
| Résultats de validation | Tests / commandes exécutées |

Aucune source secondaire ne doit remplacer silencieusement l'autorité principale.

---

# 3. Cycle

## INSPECT

### But

Établir l'état réel du projet avant de choisir la suite.

### Utiliser cette phase lorsque

- le développement reprend après une pause ;
- une étape vient d'être terminée ;
- l'état du dépôt est incertain ;
- une nouvelle conversation commence ;
- la documentation peut être en retard ;
- plusieurs solutions semblent possibles.

### Résultat attendu

Un diagnostic, pas une implémentation.

Codex doit pouvoir préciser :

- état Git ;
- architecture pertinente ;
- fonctionnalités réellement présentes ;
- tests disponibles ;
- dette ou défauts visibles ;
- risques ;
- prochaine étape technique proposée.

---

## DECISION

### But

Faire arbitrer les choix importants par l'utilisateur.

Work doit :

- analyser la proposition ;
- vérifier sa cohérence avec la vision ;
- distinguer nécessité et préférence ;
- repérer les extensions de périmètre ;
- présenter les compromis ;
- demander une validation lorsqu'elle est requise.

Cette phase peut être très courte si la décision est évidente et déjà explicitement donnée.

---

## EXECUTE

### But

Implémenter l'étape validée.

Principes :

- périmètre borné ;
- changement minimal cohérent ;
- pas de refonte opportuniste ;
- pas de fonctionnalité annexe non validée ;
- tests adaptés ;
- respect des conventions existantes ;
- Git maîtrisé.

---

## VERIFY

### But

Vérifier une implémentation, une hypothèse, un bug ou un risque.

Cette phase est particulièrement utile lorsque Work soupçonne un problème.

Work ne doit pas écrire :

> Remplace X par Y.

si la cause n'est pas démontrée.

Il doit préférer :

> J'ai identifié un risque potentiel concernant X. Inspecte l'implémentation et détermine si ce risque existe réellement. Si oui, explique sa cause et propose la correction minimale. Si non, explique pourquoi l'implémentation actuelle est correcte.

---

## CLOSE

### But

Fermer proprement une étape.

La fermeture doit vérifier :

- objectif atteint ;
- validations terminées ;
- limites explicites ;
- défauts reportés conservés ;
- état Git connu ;
- documentation d'état mise à jour si nécessaire ;
- absence d'enchaînement implicite vers une nouvelle feature.

Une étape fermée renvoie normalement vers `INSPECT`.

---

# 4. Règle de non-présomption

Lorsqu'une donnée technique peut avoir changé, ne pas la présenter comme certaine à partir d'un ancien rapport.

Exemples :

- HEAD ;
- branche ;
- working tree ;
- fichiers présents ;
- version d'une dépendance ;
- résultat des tests ;
- architecture actuelle ;
- état d'une feature.

Demander une vérification lorsque cette donnée est nécessaire à la décision.

---

# 5. Principe de changement minimal cohérent

Le but n'est pas de produire le moins de lignes possible.

Le but est d'effectuer le plus petit changement qui :

- résout correctement le problème ;
- reste maintenable ;
- respecte l'architecture ;
- ne crée pas une dette évidente ;
- n'élargit pas inutilement le périmètre.

---

# 6. Gestion de la dette

Trois catégories doivent être distinguées.

### Défaut bloquant

Doit généralement être traité avant de poursuivre.

### Défaut non bloquant mais important

Peut être traité immédiatement ou planifié explicitement.

### Défaut mineur / amélioration reportée

Peut rester non corrigé, mais doit rester traçable dans `DEFERRED-ISSUES.md`.

Un défaut reporté ne doit jamais disparaître simplement parce qu'il n'est plus mentionné dans les conversations.

---

# 7. Gold plating

Est considéré comme gold plating :

- ajouter une abstraction non requise ;
- préparer une architecture pour une hypothétique V10 ;
- ajouter des fonctionnalités annexes ;
- refondre un module stable sans nécessité ;
- traiter une dette sans rapport avec la mission ;
- améliorer l'UI, les performances ou la structure sans lien direct avec l'objectif validé.

Si une amélioration semble réellement importante, la rapporter séparément.

---

# 8. Décisions irréversibles ou coûteuses

Toute décision ayant un impact majeur doit être remontée à l'utilisateur avant exécution lorsque plusieurs options raisonnables existent.

Exemples :

- changement majeur d'architecture ;
- suppression de données ;
- migration destructive ;
- modification de contrat public ;
- remplacement d'une technologie structurante ;
- refonte de modèle de données ;
- changement de stratégie de distribution ;
- opération Git destructive.

---

# 9. Rapport plutôt qu'action silencieuse

Si Codex découvre pendant l'exécution :

- une dette adjacente ;
- une faiblesse non bloquante ;
- une optimisation possible ;
- une feature complémentaire ;
- un chantier plus large ;

il doit préférer la signaler dans le rapport plutôt que l'ajouter silencieusement à la mission.

---

# 10. Boucle continue

```text
état réel
    ↓
inspection
    ↓
proposition
    ↓
arbitrage humain
    ↓
implémentation
    ↓
validation
    ↓
fermeture
    ↓
nouvel état réel
```

Chaque nouvelle décision doit idéalement partir du résultat réel de la précédente.

---

# 11. Boucle séquentielle de validation par point

Toute phase future contenant un ou plusieurs points validés, qu'ils soient
fonctionnels, techniques, documentaires, de sécurité, de confidentialité ou
de publication, doit d'abord posséder un plan de phase explicitement validé.
Le plan décrit, pour chaque point :

- un identifiant stable ;
- un objectif ;
- un périmètre et des exclusions ;
- les dépendances ;
- les critères de clôture.

Un seul point peut être actif à la fois. Les idées `ENVISAGÉES`, `FUTUR`, `À
DÉCIDER`, hypothétiques, rejetées ou simplement comparées ne peuvent pas
entrer dans le plan d'exécution sans validation explicite.

Pour chaque point, `EXECUTE`, `VERIFY` et `CLOSE` sont normalement des missions
distinctes :

```text
PLAN DE PHASE VALIDÉ
    ↓
POINT N — EXECUTE
    ↓
rapport Codex → analyse Work
    ↓
POINT N — VERIFY
    ↓
si échec : correction ciblée → nouvelle mission VERIFY
    ↓
POINT N — CLOSE
    ↓
point suivant uniquement après fermeture explicite
```

La mission `EXECUTE` traite uniquement le point actif, exécute ses validations
prévues, produit un rapport et rend la main à Work. Elle ne commence jamais le
point suivant.

La mission `VERIFY` inspecte indépendamment le résultat et vérifie les critères
de clôture. Une validation échouée maintient le même point actif. La correction
reste limitée au défaut confirmé et fait l'objet d'une nouvelle mission ; elle
ne doit pas être dissimulée dans une mission strictement `VERIFY`.

La mission `CLOSE` confirme l'objectif, les validations, les limites et l'état
durable, puis ferme uniquement le point courant. Le point suivant ne peut
commencer qu'après cette fermeture explicite et l'analyse de Work.

Un arbitrage produit, une extension de périmètre, une opération destructive ou
une nouvelle permission Git/GitHub impose un arrêt. Commit, push, PR, merge et
publication restent soumis aux autorisations explicites prévues par la
mission.

Après fermeture de tous les points, la phase suit cette séquence :

```text
audit global de phase
    ↓
préparation et publication contrôlées
    ↓
vérification Work et validation utilisateur du merge
    ↓
CLOSE de la phase
    ↓
ARRÊT — nouvelle mission INSPECT obligatoire
```

La suppression d'une branche de publication est facultative et conditionnelle.
Elle ne peut intervenir qu'après la réussite réelle du merge autorisé, la
confirmation du contenu attendu sur la branche cible et la réussite des
validations post-merge nécessaires, avec une autorisation utilisateur explicite
couvrant cette suppression. L'autorisation du merge ne vaut pas à elle seule
autorisation de supprimer la branche, sauf autorisation conjointe explicite.
Toute suppression locale ou distante reste limitée au périmètre autorisé et ne
doit jamais suivre un échec de merge ou un doute sur le contenu publié.

La validation globale ne remplace pas la validation de chaque point. Cette
boucle ne constitue pas une autorisation permanente d'exécuter toutes les
fonctionnalités évoquées pendant un brainstorming.
