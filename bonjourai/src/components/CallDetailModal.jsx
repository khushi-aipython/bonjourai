import { useState } from "react";
import Modal from "./Modal";
import StatusBadge from "./StatusBadge";
import CallTranscript, { EventTimeline } from "./CallTranscript";
import { formatDateTime, formatDuration } from "../lib/format";
import { getEvents, getTranscript } from "../lib/callScript";

const TABS = [
  { key: "transcript", label: "Transcript" },
  { key: "events", label: "Event history" },
];

export default function CallDetailModal({ call, script, onClose }) {
  const [tab, setTab] = useState("transcript");
  const steps = script?.steps ?? [];
  const transcript = getTranscript(steps, steps.length);
  const events = getEvents(steps, steps.length);

  return (
    <Modal open size="xl" title={`Call ${call.id}`} description={`${call.borrowerName} · ${call.borrowerId}`} onClose={onClose}>
      <dl className="grid grid-cols-2 gap-x-6 gap-y-4 rounded-md border border-slate-200 bg-slate-50 p-4 sm:grid-cols-4">
        <div>
          <dt className="text-xs text-slate-500">Start time</dt>
          <dd className="mt-0.5 text-sm font-medium text-slate-900">{formatDateTime(call.startedAt)}</dd>
        </div>
        <div>
          <dt className="text-xs text-slate-500">Duration</dt>
          <dd className="mt-0.5 text-sm font-medium tabular-nums text-slate-900">{formatDuration(call.durationSec)}</dd>
        </div>
        <div>
          <dt className="text-xs text-slate-500">Language</dt>
          <dd className="mt-0.5 text-sm font-medium text-slate-900">{call.language}</dd>
        </div>
        <div>
          <dt className="text-xs text-slate-500">Call status</dt>
          <dd className="mt-0.5">
            <StatusBadge status={call.status} />
          </dd>
        </div>
        <div className="col-span-2">
          <dt className="text-xs text-slate-500">Call outcome</dt>
          <dd className="mt-0.5 text-sm font-medium text-slate-900">{call.outcome}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-xs text-slate-500">Follow-up status</dt>
          <dd className="mt-0.5">
            <StatusBadge status={call.followUpStatus} />
          </dd>
        </div>
      </dl>

      <div role="tablist" aria-label="Call record sections" className="mt-6 flex gap-1 border-b border-slate-200">
        {TABS.map((item) => (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={tab === item.key}
            onClick={() => setTab(item.key)}
            className={`-mb-px border-b-2 px-3 py-2 text-sm font-medium transition-colors ${
              tab === item.key ? "border-blue-600 text-blue-700" : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {script && (
        <p className="mt-5 rounded-md bg-amber-50 px-3 py-2 text-xs text-amber-900">
          Sample conversation shown for this call type. It is not the recorded transcript for this call.
        </p>
      )}

      <div className="mt-5">
        {tab === "transcript" ? (
          <CallTranscript
            messages={transcript}
            emptyText="No conversation was recorded for this attempt."
          />
        ) : (
          <EventTimeline events={events} emptyText="No events were recorded for this attempt." />
        )}
      </div>
    </Modal>
  );
}
