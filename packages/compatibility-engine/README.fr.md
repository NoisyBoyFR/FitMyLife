# Compatibility Engine

> Traduction française — la version anglaise reste canonique. [English version](README.md).

Ce package expose le premier contrat TypeScript public du `Compatibility Engine`. Il évalue de manière déterministe une règle physique : déterminer si un GPU candidat tient dans l'espace GPU effectif d'un boîtier existant.

Il s'agit du contrat borné de la Phase 0. Ce n'est pas le `Compatibility Engine` complet et aucune agrégation de plusieurs règles n'est effectuée.

## Utilisation publique

Le package est consommé via son point d'entrée public :

```ts
import {
  evaluateGpuCaseLength,
} from "@fitmylife/compatibility-engine";

const result = evaluateGpuCaseLength({
  candidateGpuLengthMm: 300,
  availableGpuSpaceMm: 320,
});

// result.status === "VALID"
// result.evidence.clearanceMm === 20
```

Les exports publics sont :

- `evaluateGpuCaseLength(input): GpuCaseLengthResult` ;
- `CompatibilityStatus` ;
- `GpuCaseLengthReasonCode` ;
- `GpuCaseLengthInput` ;
- `GpuCaseLengthEvidence` ;
- `GpuCaseLengthResult`.

## Passerelle interne My Stuff GPU/boîtier

La Phase 1 ajoute une passerelle interne volontairement étroite dans
`src/my-stuff-gpu-case.ts`. Elle représente uniquement les deux faits en
mémoire nécessaires à la première tranche PC de `My Stuff` :

- la longueur d'un GPU candidat en millimètres ;
- l'espace GPU effectif disponible dans le boîtier existant, en millimètres.

La passerelle mappe ces faits vers `GpuCaseLengthInput` et délègue
l'évaluation complète à `evaluateGpuCaseLength`. Elle n'ajoute aucune
validation, aucun seuil, score, avertissement ou règle de compatibilité. Les
objets candidat et boîtier sont traités en lecture seule ; aucun I/O, aucune
persistance et aucun traitement asynchrone ne sont effectués.

Cette passerelle est un détail d'implémentation interne. Elle n'est pas
exportée par le point d'entrée du package, ne modifie pas l'API publique et ne
modélise ni un PC générique ni un inventaire `My Stuff` complet.

## Contrat d'entrée

`GpuCaseLengthInput` contient uniquement ces deux faits optionnels :

| Champ | Signification |
| --- | --- |
| `candidateGpuLengthMm` | Longueur du GPU candidat, en millimètres |
| `availableGpuSpaceMm` | Espace GPU effectivement disponible dans le boîtier, en millimètres |

`availableGpuSpaceMm` doit déjà tenir compte des obstructions externes connues. Cette fonction ne calcule ni les obstructions, ni le dégagement des connecteurs, ni la largeur du slot, ni le refroidissement, ni les besoins en alimentation.

Les valeurs doivent être finies et strictement positives. Un champ omis correspond à une information manquante. `null`, zéro, les valeurs négatives, non finies et non numériques sont invalides ; une invalidité n'est jamais silencieusement traitée comme une compatibilité.

## Contrat de sortie

Chaque résultat contient un `status`, un `reasonCode` stable et indépendant de la langue, ainsi qu'une `evidence` structurée. Le résultat ne contient aucun score.

| Statut | Signification pour cette règle |
| --- | --- |
| `VALID` | La longueur du GPU est inférieure ou égale à l'espace disponible |
| `BLOCKING` | La longueur du GPU dépasse l'espace disponible |
| `MISSING_INFORMATION` | Une valeur requise est absente ou invalide |
| `WARNING` | Fait partie du vocabulaire public des statuts ; jamais émis par cette règle |

Pour des dimensions valides :

```text
clearanceMm = availableGpuSpaceMm - candidateGpuLengthMm
```

- positive : il reste de l'espace ;
- nulle : ajustement exact, accepté par cette règle ;
- négative : dépassement du GPU et contrainte bloquante.

Aucun seuil de confort ou de sécurité n'est appliqué.

## Codes de raison

| Code | Signification |
| --- | --- |
| `GPU_LENGTH_EXCEEDS_AVAILABLE_SPACE` | Le GPU est plus long que l'espace disponible |
| `GPU_LENGTH_FITS_AVAILABLE_SPACE` | Le GPU tient dans l'espace disponible |
| `GPU_LENGTH_MISSING` | La longueur du GPU candidat a été omise |
| `GPU_SPACE_MISSING` | L'espace disponible du boîtier a été omis |
| `GPU_LENGTH_INVALID` | La longueur du GPU candidat est invalide |
| `GPU_SPACE_INVALID` | L'espace disponible du boîtier est invalide |

Les valeurs absentes et invalides ont des codes de raison distincts. La preuve identifie le champ absent ou invalide. Les comparaisons valides incluent les deux dimensions et `clearanceMm`.

## Périmètre et limites

Ce package exclut volontairement les règles de compatibilité supplémentaires,
l'agrégation de règles, un moteur de règles générique, un modèle `My Stuff`
générique, les produits et offres, les besoins utilisateur, les
recommandations, les scores, les providers, la persistance, HTTP,
l'authentification, l'UI, les extensions navigateur, les LLM et
l'infrastructure de localisation. La passerelle interne reste limitée aux
deux faits GPU/boîtier décrits ci-dessus.
