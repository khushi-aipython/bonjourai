import { useState } from "react";
import Modal from "./Modal";
import StatusBadge from "./StatusBadge";
import Icon from "./Icon";
import { formatCurrency, formatDate } from "../lib/format";

function DetailField({ label, children }) {
  return (
    <div>
      <dt className="text-xs font-medium text-slate-500">{label}</dt>
      <dd className="mt-0.5 text-sm text-slate-900">{children}</dd>
    </div>
  );
}

function FollowUpAction({ borrower, onConfirm }) {
  const [confirming, setConfirming] = useState(false);

  if (borrower.optedOut) {
    return (
      <p className="flex items-center gap-2 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
        <Icon name="alert" className="h-4 w-4 shrink-0" />
        This borrower has opted out of reminder calls, so no follow-up can be requested.
      </p>
    );
  }

  if (borrower.humanFollowUp) {
    return (
      <p className="flex items-center gap-2 rounded-md bg-blue-50 px-3 py-2 text-sm text-blue-700">
        <Icon name="check" className="h-4 w-4 shrink-0" />
        A human follow-up is already pending for this borrower.
      </p>
    );
  }

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
      >
        Request human follow-up
      </button>
    );
  }

  return (
    <div className="rounded-md border border-blue-200 bg-blue-50 p-4">
      <p className="text-sm font-medium text-slate-900">Request a human follow-up?</p>
      <p className="mt-1 text-sm text-slate-600">A team member will be asked to contact this borrower. This is a demo, so no real request is sent.</p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => onConfirm(borrower.id)}
          className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Confirm request
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-white"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default function BorrowerDetailModal({ borrower, onClose, onRequestFollowUp }) {
  return (
    <Modal
      open
      size="lg"
      title={borrower.name}
      description={`${borrower.id} · ${borrower.loanType}`}
      onClose={onClose}
    >
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2">
          <StatusBadge status={borrower.lastCallStatus} />
          {borrower.optedOut ? <StatusBadge status="Opted out" /> : <StatusBadge status="Active" tone="success" />}
          {borrower.humanFollowUp && <StatusBadge status="Pending" tone="warning" />}
        </div>

        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <DetailField label="Preferred language">{borrower.language}</DetailField>
          <DetailField label="Contact number (masked)">{borrower.contact}</DetailField>
          <DetailField label="Next due date">{formatDate(borrower.dueDate)}</DetailField>
          <DetailField label="EMI amount">{formatCurrency(borrower.emi)}</DetailField>
          <DetailField label="Opt-out status">{borrower.optedOut ? "Opted out of calls" : "Not opted out"}</DetailField>
          <DetailField label="Human follow-up">{borrower.humanFollowUp ? "Required" : "Not required"}</DetailField>
        </dl>

        <section>
          <h3 className="text-sm font-semibold text-slate-900">Repayment reminder history</h3>
          {borrower.reminders.length === 0 ? (
            <p className="mt-2 text-sm text-slate-500">No reminder calls have been made to this borrower yet.</p>
          ) : (
            <ul className="mt-3 divide-y divide-slate-100 rounded-md border border-slate-200">
              {borrower.reminders.map((reminder) => (
                <li key={reminder.callId} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm">
                  <div>
                    <p className="font-medium text-slate-900">{reminder.outcome}</p>
                    <p className="text-xs text-slate-500">AI voice call · {reminder.callId}</p>
                  </div>
                  <span className="text-xs tabular-nums text-slate-500">{formatDate(reminder.date)}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h3 className="text-sm font-semibold text-slate-900">Follow-up</h3>
          <div className="mt-3">
            <FollowUpAction borrower={borrower} onConfirm={onRequestFollowUp} />
          </div>
        </section>
      </div>
    </Modal>
  );
}
