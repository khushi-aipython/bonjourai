export const NAV_ITEMS = [
  { key: "overview", label: "Overview", icon: "overview" },
  { key: "borrowers", label: "Borrowers", icon: "borrowers" },
  { key: "campaigns", label: "Campaigns", icon: "campaigns" },
  { key: "live-calls", label: "Live Calls", icon: "live" },
  { key: "call-history", label: "Call History", icon: "history" },
  { key: "analytics", label: "Analytics", icon: "analytics" },
  { key: "settings", label: "Settings", icon: "settings" },
];

const DEFAULT_PAGE = "overview";

export function getPageFromHash() {
  const key = window.location.hash.replace(/^#\//, "");
  return NAV_ITEMS.some((item) => item.key === key) ? key : DEFAULT_PAGE;
}
