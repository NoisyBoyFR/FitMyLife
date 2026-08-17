import assert from "node:assert/strict";
import test from "node:test";

import { evaluateGpuCaseLength } from "@fitmylife/compatibility-engine";

test("returns VALID when the GPU is shorter than the available space", () => {
  const result = evaluateGpuCaseLength({
    candidateGpuLengthMm: 300,
    availableGpuSpaceMm: 320,
  });

  assert.equal(result.status, "VALID");
  assert.equal(result.reasonCode, "GPU_LENGTH_FITS_AVAILABLE_SPACE");
  assert.equal(result.evidence.clearanceMm, 20);
});

test("returns VALID when the GPU exactly fills the available space", () => {
  const result = evaluateGpuCaseLength({
    candidateGpuLengthMm: 320,
    availableGpuSpaceMm: 320,
  });

  assert.equal(result.status, "VALID");
  assert.equal(result.evidence.clearanceMm, 0);
});

test("returns BLOCKING when the GPU is longer than the available space", () => {
  const result = evaluateGpuCaseLength({
    candidateGpuLengthMm: 321,
    availableGpuSpaceMm: 320,
  });

  assert.equal(result.status, "BLOCKING");
  assert.equal(result.reasonCode, "GPU_LENGTH_EXCEEDS_AVAILABLE_SPACE");
  assert.equal(result.evidence.clearanceMm, -1);
});

test("returns MISSING_INFORMATION when the candidate GPU length is absent", () => {
  const result = evaluateGpuCaseLength({ availableGpuSpaceMm: 320 });

  assert.equal(result.status, "MISSING_INFORMATION");
  assert.equal(result.reasonCode, "GPU_LENGTH_MISSING");
  assert.equal(result.evidence.missingField, "candidateGpuLengthMm");
});

test("returns MISSING_INFORMATION when the available case space is absent", () => {
  const result = evaluateGpuCaseLength({ candidateGpuLengthMm: 300 });

  assert.equal(result.status, "MISSING_INFORMATION");
  assert.equal(result.reasonCode, "GPU_SPACE_MISSING");
  assert.equal(result.evidence.missingField, "availableGpuSpaceMm");
  assert.equal(result.evidence.candidateGpuLengthMm, 300);
});

test("returns MISSING_INFORMATION with a distinct reason for non-finite values", () => {
  const candidateResult = evaluateGpuCaseLength({
    candidateGpuLengthMm: Number.NaN,
    availableGpuSpaceMm: 320,
  });
  const spaceResult = evaluateGpuCaseLength({
    candidateGpuLengthMm: 300,
    availableGpuSpaceMm: Number.POSITIVE_INFINITY,
  });

  assert.equal(candidateResult.status, "MISSING_INFORMATION");
  assert.equal(candidateResult.reasonCode, "GPU_LENGTH_INVALID");
  assert.equal(candidateResult.evidence.invalidField, "candidateGpuLengthMm");
  assert.equal(spaceResult.status, "MISSING_INFORMATION");
  assert.equal(spaceResult.reasonCode, "GPU_SPACE_INVALID");
  assert.equal(spaceResult.evidence.invalidField, "availableGpuSpaceMm");
});

test("returns MISSING_INFORMATION for null, zero, and negative values", () => {
  const nullResult = evaluateGpuCaseLength({
    candidateGpuLengthMm: null,
    availableGpuSpaceMm: 320,
  });
  const zeroResult = evaluateGpuCaseLength({
    candidateGpuLengthMm: 300,
    availableGpuSpaceMm: 0,
  });
  const negativeResult = evaluateGpuCaseLength({
    candidateGpuLengthMm: -1,
    availableGpuSpaceMm: 320,
  });

  assert.equal(nullResult.reasonCode, "GPU_LENGTH_INVALID");
  assert.equal(zeroResult.reasonCode, "GPU_SPACE_INVALID");
  assert.equal(negativeResult.reasonCode, "GPU_LENGTH_INVALID");
  assert.equal(nullResult.status, "MISSING_INFORMATION");
  assert.equal(zeroResult.status, "MISSING_INFORMATION");
  assert.equal(negativeResult.status, "MISSING_INFORMATION");
});

test("uses stable reason codes and structured evidence without a score", () => {
  const result = evaluateGpuCaseLength({
    candidateGpuLengthMm: 400,
    availableGpuSpaceMm: 350,
  });

  assert.equal(result.reasonCode, "GPU_LENGTH_EXCEEDS_AVAILABLE_SPACE");
  assert.deepEqual(result.evidence, {
    candidateGpuLengthMm: 400,
    availableGpuSpaceMm: 350,
    clearanceMm: -50,
  });
  assert.equal("score" in result, false);
});

test("never emits an artificial WARNING for this rule", () => {
  const results = [
    evaluateGpuCaseLength({ candidateGpuLengthMm: 300, availableGpuSpaceMm: 320 }),
    evaluateGpuCaseLength({ candidateGpuLengthMm: 400, availableGpuSpaceMm: 320 }),
    evaluateGpuCaseLength({ candidateGpuLengthMm: 300 }),
    evaluateGpuCaseLength({ candidateGpuLengthMm: 0, availableGpuSpaceMm: 320 }),
  ];

  assert.equal(results.some((result) => result.status === "WARNING"), false);
});

test("is deterministic for the same facts", () => {
  const input = {
    candidateGpuLengthMm: 310,
    availableGpuSpaceMm: 320,
  };

  assert.deepEqual(evaluateGpuCaseLength(input), evaluateGpuCaseLength(input));
});
