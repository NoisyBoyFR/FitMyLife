import assert from "node:assert/strict";
import test from "node:test";

import * as publicApi from "@fitmylife/compatibility-engine";
import { evaluateGpuCaseThickness } from "../dist/gpu-case-thickness.js";

const verified = {
  candidateGpuThicknessVerificationStatus: "VERIFIED",
  availableEffectiveThicknessVerificationStatus: "VERIFIED",
};

function evaluate(overrides = {}) {
  return evaluateGpuCaseThickness({
    candidateGpuThicknessMm: 45,
    availableEffectiveThicknessMm: 50,
    ...verified,
    ...overrides,
  });
}

test("returns VALID when the GPU is thinner than the effective clearance", () => {
  const result = evaluate({ candidateGpuThicknessMm: 45 });

  assert.equal(result.status, "VALID");
  assert.equal(result.reasonCode, "GPU_THICKNESS_FITS_EFFECTIVE_CLEARANCE");
  assert.deepEqual(result.evidence, {
    candidateGpuThicknessMm: 45,
    availableEffectiveThicknessMm: 50,
    clearanceMm: 5,
  });
});

test("returns VALID for an exact geometric fit", () => {
  const result = evaluate({
    candidateGpuThicknessMm: 50,
    availableEffectiveThicknessMm: 50,
  });

  assert.equal(result.status, "VALID");
  assert.equal(result.reasonCode, "GPU_THICKNESS_FITS_EFFECTIVE_CLEARANCE");
  assert.equal(result.evidence.clearanceMm, 0);
});

test("returns BLOCKING when the GPU is thicker than the effective clearance", () => {
  const result = evaluate({ candidateGpuThicknessMm: 51 });

  assert.equal(result.status, "BLOCKING");
  assert.equal(result.reasonCode, "GPU_THICKNESS_EXCEEDS_EFFECTIVE_CLEARANCE");
  assert.equal(result.evidence.clearanceMm, -1);
});

test("allows zero available clearance as a measured blocking result", () => {
  const result = evaluate({
    candidateGpuThicknessMm: 1,
    availableEffectiveThicknessMm: 0,
  });

  assert.equal(result.status, "BLOCKING");
  assert.equal(result.reasonCode, "GPU_THICKNESS_EXCEEDS_EFFECTIVE_CLEARANCE");
  assert.equal(result.evidence.clearanceMm, -1);
});

test("reports a missing candidate thickness", () => {
  const result = evaluate({ candidateGpuThicknessMm: undefined });

  assert.equal(result.status, "MISSING_INFORMATION");
  assert.equal(result.reasonCode, "GPU_THICKNESS_MISSING");
  assert.deepEqual(result.evidence, {
    missingField: "candidateGpuThicknessMm",
  });
});

test("reports null candidate thickness as invalid", () => {
  const result = evaluate({ candidateGpuThicknessMm: null });

  assert.equal(result.status, "MISSING_INFORMATION");
  assert.equal(result.reasonCode, "GPU_THICKNESS_INVALID");
  assert.equal(result.evidence.invalidField, "candidateGpuThicknessMm");
});

test("rejects zero and negative candidate thickness", () => {
  for (const value of [0, -1]) {
    const result = evaluate({ candidateGpuThicknessMm: value });

    assert.equal(result.status, "MISSING_INFORMATION");
    assert.equal(result.reasonCode, "GPU_THICKNESS_INVALID");
    assert.equal(result.evidence.invalidField, "candidateGpuThicknessMm");
  }
});

test("rejects all non-finite candidate thickness values", () => {
  for (const value of [Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]) {
    const result = evaluate({ candidateGpuThicknessMm: value });

    assert.equal(result.status, "MISSING_INFORMATION");
    assert.equal(result.reasonCode, "GPU_THICKNESS_INVALID");
    assert.equal(result.evidence.invalidField, "candidateGpuThicknessMm");
  }
});

test("rejects non-numeric candidate values at runtime", () => {
  for (const value of ["45", { value: 45 }]) {
    const result = evaluate({ candidateGpuThicknessMm: value });

    assert.equal(result.status, "MISSING_INFORMATION");
    assert.equal(result.reasonCode, "GPU_THICKNESS_INVALID");
    assert.equal(result.evidence.invalidField, "candidateGpuThicknessMm");
  }
});

test("reports a missing effective clearance", () => {
  const result = evaluate({ availableEffectiveThicknessMm: undefined });

  assert.equal(result.status, "MISSING_INFORMATION");
  assert.equal(result.reasonCode, "GPU_EFFECTIVE_CLEARANCE_MISSING");
  assert.deepEqual(result.evidence, {
    candidateGpuThicknessMm: 45,
    missingField: "availableEffectiveThicknessMm",
  });
});

test("reports null effective clearance as invalid", () => {
  const result = evaluate({ availableEffectiveThicknessMm: null });

  assert.equal(result.status, "MISSING_INFORMATION");
  assert.equal(result.reasonCode, "GPU_EFFECTIVE_CLEARANCE_INVALID");
  assert.equal(result.evidence.invalidField, "availableEffectiveThicknessMm");
});

test("rejects negative effective clearance", () => {
  const result = evaluate({ availableEffectiveThicknessMm: -1 });

  assert.equal(result.status, "MISSING_INFORMATION");
  assert.equal(result.reasonCode, "GPU_EFFECTIVE_CLEARANCE_INVALID");
  assert.equal(result.evidence.invalidField, "availableEffectiveThicknessMm");
});

test("rejects all non-finite effective clearance values", () => {
  for (const value of [Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]) {
    const result = evaluate({ availableEffectiveThicknessMm: value });

    assert.equal(result.status, "MISSING_INFORMATION");
    assert.equal(result.reasonCode, "GPU_EFFECTIVE_CLEARANCE_INVALID");
    assert.equal(result.evidence.invalidField, "availableEffectiveThicknessMm");
  }
});

test("rejects non-numeric effective clearance values at runtime", () => {
  for (const value of ["50", { value: 50 }]) {
    const result = evaluate({ availableEffectiveThicknessMm: value });

    assert.equal(result.status, "MISSING_INFORMATION");
    assert.equal(result.reasonCode, "GPU_EFFECTIVE_CLEARANCE_INVALID");
    assert.equal(result.evidence.invalidField, "availableEffectiveThicknessMm");
  }
});

test("reports a missing candidate verification status", () => {
  const result = evaluate({
    candidateGpuThicknessVerificationStatus: undefined,
  });

  assert.equal(result.status, "MISSING_INFORMATION");
  assert.equal(result.reasonCode, "GPU_THICKNESS_VERIFICATION_STATUS_MISSING");
  assert.deepEqual(result.evidence, {
    candidateGpuThicknessMm: 45,
    availableEffectiveThicknessMm: 50,
    missingField: "candidateGpuThicknessVerificationStatus",
  });
});

test("reports null candidate verification status as invalid", () => {
  const result = evaluate({ candidateGpuThicknessVerificationStatus: null });

  assert.equal(result.status, "MISSING_INFORMATION");
  assert.equal(result.reasonCode, "GPU_THICKNESS_VERIFICATION_STATUS_INVALID");
  assert.equal(
    result.evidence.invalidField,
    "candidateGpuThicknessVerificationStatus",
  );
});

test("reports an invalid candidate verification status", () => {
  const result = evaluate({
    candidateGpuThicknessVerificationStatus: "estimated",
  });

  assert.equal(result.status, "MISSING_INFORMATION");
  assert.equal(result.reasonCode, "GPU_THICKNESS_VERIFICATION_STATUS_INVALID");
  assert.equal(
    result.evidence.invalidField,
    "candidateGpuThicknessVerificationStatus",
  );
});

test("reports an unverified candidate measurement", () => {
  const result = evaluate({
    candidateGpuThicknessVerificationStatus: "UNVERIFIED",
  });

  assert.equal(result.status, "MISSING_INFORMATION");
  assert.equal(result.reasonCode, "GPU_THICKNESS_UNVERIFIED");
  assert.deepEqual(result.evidence, {
    candidateGpuThicknessMm: 45,
    availableEffectiveThicknessMm: 50,
    unverifiedField: "candidateGpuThicknessVerificationStatus",
  });
});

test("reports a missing effective-clearance verification status", () => {
  const result = evaluate({
    availableEffectiveThicknessVerificationStatus: undefined,
  });

  assert.equal(result.status, "MISSING_INFORMATION");
  assert.equal(
    result.reasonCode,
    "GPU_EFFECTIVE_CLEARANCE_VERIFICATION_STATUS_MISSING",
  );
  assert.deepEqual(result.evidence, {
    candidateGpuThicknessMm: 45,
    availableEffectiveThicknessMm: 50,
    missingField: "availableEffectiveThicknessVerificationStatus",
  });
});

test("reports null effective-clearance verification status as invalid", () => {
  const result = evaluate({
    availableEffectiveThicknessVerificationStatus: null,
  });

  assert.equal(result.status, "MISSING_INFORMATION");
  assert.equal(
    result.reasonCode,
    "GPU_EFFECTIVE_CLEARANCE_VERIFICATION_STATUS_INVALID",
  );
  assert.equal(
    result.evidence.invalidField,
    "availableEffectiveThicknessVerificationStatus",
  );
});

test("reports an invalid effective-clearance verification status", () => {
  const result = evaluate({
    availableEffectiveThicknessVerificationStatus: "estimated",
  });

  assert.equal(result.status, "MISSING_INFORMATION");
  assert.equal(
    result.reasonCode,
    "GPU_EFFECTIVE_CLEARANCE_VERIFICATION_STATUS_INVALID",
  );
  assert.equal(
    result.evidence.invalidField,
    "availableEffectiveThicknessVerificationStatus",
  );
});

test("reports an unverified effective-clearance measurement", () => {
  const result = evaluate({
    availableEffectiveThicknessVerificationStatus: "UNVERIFIED",
  });

  assert.equal(result.status, "MISSING_INFORMATION");
  assert.equal(result.reasonCode, "GPU_EFFECTIVE_CLEARANCE_UNVERIFIED");
  assert.deepEqual(result.evidence, {
    candidateGpuThicknessMm: 45,
    availableEffectiveThicknessMm: 50,
    unverifiedField: "availableEffectiveThicknessVerificationStatus",
  });
});

test("preserves both measurements when verification blocks a conclusion", () => {
  const result = evaluate({
    candidateGpuThicknessVerificationStatus: "UNVERIFIED",
  });

  assert.equal(result.status, "MISSING_INFORMATION");
  assert.deepEqual(result.evidence, {
    candidateGpuThicknessMm: 45,
    availableEffectiveThicknessMm: 50,
    unverifiedField: "candidateGpuThicknessVerificationStatus",
  });
  assert.equal("clearanceMm" in result.evidence, false);
});

test("uses a deterministic validation priority", () => {
  const candidateValue = evaluate({
    candidateGpuThicknessMm: 0,
    availableEffectiveThicknessMm: -1,
    candidateGpuThicknessVerificationStatus: "invalid",
    availableEffectiveThicknessVerificationStatus: "invalid",
  });
  const availableValue = evaluate({
    availableEffectiveThicknessMm: -1,
    candidateGpuThicknessVerificationStatus: "invalid",
    availableEffectiveThicknessVerificationStatus: "invalid",
  });
  const candidateStatus = evaluate({
    candidateGpuThicknessVerificationStatus: "invalid",
    availableEffectiveThicknessVerificationStatus: undefined,
  });
  const availableStatus = evaluate({
    availableEffectiveThicknessVerificationStatus: "invalid",
  });

  assert.equal(candidateValue.status, "MISSING_INFORMATION");
  assert.equal(availableValue.status, "MISSING_INFORMATION");
  assert.equal(candidateStatus.status, "MISSING_INFORMATION");
  assert.equal(availableStatus.status, "MISSING_INFORMATION");

  assert.equal(candidateValue.reasonCode, "GPU_THICKNESS_INVALID");
  assert.equal(availableValue.reasonCode, "GPU_EFFECTIVE_CLEARANCE_INVALID");
  assert.equal(
    candidateStatus.reasonCode,
    "GPU_THICKNESS_VERIFICATION_STATUS_INVALID",
  );
  assert.equal(
    availableStatus.reasonCode,
    "GPU_EFFECTIVE_CLEARANCE_VERIFICATION_STATUS_INVALID",
  );
});

test("returns structured evidence without a score or warning", () => {
  const result = evaluate();

  assert.deepEqual(result.evidence, {
    candidateGpuThicknessMm: 45,
    availableEffectiveThicknessMm: 50,
    clearanceMm: 5,
  });
  assert.equal("score" in result, false);
  assert.notEqual(result.status, "WARNING");
});

test("does not mutate inputs and is deterministic", () => {
  const input = Object.freeze({
    candidateGpuThicknessMm: 45,
    availableEffectiveThicknessMm: 50,
    ...verified,
  });
  const before = { ...input };

  const first = evaluateGpuCaseThickness(input);
  const second = evaluateGpuCaseThickness(input);

  assert.deepEqual(first, second);
  assert.deepEqual(input, before);
});

test("keeps the candidate rule absent from the public API", () => {
  assert.deepEqual(Object.keys(publicApi).sort(), ["evaluateGpuCaseLength"]);
});
