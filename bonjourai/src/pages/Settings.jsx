import PageHeader from "../components/PageHeader";
import Panel from "../components/Panel";
import { EMPLOYEE } from "../lib/constants";

const PREFERENCES = [
  { label: "Email reminders for human follow-ups", enabled: true },
  { label: "Daily summary of call outcomes", enabled: false },
  { label: "Alert when a call fails to connect", enabled: true },
];

export default function Settings() {
  return (
    <>
      <PageHeader title="Settings" description="Profile and notification preferences for this demo." />

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
            {PREFERENCES.map((preference) => (
              <li key={preference.label} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                <span className="text-sm text-slate-700">{preference.label}</span>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" defaultChecked={preference.enabled} className="peer sr-only" />
                  <span className="h-5 w-9 rounded-full bg-slate-300 transition-colors peer-checked:bg-blue-600 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500/40 after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow after:transition-transform peer-checked:after:translate-x-4" />
                  <span className="sr-only">{preference.label}</span>
                </label>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}
