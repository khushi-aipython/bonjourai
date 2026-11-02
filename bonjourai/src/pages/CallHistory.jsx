import { useMemo, useState } from "react";
import PageHeader from "../components/PageHeader";
import Panel from "../components/Panel";
import DataTable from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";
import CallDetailModal from "../components/CallDetailModal";
import { ErrorState } from "../components/AsyncState";
import useAsyncData from "../hooks/useAsyncData";
import { fetchCallScenarios, fetchCalls } from "../services/api";
import { CALL_STATUSES, DEMO_TODAY, LANGUAGES } from "../lib/constants";
import { formatDateTime, formatDuration } from "../lib/format";

const DAY_MS = 86400000;
const DATE_RANGES = [
  { value: "all", label: "All dates", days: Infinity },
  { value: "today", label: "Today", days: 1 },
  { value: "7d", label: "Last 7 days", days: 7 },
  { value: "30d", label: "Last 30 days", days: 30 },
];

const FILTER_CLASS =
  "rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20";

function isWithinRange(startedAt, rangeValue) {
  const range = DATE_RANGES.find((item) => item.value === rangeValue);
  const ageDays = Math.round((Date.parse(DEMO_TODAY) - Date.parse(startedAt.slice(0, 10))) / DAY_MS);
  return ageDays < range.days;
}

function matchesQuery(call, query) {
  if (!query) return true;
  return [call.id, call.borrowerId, call.borrowerName].some((value) => value.toLowerCase().includes(query));
}

function FilterSelect({ label, value, onChange, children }) {
  return (
    <select value={value} onChange={(event) => onChange(event.target.value)} aria-label={label} className={FILTER_CLASS}>
      {children}
    </select>
  );
}

export default function CallHistory() {
  const callsState = useAsyncData(fetchCalls);
  const scenariosState = useAsyncData(fetchCallScenarios);
  const [query, setQuery] = useState("");
  const [dateRange, setDateRange] = useState("all");
  const [status, setStatus] = useState("all");
  const [language, setLanguage] = useState("all");
  const [outcome, setOutcome] = useState("all");
  const [selectedId, setSelectedId] = useState(null);

  const calls = useMemo(() => callsState.data ?? [], [callsState.data]);
  const outcomes = useMemo(() => [...new Set(calls.map((call) => call.outcome))], [calls]);
  const normalizedQuery = query.trim().toLowerCase();

  const filtered = calls.filter(
    (call) =>
      matchesQuery(call, normalizedQuery) &&
      isWithinRange(call.startedAt, dateRange) &&
      (status === "all" || call.status === status) &&
      (language === "all" || call.language === language) &&
      (outcome === "all" || call.outcome === outcome),
  );

  const selectedCall = calls.find((call) => call.id === selectedId) ?? null;
  const selectedScript = selectedCall
    ? (scenariosState.data ?? []).find((script) => script.id === selectedCall.scriptId) ?? null
    : null;

  const columns = [
    { key: "id", header: "Call ID", render: (call) => <span className="font-medium text-slate-900">{call.id}</span> },
    { key: "borrowerId", header: "Borrower ID", render: (call) => call.borrowerId },
    { key: "language", header: "Language", render: (call) => call.language },
    { key: "startedAt", header: "Start time", render: (call) => formatDateTime(call.startedAt) },
    {
      key: "durationSec",
      header: "Duration",
      render: (call) => <span className="tabular-nums">{formatDuration(call.durationSec)}</span>,
    },
    {
      key: "outcome",
      header: "Call outcome",
      render: (call) => (
        <div>
          <p className="text-slate-900">{call.outcome}</p>
          <div className="mt-1">
            <StatusBadge status={call.status} />
          </div>
        </div>
      ),
    },
    {
      key: "followUpStatus",
      header: "Follow-up status",
      render: (call) => <StatusBadge status={call.followUpStatus} />,
    },
  ];

  const hasError = callsState.error || scenariosState.error;

  return (
    <>
      <PageHeader
        title="Call History"
        description="Review past reminder calls, transcripts and event history."
      />

      <Panel>
        {hasError ? (
          <ErrorState
            onRetry={() => {
              callsState.reload();
              scenariosState.reload();
            }}
            message="We could not load call records."
          />
        ) : (
          <>
            <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search call or borrower ID"
                aria-label="Search call records"
                className={`${FILTER_CLASS} xl:col-span-1`}
              />
              <FilterSelect label="Filter by date range" value={dateRange} onChange={setDateRange}>
                {DATE_RANGES.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </FilterSelect>
              <FilterSelect label="Filter by call status" value={status} onChange={setStatus}>
                <option value="all">All call statuses</option>
                {CALL_STATUSES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </FilterSelect>
              <FilterSelect label="Filter by language" value={language} onChange={setLanguage}>
                <option value="all">All languages</option>
                {LANGUAGES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </FilterSelect>
              <FilterSelect label="Filter by outcome" value={outcome} onChange={setOutcome}>
                <option value="all">All outcomes</option>
                {outcomes.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </FilterSelect>
            </div>

            <DataTable
              columns={columns}
              rows={filtered}
              getRowKey={(call) => call.id}
              onRowClick={(call) => setSelectedId(call.id)}
              loading={callsState.loading}
              emptyTitle="No calls match these filters"
              emptyDescription="Adjust the date range or filters to see more records."
            />
            {!callsState.loading && (
              <p className="mt-4 text-xs text-slate-500">
                Showing {filtered.length} of {calls.length} call records. Select a row to view its transcript.
              </p>
            )}
          </>
        )}
      </Panel>

      {selectedCall && (
        <CallDetailModal call={selectedCall} script={selectedScript} onClose={() => setSelectedId(null)} />
      )}
    </>
  );
}
