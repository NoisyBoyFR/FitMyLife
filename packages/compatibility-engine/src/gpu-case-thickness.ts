import type { CompatibilityStatus } from "./gpu-case-length.js";

/** Stable, locale-independent reason codes for the internal thickness rule. */
export type GpuCaseThicknessReasonCode =
  | "GPU_THICKNESS_EXCEEDS_EFFECTIVE_CLEARANCE"
  | "GPU_THICKNESS_FITS_EFFECTIVE_CLEARANCE"
  | "GPU_THICKNESS_MISSING"
  | "GPU_THICKNESS_INVALID"
  | "GPU_THICKNESS_VERIFICATION_STATUS_MISSING"
  | "GPU_THICKNESS_VERIFICATION_STATUS_INVALID"
  | "GPU_THICKNESS_UNVERIFIED"
  | "GPU_EFFECTIVE_CLEARANCE_MISSING"
  | "GPU_EFFECTIVE_CLEARANCE_INVALID"
  | "GPU_EFFECTIVE_CLEARANCE_VERIFICATION_STATUS_MISSING"
  | "GPU_EFFECTIVE_CLEARANCE_VERIFICATION_STATUS_INVALID"
  | "GPU_EFFECTIVE_CLEARANCE_UNVERIFIED";

/** A caller assertion that one specific measurement has been verified. */
export type GpuCaseThicknessMeasurementVerificationStatus =
  | "VERIFIED"
  | "UNVERIFIED";

/**
 * Facts required by the internal GPU/case-thickness rule.
 *
 * Both dimensions are millimetres measured on exactly the same axis and in a
 * compatible geometric reference around the target slot. The candidate value
 * is the relevant maximum physical extent of the exact GPU model. The
 * available value is the real free physical envelope on that axis after the
 * caller has accounted for known obstacles. Verification statuses are
 * independent caller assertions; they are not proof, provenance, freshness,
 * or confidence models.
 */
export interface GpuCaseThicknessInput {
  candidateGpuThicknessMm?: number | null;
  availableEffectiveThicknessMm?: number | null;
  candidateGpuThicknessVerificationStatus?:
    | GpuCaseThicknessMeasurementVerificationStatus
    | null;
  availableEffectiveThicknessVerificationStatus?:
    | GpuCaseThicknessMeasurementVerificationStatus
    | null;
}

/** Structured evidence returned by the internal GPU/case-thickness rule. */
export interface GpuCaseThicknessEvidence {
  candidateGpuThicknessMm?: number;
  availableEffectiveThicknessMm?: number;
  clearanceMm?: number;
  missingField?:
    | "candidateGpuThicknessMm"
    | "availableEffectiveThicknessMm"
    | "candidateGpuThicknessVerificationStatus"
    | "availableEffectiveThicknessVerificationStatus";
  invalidField?:
    | "candidateGpuThicknessMm"
    | "availableEffectiveThicknessMm"
    | "candidateGpuThicknessVerificationStatus"
    | "availableEffectiveThicknessVerificationStatus";
  unverifiedField?:
    | "candidateGpuThicknessVerificationStatus"
    | "availableEffectiveThicknessVerificationStatus";
}

/** Result returned by the internal GPU/case-thickness rule. */
export interface GpuCaseThicknessResult {
  status: CompatibilityStatus;
  reasonCode: GpuCaseThicknessReasonCode;
  evidence: GpuCaseThicknessEvidence;
}

type DimensionRead =
  | { kind: "missing" }
  | { kind: "invalid" }
  | { kind: "valid"; value: number };

type VerificationStatusRead =
  | { kind: "missing" }
  | { kind: "invalid" }
  | { kind: "unverified" }
  | { kind: "verified" };

function readCandidateThickness(value: unknown): DimensionRead {
  if (value === undefined) {
    return { kind: "missing" };
  }

  if (typeof value !== "number" || !Number.isFinite(value) || value <= 0) {
    return { kind: "invalid" };
  }

  return { kind: "valid", value };
}

function readAvailableThickness(value: unknown): DimensionRead {
  if (value === undefined) {
    return { kind: "missing" };
  }

  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
    return { kind: "invalid" };
  }

  return { kind: "valid", value };
}

function readVerificationStatus(value: unknown): VerificationStatusRead {
  if (value === undefined) {
    return { kind: "missing" };
  }

  if (value === "VERIFIED") {
    return { kind: "verified" };
  }

  if (value === "UNVERIFIED") {
    return { kind: "unverified" };
  }

  return { kind: "invalid" };
}

/**
 * Evaluate only the physical thickness dimension around the target case slot.
 *
 * The rule never infers a measurement from a commercial slot designation such
 * as `2-slot` or `2.5-slot`. It does not calculate the case geometry and does
 * not cover length, height, side panels, cables, connectors, power, thermals,
 * airflow, PCIe, performance, mounting, recommendation, or global
 * compatibility. `clearanceMm` is only the geometric margin on this axis.
 *
 * Validation is deliberately ordered: candidate value, available value,
 * candidate verification status, available verification status, comparison.
 * A caller must use `VERIFIED` only when both measurements are comparable and
 * the relevant status assertion is supported by its own trusted process.
 * Equality is a strict geometric fit, not a mounting, tolerance, cooling, or
 * global compatibility guarantee.
 */
export function evaluateGpuCaseThickness(
  input: GpuCaseThicknessInput,
): GpuCaseThicknessResult {
  const candidateThickness = readCandidateThickness(
    input.candidateGpuThicknessMm,
  );

  if (candidateThickness.kind === "missing") {
    return {
      status: "MISSING_INFORMATION",
      reasonCode: "GPU_THICKNESS_MISSING",
      evidence: { missingField: "candidateGpuThicknessMm" },
    };
  }

  if (candidateThickness.kind === "invalid") {
    return {
      status: "MISSING_INFORMATION",
      reasonCode: "GPU_THICKNESS_INVALID",
      evidence: { invalidField: "candidateGpuThicknessMm" },
    };
  }

  const availableThickness = readAvailableThickness(
    input.availableEffectiveThicknessMm,
  );

  if (availableThickness.kind === "missing") {
    return {
      status: "MISSING_INFORMATION",
      reasonCode: "GPU_EFFECTIVE_CLEARANCE_MISSING",
      evidence: {
        candidateGpuThicknessMm: candidateThickness.value,
        missingField: "availableEffectiveThicknessMm",
      },
    };
  }

  if (availableThickness.kind === "invalid") {
    return {
      status: "MISSING_INFORMATION",
      reasonCode: "GPU_EFFECTIVE_CLEARANCE_INVALID",
      evidence: {
        candidateGpuThicknessMm: candidateThickness.value,
        invalidField: "availableEffectiveThicknessMm",
      },
    };
  }

  const candidateVerification = readVerificationStatus(
    input.candidateGpuThicknessVerificationStatus,
  );
  const measurements = {
    candidateGpuThicknessMm: candidateThickness.value,
    availableEffectiveThicknessMm: availableThickness.value,
  };

  if (candidateVerification.kind === "missing") {
    return {
      status: "MISSING_INFORMATION",
      reasonCode: "GPU_THICKNESS_VERIFICATION_STATUS_MISSING",
      evidence: {
        ...measurements,
        missingField: "candidateGpuThicknessVerificationStatus",
      },
    };
  }

  if (candidateVerification.kind === "invalid") {
    return {
      status: "MISSING_INFORMATION",
      reasonCode: "GPU_THICKNESS_VERIFICATION_STATUS_INVALID",
      evidence: {
        ...measurements,
        invalidField: "candidateGpuThicknessVerificationStatus",
      },
    };
  }

  if (candidateVerification.kind === "unverified") {
    return {
      status: "MISSING_INFORMATION",
      reasonCode: "GPU_THICKNESS_UNVERIFIED",
      evidence: {
        ...measurements,
        unverifiedField: "candidateGpuThicknessVerificationStatus",
      },
    };
  }

  const availableVerification = readVerificationStatus(
    input.availableEffectiveThicknessVerificationStatus,
  );

  if (availableVerification.kind === "missing") {
    return {
      status: "MISSING_INFORMATION",
      reasonCode: "GPU_EFFECTIVE_CLEARANCE_VERIFICATION_STATUS_MISSING",
      evidence: {
        ...measurements,
        missingField: "availableEffectiveThicknessVerificationStatus",
      },
    };
  }

  if (availableVerification.kind === "invalid") {
    return {
      status: "MISSING_INFORMATION",
      reasonCode: "GPU_EFFECTIVE_CLEARANCE_VERIFICATION_STATUS_INVALID",
      evidence: {
        ...measurements,
        invalidField: "availableEffectiveThicknessVerificationStatus",
      },
    };
  }

  if (availableVerification.kind === "unverified") {
    return {
      status: "MISSING_INFORMATION",
      reasonCode: "GPU_EFFECTIVE_CLEARANCE_UNVERIFIED",
      evidence: {
        ...measurements,
        unverifiedField: "availableEffectiveThicknessVerificationStatus",
      },
    };
  }

  const clearanceMm =
    availableThickness.value - candidateThickness.value;
  const evidence = {
    ...measurements,
    clearanceMm,
  };

  if (clearanceMm < 0) {
    return {
      status: "BLOCKING",
      reasonCode: "GPU_THICKNESS_EXCEEDS_EFFECTIVE_CLEARANCE",
      evidence,
    };
  }

  return {
    status: "VALID",
    reasonCode: "GPU_THICKNESS_FITS_EFFECTIVE_CLEARANCE",
    evidence,
  };
}
