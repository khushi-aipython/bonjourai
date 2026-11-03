import { useState } from "react";
import PageHeader from "../components/PageHeader";
import Panel from "../components/Panel";
import StatusBadge from "../components/StatusBadge";
import { EMPLOYEE, LANGUAGES } from "../lib/constants";

const PREFERENCES = [
  { label: "Email reminders for human follow-ups", enabled: true },
  { label: "Daily summary of call outcomes", enabled: false },
  { label: "Alert when a call fails to connect", enabled: true },
];

const FIELD_CLASS =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20";

function DemoLabel() {
  return <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-amber-800">SIMULATED · NOT SAVED</span>;
}

function SettingField({ label, htmlFor, children, description }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>
      {children}
      {description && <p className="mt-1.5 text-xs text-slate-500">{description}</p>}
    </div>
  );
}

function Toggle({ label, enabled, onChange }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4">
      <span className="text-sm text-slate-700">{label}</span>
      <span className="relative inline-flex shrink-0 items-center">
        <input type="checkbox" checked={enabled} onChange={onChange} className="peer sr-only" />
        <span className="h-5 w-9 rounded-full bg-slate-300 transition-colors peer-checked:bg-blue-600 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500/40 after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:after:translate-x-4" />
        <span className="sr-only">{label}</span>
      </span>
    </label>
  );
}

export default function Settings() {
  const [preferences, setPreferences] = useState(PREFERENCES);
  const [language, setLanguage] = useState("Hindi");
  const [voice, setVoice] = useState("Neha - neutral");
  const [startHour, setStartHour] = useState("09:00");
  const [endHour, setEndHour] = useState("18:00");
  const [retryLimit, setRetryLimit] = useState("2");
  const [humanEscalation, setHumanEscalation] = useState(true);
  const [showNotice, setShowNotice] = useState(false);

  const updatePreference = (label) => {
    setPreferences((current) => current.map((preference) => preference.label === label ? { ...preference, enabled: !preference.enabled } : preference));
  };

  const handleSave = (event) => {
    event.preventDefault();
    setShowNotice(true);
  };

  return (
    <>
      <PageHeader title="Settings" description="Profile and operating preferences for this demo." />

      {showNotice && (
        <div role="status" className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Settings updated for this demo session. These changes are not persisted.
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Panel title="Employee profile" description="Shown in the top-right menu">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-xs text-slate-500">Name</dt>
              <dd className="mt-0.5 text-sm font-medium text-slate-900">{EMPLOYEE.name}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Role</dt>
              <dd className="mt-0.5 text-sm font-medium text-slate-900">{EMPLOYEE.role}</dd>
            </div>
          </dl>
        </Panel>

        <Panel title="Notifications" description="Demo preferences only. Changes are not saved.">
          <ul className="divide-y divide-slate-100">
            {preferences.map((preference) => (
              <li key={preference.label} className="py-3 first:pt-0 last:pb-0">
                <Toggle
                  label={preference.label}
                  enabled={preference.enabled}
                  onChange={() => updatePreference(preference.label)}
                />
              </li>
            ))}
          </ul>
        </Panel>

        <Panel
          title="Language & dialect preferences"
          description="Used as a simulated default for new call campaigns."
          action={<DemoLabel />}
        >
          <form className="space-y-4" onSubmit={handleSave}>
            <SettingField
              label="Default preferred language"
              htmlFor="default-language"
              description="The borrower’s stored preference remains the source of truth when available."
            >
              <select id="default-language" value={language} onChange={(event) => setLanguage(event.target.value)} className={FIELD_CLASS}>
                {LANGUAGES.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </SettingField>
            <SettingField
              label="Dialect display rule"
              htmlFor="dialect-rule"
              description="Specific dialects appear only when the demo data supports them confidently."
            >
              <select id="dialect-rule" defaultValue="confidence" className={FIELD_CLASS}>
                <option value="confidence">Show only confident detections</option>
                <option value="language-only">Show language only</option>
              </select>
            </SettingField>
            <p className="rounded-md bg-slate-50 px-3 py-2 text-xs leading-5 text-slate-600">
              When the sample does not support a dialect, the dashboard displays “Not confidently detected” instead of guessing.
            </p>
            <button type="submit" className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">Apply for demo</button>
          </form>
        </Panel>

        <Panel
          title="Voice configuration"
          description="Sample voice choices for the automated assistant."
          action={<DemoLabel />}
        >
          <form className="space-y-4" onSubmit={handleSave}>
            <SettingField label="Assistant voice" htmlFor="assistant-voice" description="Voice selection is simulated and does not connect to a telephony provider.">
              <select id="assistant-voice" value={voice} onChange={(event) => setVoice(event.target.value)} className={FIELD_CLASS}>
                <option value="Neha - neutral">Neha · Neutral</option>
                <option value="Arjun - warm">Arjun · Warm</option>
                <option value="Kavya - clear">Kavya · Clear</option>
              </select>
            </SettingField>
            <SettingField label="AI disclosure" htmlFor="ai-disclosure">
              <select id="ai-disclosure" defaultValue="always" className={FIELD_CLASS}>
                <option value="always">Always identify as BonjourAI automated assistant</option>
                <option value="short">Use short AI disclosure</option>
              </select>
            </SettingField>
            <button type="submit" className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">Apply for demo</button>
          </form>
        </Panel>

        <Panel
          title="Call policy"
          description="Guardrails for simulated campaign setup."
          action={<DemoLabel />}
        >
          <form className="space-y-4" onSubmit={handleSave}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <SettingField label="Calling hours start" htmlFor="calling-start">
                <select id="calling-start" value={startHour} onChange={(event) => setStartHour(event.target.value)} className={FIELD_CLASS}>
                  <option>08:00</option><option>09:00</option><option>10:00</option>
                </select>
              </SettingField>
              <SettingField label="Calling hours end" htmlFor="calling-end">
                <select id="calling-end" value={endHour} onChange={(event) => setEndHour(event.target.value)} className={FIELD_CLASS}>
                  <option>17:00</option><option>18:00</option><option>19:00</option>
                </select>
              </SettingField>
            </div>
            <SettingField label="Maximum retry limit" htmlFor="policy-retries" description="Retries are simulated and only apply to no-answer or failed calls.">
              <select id="policy-retries" value={retryLimit} onChange={(event) => setRetryLimit(event.target.value)} className={FIELD_CLASS}>
                <option value="0">No retries</option><option value="1">1 retry</option><option value="2">2 retries</option><option value="3">3 retries</option>
              </select>
            </SettingField>
            <div className="flex items-center justify-between gap-4 rounded-md border border-slate-200 px-3 py-2.5">
              <div>
                <p className="text-sm font-medium text-slate-700">Human escalation</p>
                <p className="mt-0.5 text-xs text-slate-500">Flag disputes and explicit requests for team review.</p>
              </div>
              <Toggle label="Human escalation" enabled={humanEscalation} onChange={() => setHumanEscalation((enabled) => !enabled)} />
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status={humanEscalation ? "Enabled" : "Disabled"} tone={humanEscalation ? "success" : "neutral"} />
              <span className="text-xs text-slate-500">No real calls are made from these settings.</span>
            </div>
            <button type="submit" className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">Apply for demo</button>
          </form>
        </Panel>
      </div>
    </>
  );
}
