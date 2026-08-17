import assert from "node:assert/strict";
import test from "node:test";

import * as publicApi from "@fitmylife/compatibility-engine";
import { evaluateMyStuffGpuCaseLength } from "../dist/my-stuff-gpu-case.js";

test("maps a shorter candidate GPU to the existing VALID result", () => {
  const result = evaluateMyStuffGpuCaseLength(
    { lengthMm: 300 },
    { availableGpuSpaceMm: 320 },
  );

  assert.deepEqual(result, {
    status: "VALID",
    reasonCode: "GPU_LENGTH_FITS_AVAILABLE_SPACE",
    evidence: {
      candidateGpuLengthMm: 300,
      availableGpuSpaceMm: 320,
      clearanceMm: 20,
    },
  });
});

test("preserves the exact-fit result", () => {
  const result = evaluateMyStuffGpuCaseLength(
    { lengthMm: 320 },
    { availableGpuSpaceMm: 320 },
  );

  assert.equal(result.status, "VALID");
  assert.equal(result.reasonCode, "GPU_LENGTH_FITS_AVAILABLE_SPACE");
  assert.equal(result.evidence.clearanceMm, 0);
});

test("preserves the blocking result for an overlong candidate GPU", () => {
  const result = evaluateMyStuffGpuCaseLength(
    { lengthMm: 321 },
    { availableGpuSpaceMm: 320 },
  );

  assert.equal(result.status, "BLOCKING");
  assert.equal(result.reasonCode, "GPU_LENGTH_EXCEEDS_AVAILABLE_SPACE");
  assert.equal(result.evidence.clearanceMm, -1);
});

test("passes an absent candidate GPU length through unchanged", () => {
  const result = evaluateMyStuffGpuCaseLength(
    {},
    { availableGpuSpaceMm: 320 },
  );

  assert.deepEqual(result, {
    status: "MISSING_INFORMATION",
    reasonCode: "GPU_LENGTH_MISSING",
    evidence: { missingField: "candidateGpuLengthMm" },
  });
});

test("passes an absent case space through unchanged", () => {
  const result = evaluateMyStuffGpuCaseLength(
    { lengthMm: 300 },
    {},
  );

  assert.deepEqual(result, {
    status: "MISSING_INFORMATION",
    reasonCode: "GPU_SPACE_MISSING",
    evidence: {
      candidateGpuLengthMm: 300,
      missingField: "availableGpuSpaceMm",
    },
  });
});

test("passes invalid dimensions through unchanged", () => {
  const candidateResult = evaluateMyStuffGpuCaseLength(
    { lengthMm: null },
    { availableGpuSpaceMm: 320 },
  );
  const caseResult = evaluateMyStuffGpuCaseLength(
    { lengthMm: 300 },
    { availableGpuSpaceMm: 0 },
  );

  assert.equal(candidateResult.status, "MISSING_INFORMATION");
  assert.equal(candidateResult.reasonCode, "GPU_LENGTH_INVALID");
  assert.equal(caseResult.status, "MISSING_INFORMATION");
  assert.equal(caseResult.reasonCode, "GPU_SPACE_INVALID");
});

test("delegates the mapped facts and preserves the complete result contract", () => {
  const candidateGpu = { lengthMm: 400 };
  const existingCase = { availableGpuSpaceMm: 350 };
  const adapted = evaluateMyStuffGpuCaseLength(candidateGpu, existingCase);
  const direct = publicApi.evaluateGpuCaseLength({
    candidateGpuLengthMm: candidateGpu.lengthMm,
    availableGpuSpaceMm: existingCase.availableGpuSpaceMm,
  });

  assert.deepEqual(adapted, direct);
  assert.deepEqual(adapted.evidence, {
    candidateGpuLengthMm: 400,
    availableGpuSpaceMm: 350,
    clearanceMm: -50,
  });
  assert.equal("score" in adapted, false);
  assert.equal(adapted.status, "BLOCKING");
  assert.equal(adapted.reasonCode, "GPU_LENGTH_EXCEEDS_AVAILABLE_SPACE");
});

test("does not mutate either input context", () => {
  const candidateGpu = Object.freeze({ lengthMm: 310 });
  const existingCase = Object.freeze({ availableGpuSpaceMm: 320 });
  const candidateBefore = { ...candidateGpu };
  const caseBefore = { ...existingCase };

  evaluateMyStuffGpuCaseLength(candidateGpu, existingCase);

  assert.deepEqual(candidateGpu, candidateBefore);
  assert.deepEqual(existingCase, caseBefore);
});

test("is deterministic for the same My Stuff facts", () => {
  const candidateGpu = { lengthMm: 310 };
  const existingCase = { availableGpuSpaceMm: 320 };

  assert.deepEqual(
    evaluateMyStuffGpuCaseLength(candidateGpu, existingCase),
    evaluateMyStuffGpuCaseLength(candidateGpu, existingCase),
  );
});

test("keeps the public runtime export surface unchanged", () => {
  assert.deepEqual(Object.keys(publicApi).sort(), ["evaluateGpuCaseLength"]);
});
