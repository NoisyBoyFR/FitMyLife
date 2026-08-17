# Templates de prompts Codex

Ces prompts sont des **templates**. Ils doivent être adaptés à l'état réel du projet.

Ne pas les copier mécaniquement si certaines sections sont inutiles.

---

# 1. INSPECT

## Quand l'utiliser

- reprise du développement ;
- nouvelle conversation ;
- étape précédente terminée ;
- état du dépôt incertain ;
- besoin de déterminer la suite.

## Template

```text
CONTEXTE

Nous reprenons le développement du projet.

Tu disposes du dépôt réel. Ne considère pas les résumés fournis comme parfaitement à jour : le dépôt, Git et les validations réelles font foi.

OBJECTIF

Détermine l'état technique actuel du projet et propose la prochaine étape pertinente.

Avant toute proposition :

1. inspecte la branche actuelle ;
2. inspecte le HEAD ;
3. vérifie l'état du working tree ;
4. examine l'architecture pertinente ;
5. examine la documentation disponible ;
6. vérifie les fonctionnalités réellement implémentées ;
7. examine les tests et outils de validation existants ;
8. consulte l'historique Git/GitHub pertinent si nécessaire ;
9. recherche les incohérences entre documentation et code.

IMPORTANT

Ne modifie aucun fichier pendant cette étape.

RECENSE ÉGALEMENT

- défauts mineurs connus non corrigés ;
- TODO reportés ;
- dette technique visible ;
- risques ;
- zones insuffisamment testées ;
- incohérences éventuelles.

Ne transforme pas automatiquement ces éléments en priorités.

PROPOSE ENSUITE

La prochaine étape logique du développement.

Explique :

- pourquoi elle doit arriver maintenant ;
- sa valeur produit ou technique ;
- son périmètre ;
- ses exclusions ;
- les composants concernés ;
- les principaux risques ;
- la stratégie de validation.

TERMINE PAR

PROCHAINE ÉTAPE PROPOSÉE — EN ATTENTE DE VALIDATION UTILISATEUR

Ne commence aucune implémentation.
```

---

# 2. EXECUTE

## Quand l'utiliser

Après validation explicite d'une étape.

## Template

```text
ÉTAPE VALIDÉE

La proposition précédente est validée.

Tu peux maintenant implémenter cette étape.

PÉRIMÈTRE

Reste strictement dans le périmètre validé.

N'ajoute pas d'améliorations annexes simplement parce qu'elles semblent intéressantes.

Les défauts mineurs précédemment identifiés mais hors périmètre restent hors périmètre.

AVANT MODIFICATION

Vérifie rapidement :

- branche actuelle ;
- HEAD ;
- état du working tree ;
- absence de changement extérieur pertinent depuis le dernier rapport.

IMPLÉMENTATION

Effectue le changement minimal cohérent permettant d'atteindre l'objectif.

Préserve :

- l'architecture existante lorsqu'elle reste adaptée ;
- les conventions du dépôt ;
- les fonctionnalités déjà présentes ;
- la sécurité des secrets et données sensibles ;
- l'internationalisation existante lorsqu'elle est concernée.

VALIDATION

Ajoute ou adapte les tests nécessaires.

Exécute les validations pertinentes du dépôt.

Ne masque pas un test défaillant uniquement pour obtenir une suite verte.

GIT

Ne mélange pas de changements sans rapport avec la mission.

Ne commit, push, merge ou ouvre/modifie une PR que si cette action a été explicitement autorisée.

RAPPORT FINAL

Donne :

1. résumé du travail réalisé ;
2. principaux fichiers modifiés ;
3. choix techniques importants ;
4. tests ajoutés ou modifiés ;
5. commandes de validation exécutées ;
6. résultats ;
7. problèmes rencontrés ;
8. défauts ou limites volontairement non corrigés ;
9. état Git final.

Ne décide pas silencieusement d'enchaîner sur une autre fonctionnalité.
```

---

# 3. VERIFY

## Quand l'utiliser

- bug suspecté ;
- résultat Codex douteux ;
- risque technique ;
- régression possible ;
- choix architectural à confirmer ;
- implémentation à auditer.

## Template

```text
OBJECTIF DE VÉRIFICATION

Une hypothèse ou un risque doit être vérifié à partir du dépôt réel.

HYPOTHÈSE À TESTER

[Décrire ici le risque ou le comportement suspecté sans le présenter comme un fait.]

MÉTHODE

1. inspecte l'implémentation actuelle ;
2. reproduis ou démontre le comportement lorsque c'est pertinent ;
3. examine les tests existants ;
4. vérifie les chemins de code concernés ;
5. détermine si l'hypothèse est vraie, fausse ou partiellement vraie.

SI LE PROBLÈME EXISTE

- explique la cause ;
- évalue son impact ;
- identifie le périmètre affecté ;
- propose la correction minimale cohérente ;
- indique les tests nécessaires.

SI LE PROBLÈME N'EXISTE PAS

- explique pourquoi ;
- donne les éléments techniques qui permettent de l'affirmer.

IMPORTANT

Ne modifie aucun fichier à cette étape sauf autorisation explicite.

TERMINE PAR

VERDICT :
- CONFIRMÉ
- INFIRMÉ
- PARTIELLEMENT CONFIRMÉ
- INCONCLUSIF

Puis indique la prochaine action recommandée.
```

---

# 4. CLOSE

## Quand l'utiliser

Lorsqu'une étape semble terminée et doit être officiellement fermée.

## Template

```text
OBJECTIF

Fermer proprement l'étape actuelle.

VÉRIFIE

1. que l'objectif validé est réellement atteint ;
2. que le périmètre n'a pas dérivé ;
3. que les tests pertinents existent et passent ;
4. que les validations adaptées ont été exécutées ;
5. qu'aucun secret ou artefact sensible n'a été introduit ;
6. que les défauts volontairement non corrigés restent identifiés ;
7. que l'état Git final est connu ;
8. que la documentation d'état doit ou non être mise à jour.

DETTE / LIMITES

Recense explicitement :

- défauts mineurs reportés ;
- TODO ;
- limites ;
- risques restant connus ;
- éléments hors périmètre.

GIT

Indique :

- branche ;
- HEAD ;
- working tree ;
- éventuelles opérations Git déjà réalisées.

RAPPORT

Conclue avec l'un des statuts suivants :

ÉTAPE FERMÉE — PRÊT POUR UNE NOUVELLE INSPECTION

ou

ÉTAPE NON FERMABLE

Dans le second cas, explique précisément ce qui manque.

Ne commence aucune nouvelle fonctionnalité.
```

---

# 5. Prompt de reprise après rapport Codex

```text
Voici le dernier rapport Codex.

Analyse-le à la lumière de la méthode du projet.

Détermine :

- si le rapport est suffisamment étayé ;
- si le périmètre a été respecté ;
- si des risques ou incohérences existent ;
- si des défauts reportés doivent être conservés ;
- quelle phase du cycle doit suivre.

Ne suppose pas que les affirmations techniques non démontrées sont vraies.

Si une vérification technique est nécessaire, prépare un prompt VERIFY.

Si une décision utilisateur est nécessaire, présente clairement l'arbitrage avant toute nouvelle exécution.
```
