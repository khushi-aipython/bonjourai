import { useState } from "react";
import Modal from "./Modal";
import Icon from "./Icon";
import { DEMO_TODAY, LANGUAGES } from "../lib/constants";
import { formatNumber } from "../lib/format";

const SEGMENTS = [
  { id: "due-7", label: "Due in the next 7 days", count: 1240 },
  { id: "overdue-30", label: "Overdue by 1 to 30 days", count: 486 },
  { id: "callbacks", label: "Pending callback requests", count: 18 },
];

const TIME_OPTIONS = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];
const RETRY_OPTIONS = [0, 1, 2, 3];
const STEPS = ["Name and borrowers", "Language and calling window", "Review and confirm"];
const PREFERRED_LANGUAGE = "preferred";

const INITIAL_FORM = {
  name: "",
  segment: SEGMENTS[0].id,
  language: PREFERRED_LANGUAGE,
  windowStart: "09:00",
  windowEnd: "18:00",
  maxRetries: 2,
};

const FIELD_CLASS =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20";

function validateStep(step, form) {
  if (step === 0 && form.name.trim().length < 3) return "Enter a campaign name of at least 3 characters.";
  if (step === 1 && form.windowStart >= form.windowEnd) return "The calling window must end after it starts.";
  return null;
}

function StepIndicator({ current }) {
  return (
    <ol className="mb-6 flex flex-wrap gap-2 text-xs">
      {STEPS.map((label, index) => {
        const done = index < current;
        const active = index === current;
        return (
          <li
            key={label}
            className={`flex items-center gap-2 rounded-full px-3 py-1 font-medium ${
              active ? "bg-blue-600 text-white" : done ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"
            }`}
          >
            {done ? <Icon name="check" className="h-3.5 w-3.5" /> : <span>{index + 1}</span>}
            {label}
          </li>
        );
      })}
    </ol>
  );
}

function LabeledField({ label, htmlFor, children }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>
      {children}
    </div>
  );
}

function DetailsStep({ form, onChange }) {
  return (
    <div className="space-y-5">
      <LabeledField label="Campaign name" htmlFor="campaign-name">
        <input
          id="campaign-name"
          type="text"
          value={form.name}
          onChange={(event) => onChange("name", event.target.value)}
          placeholder="For example: December EMI reminder - Hindi belt"
          className={FIELD_CLASS}
        />
      </LabeledField>
      <fieldset>
        <legend className="mb-2 text-sm font-medium text-slate-700">Borrower selection</legend>
        <div className="space-y-2">
          {SEGMENTS.map((segment) => (
            <label
              key={segment.id}
              className={`flex cursor-pointer items-center justify-between gap-3 rounded-md border px-4 py-3 text-sm transition-colors ${
                form.segment === segment.id ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:bg-slate-50"
              }`}
            >
              <span className="flex items-center gap-3">
                <input
                  type="radio"
                  name="segment"
                  value={segment.id}
                  checked={form.segment === segment.id}
                  onChange={() => onChange("segment", segment.id)}
                  className="h-4 w-4 accent-blue-600"
                />
                <span className="text-slate-900">{segment.label}</span>
              </span>
              <span className="text-xs tabular-nums text-slate-500">{formatNumber(segment.count)} borrowers</span>
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}

function ScheduleStep({ form, onChange }) {
  return (
    <div className="space-y-5">
      <LabeledField label="Language preference" htmlFor="campaign-language">
        <select
          id="campaign-language"
          value={form.language}
          onChange={(event) => onChange("language", event.target.value)}
          className={FIELD_CLASS}
        >
          <option value={PREFERRED_LANGUAGE}>Borrower's preferred language</option>
          {LANGUAGES.map((language) => (
            <option key={language} value={language}>
              {language} only
            </option>
          ))}
        </select>
      </LabeledField>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <LabeledField label="Calling window starts" htmlFor="window-start">
          <select id="window-start" value={form.windowStart} onChange={(event) => onChange("windowStart", event.target.value)} className={FIELD_CLASS}>
            {TIME_OPTIONS.map((time) => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </LabeledField>
        <LabeledField label="Calling window ends" htmlFor="window-end">
          <select id="window-end" value={form.windowEnd} onChange={(event) => onChange("windowEnd", event.target.value)} className={FIELD_CLASS}>
            {TIME_OPTIONS.map((time) => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </LabeledField>
      </div>
      <LabeledField label="Maximum retry limit" htmlFor="max-retries">
        <select id="max-retries" value={form.maxRetries} onChange={(event) => onChange("maxRetries", Number(event.target.value))} className={FIELD_CLASS}>
          {RETRY_OPTIONS.map((count) => (
            <option key={count} value={count}>
              {count === 0 ? "No retries" : `${count} retry attempt${count > 1 ? "s" : ""}`}
            </option>
          ))}
        </select>
        <p className="mt-1.5 text-xs text-slate-500">Retries apply only to calls with no answer or a failed connection.</p>
      </LabeledField>
    </div>
  );
}

function ReviewStep({ form }) {
  const segment = SEGMENTS.find((item) => item.id === form.segment);
  const rows = [
    ["Campaign name", form.name.trim()],
    ["Borrowers targeted", `${formatNumber(segment.count)} (${segment.label})`],
    ["Language", form.language === PREFERRED_LANGUAGE ? "Borrower's preferred language" : `${form.language} only`],
    ["Calling window", `${form.windowStart} to ${form.windowEnd}, Mon to Sat`],
    ["Maximum retries", String(form.maxRetries)],
    ["Start date", DEMO_TODAY],
  ];
  return (
    <div className="space-y-5">
      <dl className="divide-y divide-slate-100 rounded-md border border-slate-200">
        {rows.map(([label, value]) => (
          <div key={label} className="grid grid-cols-3 gap-4 px-4 py-3 text-sm">
            <dt className="text-slate-500">{label}</dt>
            <dd className="col-span-2 font-medium text-slate-900">{value}</dd>
          </div>
        ))}
      </dl>
      <p className="flex items-start gap-2 rounded-md bg-amber-50 px-4 py-3 text-sm text-amber-900">
        <Icon name="info" className="mt-0.5 h-4 w-4 shrink-0" />
        This is a simulation. Creating the campaign does not place any phone calls.
      </p>
    </div>
  );
}

export default function CreateCampaignModal({ onClose, onCreate }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(INITIAL_FORM);
  const [error, setError] = useState(null);

  const handleChange = (field, value) => {
    setError(null);
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleNext = () => {
    const message = validateStep(step, form);
    if (message) {
      setError(message);
      return;
    }
    setError(null);
    setStep((current) => current + 1);
  };

  const handleCreate = () => {
    const segment = SEGMENTS.find((item) => item.id === form.segment);
    onCreate({
      id: `CMP-${Date.now().toString().slice(-4)}`,
      name: form.name.trim(),
      targetCount: segment.count,
      language: form.language === PREFERRED_LANGUAGE ? "Preferred" : form.language,
      window: `${form.windowStart} - ${form.windowEnd}`,
      days: "Mon - Sat",
      startDate: DEMO_TODAY,
      endDate: "",
      status: "Scheduled",
      completedCalls: 0,
      maxRetries: form.maxRetries,
    });
    onClose();
  };

  const footer = (
    <>
      {step > 0 && (
        <button
          type="button"
          onClick={() => {
            setError(null);
            setStep((current) => current - 1);
          }}
          className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
        >
          Back
        </button>
      )}
      <button
        type="button"
        onClick={onClose}
        className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
      >
        Cancel
      </button>
      {step < STEPS.length - 1 ? (
        <button
          type="button"
          onClick={handleNext}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Continue
        </button>
      ) : (
        <button
          type="button"
          onClick={handleCreate}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Create simulated campaign
        </button>
      )}
    </>
  );

  return (
    <Modal open size="lg" title="Create campaign" description="Set up a repayment reminder campaign." onClose={onClose} footer={footer}>
      <StepIndicator current={step} />
      {step === 0 && <DetailsStep form={form} onChange={handleChange} />}
      {step === 1 && <ScheduleStep form={form} onChange={handleChange} />}
      {step === 2 && <ReviewStep form={form} />}
      {error && (
        <p role="alert" className="mt-4 text-sm text-red-700">
          {error}
        </p>
      )}
    </Modal>
  );
}
