import {
  evaluateGpuCaseLength,
  type GpuCaseLengthResult,
} from "./gpu-case-length.js";

/**
 * The candidate GPU fact needed by the first My Stuff PC slice.
 *
 * This is intentionally narrower than a generic component or PC model.
 */
export interface MyStuffCandidateGpu {
  readonly lengthMm?: number | null;
}

/**
 * The existing-case fact needed by the first My Stuff PC slice.
 *
 * The value must already represent the effective space available to the GPU.
 */
export interface MyStuffExistingCase {
  readonly availableGpuSpaceMm?: number | null;
}

/**
 * Adapt the narrow My Stuff GPU/case context to the existing public rule.
 *
 * This function deliberately performs no validation or compatibility logic of
 * its own. The existing evaluator remains the sole owner of that behavior.
 */
export function evaluateMyStuffGpuCaseLength(
  candidateGpu: MyStuffCandidateGpu,
  existingCase: MyStuffExistingCase,
): GpuCaseLengthResult {
  return evaluateGpuCaseLength({
    candidateGpuLengthMm: candidateGpu.lengthMm,
    availableGpuSpaceMm: existingCase.availableGpuSpaceMm,
  });
}
