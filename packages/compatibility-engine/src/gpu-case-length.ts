/** Result statuses shared by compatibility rules.
 *
 * This rule currently emits `VALID`, `BLOCKING`, or `MISSING_INFORMATION`.
 * `WARNING` remains part of the public status vocabulary but is not emitted
 * without a validated warning condition.
 */
export type CompatibilityStatus =
  | "BLOCKING"
  | "WARNING"
  | "MISSING_INFORMATION"
  | "VALID";

/** Stable, locale-independent reason codes for the GPU/case-length rule. */
export type GpuCaseLengthReasonCode =
  | "GPU_LENGTH_EXCEEDS_AVAILABLE_SPACE"
  | "GPU_LENGTH_FITS_AVAILABLE_SPACE"
  | "GPU_LENGTH_MISSING"
  | "GPU_SPACE_MISSING"
  | "GPU_LENGTH_INVALID"
  | "GPU_SPACE_INVALID";

/** Facts required to evaluate candidate GPU length against effective case space. */
export interface GpuCaseLengthInput {
  /** Candidate GPU length in millimetres. */
  candidateGpuLengthMm?: number | null;
  /** Effective available GPU space in millimetres, after external obstruction handling. */
  availableGpuSpaceMm?: number | null;
}

/** Structured evidence returned by the GPU/case-length rule. */
export interface GpuCaseLengthEvidence {
  candidateGpuLengthMm?: number;
  availableGpuSpaceMm?: number;
  clearanceMm?: number;
  missingField?: "candidateGpuLengthMm" | "availableGpuSpaceMm";
  invalidField?: "candidateGpuLengthMm" | "availableGpuSpaceMm";
}

/** Public result returned by {@link evaluateGpuCaseLength}. */
export interface GpuCaseLengthResult {
  status: CompatibilityStatus;
  reasonCode: GpuCaseLengthReasonCode;
  evidence: GpuCaseLengthEvidence;
}

type DimensionRead =
  | { kind: "missing" }
  | { kind: "invalid" }
  | { kind: "valid"; value: number };

function readPositiveMillimetres(value: number | null | undefined): DimensionRead {
  if (value === undefined) {
    return { kind: "missing" };
  }

  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
    return { kind: "invalid" };
  }

  return { kind: "valid", value };
}

/**
 * Evaluate whether a candidate GPU fits within the effective space in an
 * existing case.
 *
 * Both dimensions are measured in millimetres. The available space must
 * already account for known external obstructions; this function does not
 * calculate obstructions itself. Values must be finite and strictly positive.
 * Missing values and invalid values are reported separately through the
 * reason code and evidence.
 *
 * For valid dimensions, `clearanceMm` is calculated as
 * `availableGpuSpaceMm - candidateGpuLengthMm`: positive means remaining
 * space, zero means an exact fit accepted by this rule, and negative means a
 * blocking overrun. No comfort or safety threshold is applied.
 */
export function evaluateGpuCaseLength(
  input: GpuCaseLengthInput,
): GpuCaseLengthResult {
  const candidateLength = readPositiveMillimetres(input.candidateGpuLengthMm);

  if (candidateLength.kind === "missing") {
    return {
      status: "MISSING_INFORMATION",
      reasonCode: "GPU_LENGTH_MISSING",
      evidence: { missingField: "candidateGpuLengthMm" },
    };
  }

  if (candidateLength.kind === "invalid") {
    return {
      status: "MISSING_INFORMATION",
      reasonCode: "GPU_LENGTH_INVALID",
      evidence: { invalidField: "candidateGpuLengthMm" },
    };
  }

  const availableSpace = readPositiveMillimetres(input.availableGpuSpaceMm);

  if (availableSpace.kind === "missing") {
    return {
      status: "MISSING_INFORMATION",
      reasonCode: "GPU_SPACE_MISSING",
      evidence: {
        candidateGpuLengthMm: candidateLength.value,
        missingField: "availableGpuSpaceMm",
      },
    };
  }

  if (availableSpace.kind === "invalid") {
    return {
      status: "MISSING_INFORMATION",
      reasonCode: "GPU_SPACE_INVALID",
      evidence: {
        candidateGpuLengthMm: candidateLength.value,
        invalidField: "availableGpuSpaceMm",
      },
    };
  }

  const clearanceMm = availableSpace.value - candidateLength.value;
  const evidence = {
    candidateGpuLengthMm: candidateLength.value,
    availableGpuSpaceMm: availableSpace.value,
    clearanceMm,
  };

  if (candidateLength.value > availableSpace.value) {
    return {
      status: "BLOCKING",
      reasonCode: "GPU_LENGTH_EXCEEDS_AVAILABLE_SPACE",
      evidence,
    };
  }

  return {
    status: "VALID",
    reasonCode: "GPU_LENGTH_FITS_AVAILABLE_SPACE",
    evidence,
  };
}
