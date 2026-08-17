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

## Règle interne GPU/boîtier — Phase 2 P2-1

La règle interne validée et formellement fermée comme P2-1 est une tranche
étroite de la Phase 2. Elle n'est pas exportée par le point d'entrée du package
et ne modifie pas l'API publique. Ses changements restent dans le working tree
local et ne sont pas publiés avant une publication distincte de la Phase 2.

Elle compare quatre faits internes :

| Champ | Signification |
| --- | --- |
| `candidateGpuThicknessMm` | Étendue physique maximale pertinente du modèle exact de GPU candidat, en millimètres, sur l'axe choisi |
| `availableEffectiveThicknessMm` | Espace physique réellement libre autour du slot cible, en millimètres, sur ce même axe |
| `candidateGpuThicknessVerificationStatus` | Assertion du caller indiquant que la mesure candidat est `VERIFIED` ou `UNVERIFIED` |
| `availableEffectiveThicknessVerificationStatus` | Assertion du caller indiquant que la mesure d'espace effectif est `VERIFIED` ou `UNVERIFIED` |

Les deux mesures doivent utiliser exactement le même axe et un référentiel
géométrique compatible autour du slot cible. L'espace effectif doit déjà tenir
compte des obstacles connus. Si la géométrie est asymétrique, le caller ne
peut la réduire à un scalaire qu'après avoir établi que ce scalaire représente
l'enveloppe limitante de la comparaison. La règle ne calcule pas la géométrie
du boîtier et n'infère jamais une mesure depuis une désignation commerciale
telle que `2-slot` ou `2.5-slot`.

Les deux statuts de vérification sont des assertions indépendantes du caller.
`VERIFIED` n'est acceptable que lorsque le caller dispose de mesures
comparables soutenues par son propre processus fiable ; le statut n'est pas à
lui seul une provenance, une confiance, une fraîcheur ou une preuve. Un statut
absent, invalide ou `UNVERIFIED` produit `MISSING_INFORMATION`.

Pour deux mesures valides et vérifiées :

```text
clearanceMm = availableEffectiveThicknessMm - candidateGpuThicknessMm
```

Une marge positive ou nulle produit `VALID` pour cette seule dimension. Une
marge négative produit `BLOCKING` pour cette seule dimension. L'égalité est
une comparaison géométrique stricte : elle ne constitue ni une marge de
montage, ni une garantie sur les tolérances, le refroidissement ou la
compatibilité globale. Aucun seuil de confort, epsilon ou `WARNING` artificiel
n'est appliqué.

La règle utilise des codes de raison stables et spécifiques au champ pour les
valeurs absentes, invalides, non vérifiées et les statuts de vérification, en
plus de `GPU_THICKNESS_FITS_EFFECTIVE_CLEARANCE` et
`GPU_THICKNESS_EXCEEDS_EFFECTIVE_CLEARANCE`. La preuve identifie le champ
exact, conserve les mesures numériques disponibles lorsqu'une vérification
bloque la conclusion et n'expose `clearanceMm` qu'après validation et
vérification des deux mesures et des deux statuts. Elle ne contient ni score ni
texte localisé.

L'ensemble des codes de raison est :

- `GPU_THICKNESS_MISSING` ;
- `GPU_THICKNESS_INVALID` ;
- `GPU_THICKNESS_VERIFICATION_STATUS_MISSING` ;
- `GPU_THICKNESS_VERIFICATION_STATUS_INVALID` ;
- `GPU_THICKNESS_UNVERIFIED` ;
- `GPU_EFFECTIVE_CLEARANCE_MISSING` ;
- `GPU_EFFECTIVE_CLEARANCE_INVALID` ;
- `GPU_EFFECTIVE_CLEARANCE_VERIFICATION_STATUS_MISSING` ;
- `GPU_EFFECTIVE_CLEARANCE_VERIFICATION_STATUS_INVALID` ;
- `GPU_EFFECTIVE_CLEARANCE_UNVERIFIED` ;
- `GPU_THICKNESS_FITS_EFFECTIVE_CLEARANCE` ;
- `GPU_THICKNESS_EXCEEDS_EFFECTIVE_CLEARANCE`.

Cette règle exclut la longueur, la hauteur, le panneau latéral, les câbles,
les connecteurs, l'alimentation, les thermiques, le débit d'air, PCIe, les
performances, le montage, les recommandations et la compatibilité globale.
Elle reste interne, pure, synchrone, sans provider et sans agrégation d'autres
règles.

## Périmètre et limites

Ce package exclut volontairement les règles de compatibilité supplémentaires,
l'agrégation de règles, un moteur de règles générique, un modèle `My Stuff`
générique, les produits et offres, les besoins utilisateur, les
recommandations, les scores, les providers, la persistance, HTTP,
l'authentification, l'UI, les extensions navigateur, les LLM et
l'infrastructure de localisation. La passerelle interne reste limitée aux
deux faits GPU/boîtier décrits ci-dessus.
