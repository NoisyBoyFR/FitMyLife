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

## Scope and limits

This package deliberately excludes additional compatibility rules, rule
aggregation, a generic rules engine, products and offers, `My Stuff`, user
needs, recommendations, scores, providers, persistence, HTTP, authentication,
UI, browser extensions, LLMs and localization infrastructure.
