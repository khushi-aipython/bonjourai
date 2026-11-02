const TONES = {
  success: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  warning: "bg-amber-50 text-amber-800 ring-amber-600/25",
  danger: "bg-red-50 text-red-700 ring-red-600/20",
  info: "bg-blue-50 text-blue-700 ring-blue-600/20",
  neutral: "bg-slate-100 text-slate-600 ring-slate-500/20",
};

const STATUS_TONES = {
  Completed: "success",
  Active: "success",
  Connected: "success",
  Closed: "success",
  "Callback Requested": "warning",
  Pending: "warning",
  Requested: "warning",
  "Human follow-up": "info",
  Assigned: "info",
  Scheduled: "info",
  Connecting: "info",
  "In Progress": "info",
  Failed: "danger",
  "Opted out": "danger",
  "Not Answered": "neutral",
  "Not Called": "neutral",
  "Not required": "neutral",
  Paused: "neutral",
  Draft: "neutral",
  None: "neutral",
};

export default function StatusBadge({ status, tone }) {
  const resolvedTone = tone ?? STATUS_TONES[status] ?? "neutral";
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${TONES[resolvedTone]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {status}
    </span>
  );
}
