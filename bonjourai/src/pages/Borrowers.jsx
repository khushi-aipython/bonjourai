import { useState } from "react";
import PageHeader from "../components/PageHeader";
import DataTable from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";
import BorrowerDetailModal from "../components/BorrowerDetailModal";
import Panel from "../components/Panel";
import { ErrorState } from "../components/AsyncState";
import useAsyncData from "../hooks/useAsyncData";
import { fetchBorrowers } from "../services/api";
import { CALL_STATUSES, LANGUAGES } from "../lib/constants";
import { formatDate } from "../lib/format";

const BORROWER_CALL_STATUSES = [...CALL_STATUSES, "Not Called"];

const FILTER_CLASS =
  "rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20";

function matchesSearch(borrower, query) {
  if (!query) return true;
  return borrower.name.toLowerCase().includes(query) || borrower.id.toLowerCase().includes(query);
}

export default function Borrowers({ search, onSearchChange }) {
  const { data, loading, error, reload } = useAsyncData(fetchBorrowers);
  const [language, setLanguage] = useState("all");
  const [callStatus, setCallStatus] = useState("all");
  const [selectedId, setSelectedId] = useState(null);
  const [requestedFollowUps, setRequestedFollowUps] = useState([]);

  const borrowers = (data ?? []).map((borrower) => ({
    ...borrower,
    humanFollowUp: borrower.humanFollowUp || requestedFollowUps.includes(borrower.id),
  }));

  const query = search.trim().toLowerCase();
  const filtered = borrowers.filter(
    (borrower) =>
      matchesSearch(borrower, query) &&
      (language === "all" || borrower.language === language) &&
      (callStatus === "all" || borrower.lastCallStatus === callStatus),
  );

  const selected = borrowers.find((borrower) => borrower.id === selectedId) ?? null;

  const columns = [
    { key: "id", header: "Borrower ID", render: (borrower) => borrower.id },
    {
      key: "name",
      header: "Borrower name",
      render: (borrower) => (
        <div className="flex flex-col items-start gap-1">
          <span className="font-medium text-slate-900">{borrower.name}</span>
          <div className="flex flex-wrap gap-1">
            {borrower.optedOut && <StatusBadge status="Opted out" />}
            {borrower.humanFollowUp && <StatusBadge status="Pending" tone="warning" />}
          </div>
        </div>
      ),
    },
    { key: "language", header: "Preferred language", render: (borrower) => borrower.language },
    { key: "contact", header: "Contact number", render: (borrower) => borrower.contact },
    { key: "dueDate", header: "Due date", render: (borrower) => formatDate(borrower.dueDate) },
    {
      key: "lastCallStatus",
      header: "Last call status",
      render: (borrower) => <StatusBadge status={borrower.lastCallStatus} />,
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      cellClassName: "text-right",
      render: (borrower) => (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            setSelectedId(borrower.id);
          }}
          className="rounded-md px-2.5 py-1.5 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-50"
        >
          View details
        </button>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Borrowers"
        description="Search and review synthetic borrower records and their reminder history."
      />

      <Panel>
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center">
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by name or borrower ID"
            aria-label="Search borrowers table"
            className={`${FILTER_CLASS} md:w-72`}
          />
          <div className="flex flex-col gap-3 sm:flex-row md:ml-auto">
            <select
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
              aria-label="Filter by language"
              className={FILTER_CLASS}
            >
              <option value="all">All languages</option>
              {LANGUAGES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select
              value={callStatus}
              onChange={(event) => setCallStatus(event.target.value)}
              aria-label="Filter by last call status"
              className={FILTER_CLASS}
            >
              <option value="all">All call statuses</option>
              {BORROWER_CALL_STATUSES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error ? (
          <ErrorState onRetry={reload} message="We could not load borrower records." />
        ) : (
          <>
            <DataTable
              columns={columns}
              rows={filtered}
              getRowKey={(borrower) => borrower.id}
              onRowClick={(borrower) => setSelectedId(borrower.id)}
              loading={loading}
              emptyTitle="No borrowers match these filters"
              emptyDescription="Try a different name, ID, language or call status."
            />
            {!loading && (
              <p className="mt-4 text-xs text-slate-500">
                Showing {filtered.length} of {borrowers.length} borrowers
              </p>
            )}
          </>
        )}
      </Panel>

      {selected && (
        <BorrowerDetailModal
          borrower={selected}
          onClose={() => setSelectedId(null)}
          onRequestFollowUp={(id) => setRequestedFollowUps((ids) => [...ids, id])}
        />
      )}
    </>
  );
}
