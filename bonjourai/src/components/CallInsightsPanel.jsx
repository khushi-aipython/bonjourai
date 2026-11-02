import Panel from "./Panel";
import StatusBadge from "./StatusBadge";
import { EventTimeline } from "./CallTranscript";

function InsightRow({ label, children }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3 first:pt-0 last:pb-0">
      <dt className="text-sm text-slate-500">{label}</dt>
      <dd className="text-right text-sm font-medium text-slate-900">{children}</dd>
    </div>
  );
}

export default function CallInsightsPanel({ snapshot, events, languageChanges }) {
  const escalationTone = snapshot.escalation === "None" ? "neutral" : snapshot.escalation === "Requested" ? "warning" : "info";

  return (
    <div className="space-y-4">
      <Panel title="Conversation insights" description="Updates as the call progresses">
        <dl className="divide-y divide-slate-100">
          <InsightRow label="Detected language">
            <span className="inline-flex flex-wrap items-center justify-end gap-2">
              {snapshot.language ?? "Detecting"}
              {languageChanges > 0 && <StatusBadge status={`${languageChanges} change${languageChanges > 1 ? "s" : ""}`} tone="warning" />}
            </span>
          </InsightRow>
          <InsightRow label="Conversation intent">{snapshot.intent}</InsightRow>
          <InsightRow label="Current conversation state">{snapshot.state}</InsightRow>
          <InsightRow label="Latest agent action">{snapshot.action}</InsightRow>
          <InsightRow label="Escalation status">
            <StatusBadge status={snapshot.escalation === "None" ? "No escalation" : snapshot.escalation} tone={escalationTone} />
          </InsightRow>
          <InsightRow label="Opt-out status">
            {snapshot.optedOut ? <StatusBadge status="Opted out" /> : <StatusBadge status="Not opted out" tone="neutral" />}
          </InsightRow>
        </dl>
      </Panel>

      <Panel title="Call event timeline" description="Key events from this conversation">
        <EventTimeline events={events} emptyText="Events will appear here as the call progresses." />
      </Panel>
    </div>
  );
}
