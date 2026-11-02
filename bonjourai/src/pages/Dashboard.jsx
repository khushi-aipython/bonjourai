import Icon from "../components/Icon";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import Panel from "../components/Panel";
import DataTable from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";
import { BarList } from "../components/Charts";
import { EmptyState, ErrorState, LoadingState } from "../components/AsyncState";
import useAsyncData from "../hooks/useAsyncData";
import { fetchDashboard } from "../services/api";
import { formatDateTime, formatNumber } from "../lib/format";

const RECENT_CALL_COLUMNS = [
  { key: "borrowerId", header: "Borrower ID" },
  { key: "borrowerName", header: "Borrower name" },
  { key: "language", header: "Language" },
  {
    key: "startedAt",
    header: "Call time",
    render: (call) => formatDateTime(call.startedAt),
  },
  {
    key: "status",
    header: "Call status",
    render: (call) => <StatusBadge status={call.status} />,
  },
  { key: "outcome", header: "Outcome" },
];

const KPI_CARDS = [
  { key: "callsAttempted", label: "Calls attempted today", icon: "live" },
  { key: "connected", label: "Successfully connected", icon: "check" },
  { key: "callbackRequests", label: "Callback requests", icon: "history" },
  { key: "humanFollowUps", label: "Human follow-ups required", icon: "user" },
];

export default function Dashboard({ onNavigate }) {
  const { data, loading, error, reload } = useAsyncData(fetchDashboard);

  if (error) {
    return (
      <>
        <PageHeader title="Overview" description="Today's collection reminder activity." />
        <Panel>
          <ErrorState onRetry={reload} message="We could not load the dashboard data." />
        </Panel>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Overview"
        description="Today's repayment reminder activity across all campaigns."
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Key figures">
        {KPI_CARDS.map((card) => (
          <StatCard
            key={card.key}
            label={card.label}
            value={data ? formatNumber(data.stats[card.key]) : "--"}
            helper="Demo data"
            icon={<Icon name={card.icon} className="h-4 w-4 text-slate-400" />}
          />
        ))}
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Panel
          className="xl:col-span-2"
          title="Recent call activity"
          description="Latest automated reminder calls"
          action={
            <button
              type="button"
              onClick={() => onNavigate("call-history")}
              className="text-sm font-medium text-blue-700 transition-colors hover:text-blue-800"
            >
              View call history
            </button>
          }
        >
          <DataTable
            columns={RECENT_CALL_COLUMNS}
            rows={data?.recentCalls ?? []}
            getRowKey={(call) => call.id}
            loading={loading}
            emptyTitle="No calls yet today"
            emptyDescription="Calls will appear here once a campaign starts."
          />
        </Panel>

        <Panel title="Call outcome summary" description="Outcomes of connected calls">
          {loading ? (
            <LoadingState rows={5} />
          ) : (
            <BarList items={data.outcomes} barClassName="bg-blue-600" />
          )}
        </Panel>

        <Panel title="Language distribution" description="Calls attempted by preferred language">
          {loading ? (
            <LoadingState rows={5} />
          ) : (
            <BarList items={data.languages} valueFormatter={formatNumber} barClassName="bg-slate-500" />
          )}
        </Panel>

        <Panel
          className="xl:col-span-2"
          title="Pending follow-ups"
          description="Callbacks and human follow-ups waiting for action"
        >
          {loading ? (
            <LoadingState rows={3} />
          ) : data.followUps.length === 0 ? (
            <EmptyState title="No pending follow-ups" description="Everything is up to date." />
          ) : (
            <ul className="divide-y divide-slate-100">
              {data.followUps.map((call) => (
                <li key={call.id} className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-900">
                      {call.borrowerName}
                      <span className="ml-2 text-xs font-normal text-slate-500">{call.borrowerId}</span>
                    </p>
                    <p className="text-xs text-slate-500">
                      {call.outcome} · {call.language} · {formatDateTime(call.startedAt)}
                    </p>
                  </div>
                  <StatusBadge status={call.followUpStatus} />
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </>
  );
}
