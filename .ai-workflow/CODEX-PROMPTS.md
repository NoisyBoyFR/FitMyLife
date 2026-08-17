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

## Boucle d'exécution par point

Utiliser cette section pour préparer, dans toute phase future contenant un ou
plusieurs points validés, un plan et des missions distinctes pilotées par Work.
Les points peuvent être fonctionnels, techniques, documentaires, de sécurité,
de confidentialité ou de publication. Elle est réutilisable pour toutes les
phases futures.

```text
PLAN DE PHASE

Pour chaque point, indique :

- identifiant ;
- objectif ;
- statut ;
- dépendances ;
- périmètre ;
- exclusions ;
- critères de clôture.

Statuts autorisés :

- PENDING
- EXECUTING
- VERIFYING
- CORRECTING
- CLOSED
- BLOCKED

Un seul point peut être EXECUTING, VERIFYING, CORRECTING ou BLOCKED à la fois.
Seuls les points explicitement validés par l'utilisateur entrent dans ce plan.

MISSION EXECUTE — POINT [ID]

1. vérifie l'état réel ;
2. traite uniquement le point actif ;
3. exécute les validations prévues ;
4. produit le rapport Codex ;
5. s'arrête et rend la main à Work.

Ne commence pas le point suivant dans cette mission.

MISSION VERIFY — POINT [ID]

1. inspecte indépendamment le résultat ;
2. vérifie les critères de clôture ;
3. conclut VALIDÉ, À CORRIGER ou BLOQUÉ ;
4. ne corrige pas dans une mission strictement VERIFY sans autorisation explicite ;
5. rend la main à Work.

CORRECTION

Si le verdict est À CORRIGER :

1. Work prépare une nouvelle mission ciblée ;
2. Codex corrige uniquement les défauts confirmés ;
3. le même point reste actif ;
4. une nouvelle mission VERIFY est obligatoire.

Ne fixe aucune limite arbitraire de tentatives qui conduirait à accepter une
validation rouge. Si la correction est impossible ou nécessite une autorité
supplémentaire, le point devient BLOCKED.

MISSION CLOSE — POINT [ID]

Elle doit confirmer l'objectif, les validations, les limites et l'état durable,
puis fermer uniquement le point courant. Elle ne commence pas le point suivant.

FIN DE PHASE

Après fermeture de tous les points : audit global, préparation documentaire,
publication contrôlée, CI, PR brouillon, vérification Work, validation utilisateur
du merge, clôture de phase et arrêt. La suppression d'une branche de publication
reste facultative et ne peut intervenir qu'après :

1. réussite réelle du merge autorisé ;
2. confirmation du contenu attendu sur la branche cible ;
3. validations post-merge nécessaires réussies ;
4. autorisation utilisateur explicite de supprimer la branche.

L'autorisation du merge ne vaut pas automatiquement autorisation de suppression,
sauf autorisation conjointe explicite. Toute suppression locale ou distante doit
rester dans le périmètre autorisé et ne peut intervenir après un échec de merge
ou un doute sur le contenu publié. La phase suivante exige une nouvelle mission
INSPECT.
```

Le point suivant ne commence qu'après analyse du rapport par Work et fermeture
explicite du point précédent. La boucle ne vaut pas autorisation permanente pour
les idées non validées.

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
