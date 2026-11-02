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
    .slice(0, 8);
  return respond({
    stats: dashboardStats,
    outcomes: outcomeSummary,
    languages: languageDistribution,
    recentCalls,
    followUps: calls.filter((call) => FOLLOW_UP_STATUSES.includes(call.followUpStatus)),
  });
}

export function fetchAnalytics() {
  return respond({ ...analytics, languages: languageDistribution });
}
