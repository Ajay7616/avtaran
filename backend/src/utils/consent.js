// Records that the person ticked the consent box, and which policy version they saw.
const POLICY_VERSION = process.env.POLICY_VERSION || "2026-10-11";

const isConsentGiven = (value) =>
  value === true || value === "true" || value === "on";

const buildConsent = () => ({
  given: true,
  at: new Date(),
  policyVersion: POLICY_VERSION,
});

module.exports = { isConsentGiven, buildConsent };
