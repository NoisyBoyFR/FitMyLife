# Compatibility Engine

> [French translation](README.fr.md) — English remains the canonical documentation.

This package exposes the first public TypeScript contract of the
`Compatibility Engine`. It deterministically evaluates one physical rule:
whether a candidate GPU fits in the effective GPU space of an existing case.

This is the bounded Phase 0 contract. It is not the complete Compatibility
Engine and does not aggregate multiple rules.

## Public usage

The package is consumed through its public entry point:

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

The public exports are:

- `evaluateGpuCaseLength(input): GpuCaseLengthResult`;
- `CompatibilityStatus`;
- `GpuCaseLengthReasonCode`;
- `GpuCaseLengthInput`;
- `GpuCaseLengthEvidence`;
- `GpuCaseLengthResult`.

## Internal My Stuff GPU/case bridge

Phase 1 adds a deliberately narrow internal bridge in
`src/my-stuff-gpu-case.ts`. It represents only the two in-memory facts needed
for the first My Stuff PC slice:

- a candidate GPU length in millimetres;
- the effective GPU space available in the existing case, in millimetres.

The bridge maps those facts to `GpuCaseLengthInput` and delegates the complete
evaluation to `evaluateGpuCaseLength`. It adds no validation, threshold,
score, warning or compatibility rule of its own. The candidate and case
objects are treated as read-only and no I/O, persistence or asynchronous work
is performed.

This bridge is an internal implementation detail. It is not exported from the
package entry point, does not change the public API, and does not model a
generic PC or complete `My Stuff` inventory.

## Input contract

`GpuCaseLengthInput` contains only these two optional facts:

| Field | Meaning |
| --- | --- |
| `candidateGpuLengthMm` | Candidate GPU length, in millimetres |
| `availableGpuSpaceMm` | Effective GPU space already available in the case, in millimetres |

`availableGpuSpaceMm` must already reflect known external obstructions. This
function does not calculate obstructions, connector clearance, slot width,
cooling or power requirements.

Values must be finite and strictly positive. An omitted value is missing
information. `null`, zero, negative, non-finite and non-number values are
invalid; invalidity is never silently treated as compatibility.

## Output contract

Every result contains a `status`, a stable locale-independent `reasonCode`,
and structured `evidence`. The result contains no score.

| Status | Meaning for this rule |
| --- | --- |
| `VALID` | GPU length is less than or equal to available space |
| `BLOCKING` | GPU length exceeds available space |
| `MISSING_INFORMATION` | A required value is absent or invalid |
| `WARNING` | Part of the public status vocabulary; never emitted by this rule |

For valid dimensions:

```text
clearanceMm = availableGpuSpaceMm - candidateGpuLengthMm
```

- positive: space remains;
- zero: exact fit, accepted by this rule;
- negative: GPU overrun and blocking constraint.

No comfort or safety threshold is applied.

## Reason codes

| Code | Meaning |
| --- | --- |
| `GPU_LENGTH_EXCEEDS_AVAILABLE_SPACE` | GPU is longer than available space |
| `GPU_LENGTH_FITS_AVAILABLE_SPACE` | GPU fits within available space |
| `GPU_LENGTH_MISSING` | Candidate GPU length was omitted |
| `GPU_SPACE_MISSING` | Available case space was omitted |
| `GPU_LENGTH_INVALID` | Candidate GPU length is invalid |
| `GPU_SPACE_INVALID` | Available case space is invalid |

Missing and invalid values have distinct reason codes. Evidence identifies
the missing or invalid field. Valid comparisons include the two dimensions
and `clearanceMm`.

## Internal GPU/case-thickness rule — Phase 2 P2-1

The internal rule validated and formally closed as P2-1 is a narrow Phase 2
slice. It is not exported from the package entry point and does not change the
public API. Its changes remain in the local working tree and are not published
until a separate Phase 2 publication.

It compares four internal facts:

| Field | Meaning |
| --- | --- |
| `candidateGpuThicknessMm` | Maximum relevant physical extent of the exact candidate GPU model, in millimetres, on the selected axis |
| `availableEffectiveThicknessMm` | Real free physical space around the target slot, in millimetres, on that same axis |
| `candidateGpuThicknessVerificationStatus` | Caller assertion that the candidate measurement is `VERIFIED` or `UNVERIFIED` |
| `availableEffectiveThicknessVerificationStatus` | Caller assertion that the effective-clearance measurement is `VERIFIED` or `UNVERIFIED` |

The two measurements must use the same axis and a compatible geometric
reference around the target slot. The effective space must already account for
known obstacles. If the geometry is asymmetric, the caller may reduce it to a
scalar only after establishing that the scalar is the limiting envelope for
the comparison. The rule does not calculate case geometry and never infers a
measurement from commercial designations such as `2-slot` or `2.5-slot`.

Both verification statuses are independent caller assertions. `VERIFIED` is
acceptable only when the caller has comparable measurements supported by its
own trusted process; the status itself is not provenance, confidence,
freshness, or proof. Missing, invalid, or `UNVERIFIED` statuses produce
`MISSING_INFORMATION`.

For two valid and verified measurements:

```text
clearanceMm = availableEffectiveThicknessMm - candidateGpuThicknessMm
```

Positive and zero clearance produce `VALID` for this dimension only. Negative
clearance produces `BLOCKING` for this dimension only. Equality is a strict
geometric comparison: it is not a mounting margin, tolerance guarantee,
cooling guarantee, or global compatibility conclusion. No comfort threshold,
epsilon, or artificial `WARNING` is applied.

The rule uses field-specific stable reason codes for missing, invalid,
unverified, and verification-status failures, plus
`GPU_THICKNESS_FITS_EFFECTIVE_CLEARANCE` and
`GPU_THICKNESS_EXCEEDS_EFFECTIVE_CLEARANCE`. Evidence identifies the exact
field, preserves available numeric measurements when verification blocks the
conclusion, and exposes `clearanceMm` only after both measurements and both
statuses are valid and verified. Evidence contains no score or localized text.

The complete reason-code set is:

- `GPU_THICKNESS_MISSING`;
- `GPU_THICKNESS_INVALID`;
- `GPU_THICKNESS_VERIFICATION_STATUS_MISSING`;
- `GPU_THICKNESS_VERIFICATION_STATUS_INVALID`;
- `GPU_THICKNESS_UNVERIFIED`;
- `GPU_EFFECTIVE_CLEARANCE_MISSING`;
- `GPU_EFFECTIVE_CLEARANCE_INVALID`;
- `GPU_EFFECTIVE_CLEARANCE_VERIFICATION_STATUS_MISSING`;
- `GPU_EFFECTIVE_CLEARANCE_VERIFICATION_STATUS_INVALID`;
- `GPU_EFFECTIVE_CLEARANCE_UNVERIFIED`;
- `GPU_THICKNESS_FITS_EFFECTIVE_CLEARANCE`;
- `GPU_THICKNESS_EXCEEDS_EFFECTIVE_CLEARANCE`.

This rule excludes length, height, side-panel clearance, cables, connectors,
power, thermals, airflow, PCIe, performance, mounting, recommendations and
global compatibility. It is internal, pure, synchronous, provider-free and
does not aggregate other rules.

## Scope and limits

This package deliberately excludes additional compatibility rules, rule
aggregation, a generic rules engine, a generic `My Stuff` model, products and
offers, user needs, recommendations, scores, providers, persistence, HTTP,
authentication, UI, browser extensions, LLMs and localization infrastructure.
The internal bridge is limited to the two GPU/case facts described above.
