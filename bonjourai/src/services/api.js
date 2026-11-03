import { borrowers } from "../data/mockBorrowers";
import { calls } from "../data/mockCalls";
import { callScripts } from "../data/mockCallScripts";
import { campaigns } from "../data/mockCampaigns";
import { analytics, dashboardStats, languageDistribution, outcomeSummary } from "../data/mockAnalytics";

const DEMO_LATENCY_MS = 350;

function respond(data) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(structuredClone(data)), DEMO_LATENCY_MS);
  });
}

const FOLLOW_UP_STATUSES = ["Pending", "Assigned"];

const LANGUAGE_METADATA = {
  "CALL-88412": { preferredLanguage: "Hindi", detectedLanguage: "English", dialect: "Not confidently detected", languageSwitch: "Switched", codeSwitching: "Yes" },
  "CALL-88396": { preferredLanguage: "Hindi", detectedLanguage: "Hindi", dialect: "Not confidently detected", languageSwitch: "No switch", codeSwitching: "No" },
  "CALL-88390": { preferredLanguage: "Tamil", detectedLanguage: "Tamil", dialect: "Not confidently detected", languageSwitch: "No switch", codeSwitching: "No" },
  "CALL-88415": { preferredLanguage: "Telugu", detectedLanguage: "English", dialect: "Not confidently detected", languageSwitch: "Switched", codeSwitching: "Yes" },
  "CALL-88419": { preferredLanguage: "Marathi", detectedLanguage: "Marathi", dialect: "Not confidently detected", languageSwitch: "No switch", codeSwitching: "No" },
  "CALL-88420": { preferredLanguage: "English", detectedLanguage: "Not confidently detected", dialect: "Not confidently detected", languageSwitch: "Not available", codeSwitching: "Not available" },
  "CALL-88424": { preferredLanguage: "Kannada", detectedLanguage: "Not confidently detected", dialect: "Not confidently detected", languageSwitch: "Not available", codeSwitching: "Not available" },
  "CALL-88427": { preferredLanguage: "Hindi", detectedLanguage: "Not confidently detected", dialect: "Not confidently detected", languageSwitch: "Not available", codeSwitching: "Not available" },
};

function enrichCall(call) {
  return { ...call, ...LANGUAGE_METADATA[call.id], detectedLanguage: LANGUAGE_METADATA[call.id]?.detectedLanguage ?? call.language, dialect: LANGUAGE_METADATA[call.id]?.dialect ?? "Not confidently detected", languageSwitch: LANGUAGE_METADATA[call.id]?.languageSwitch ?? "Not available", codeSwitching: LANGUAGE_METADATA[call.id]?.codeSwitching ?? "Not available" };
}

export function fetchBorrowers() {
  return respond(borrowers);
}

export function fetchCalls() {
  return respond(calls);
}

export function fetchCampaigns() {
  return respond(campaigns);
}

export function fetchCallScenarios() {
  return respond(callScripts);
}

export function fetchDashboard() {
  const recentCalls = [...calls]
    .sort((a, b) => b.startedAt.localeCompare(a.startedAt))
    .slice(0, 8)
    .map(enrichCall);
  return respond({
    stats: dashboardStats,
    outcomes: outcomeSummary,
    languages: languageDistribution,
    recentCalls,
    followUps: calls.filter((call) => FOLLOW_UP_STATUSES.includes(call.followUpStatus)).map(enrichCall),
  });
}

export function fetchAnalytics() {
  return respond({ ...analytics, languages: languageDistribution });
}
