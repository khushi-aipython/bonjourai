import PageHeader from "../components/PageHeader";
import Panel from "../components/Panel";
import StatCard from "../components/StatCard";
import { BarList, ColumnChart, StackedBar } from "../components/Charts";
import { ErrorState, LoadingState } from "../components/AsyncState";
import useAsyncData from "../hooks/useAsyncData";
import { fetchAnalytics } from "../services/api";
import { formatNumber } from "../lib/format";

function percent(part, whole) {
  return whole === 0 ? "0%" : `${Math.round((part / whole) * 100)}%`;
}

export default function Analytics() {
  const { data, loading, error, reload } = useAsyncData(fetchAnalytics);

  if (error) {
    return (
      <>
        <PageHeader title="Analytics" description="Reminder call performance summary." />
        <Panel>
          <ErrorState onRetry={reload} message="We could not load analytics." />
        </Panel>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <PageHeader title="Analytics" description="Reminder call performance summary." />
        <Panel>
          <LoadingState rows={6} />
        </Panel>
      </>
    );
  }

  const { completedVsUnanswered: outcome, languageSwitching: switching } = data;
  const totalCalls = outcome.completed + outcome.unanswered + outcome.failed;

  return (
    <>
      <PageHeader
        title="Analytics"
        description="Demo figures for reminder calls. These are sample numbers, not measured results."
      />

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Summary">
        <StatCard label="Promise-to-pay outcomes" value={formatNumber(data.promiseToPay)} helper={`${percent(data.promiseToPay, totalCalls)} of calls`} />
        <StatCard label="Human escalations" value={formatNumber(data.humanEscalations)} helper="Handed to a team member" />
        <StatCard label="Opt-outs" value={formatNumber(data.optOuts)} helper="Borrowers who asked to stop calls" />
        <StatCard label="Language switches" value={formatNumber(switching.switchesDetected)} helper="Detected during calls" />
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Panel title="Completed versus unanswered" description="Outcome of all calls attempted in the demo period" className="xl:col-span-2">
          <StackedBar
            segments={[
              { label: "Completed", value: outcome.completed, className: "bg-emerald-500" },
              { label: "Unanswered", value: outcome.unanswered, className: "bg-slate-400" },
              { label: "Failed", value: outcome.failed, className: "bg-red-500" },
            ]}
          />
        </Panel>

        <Panel title="Calls by language" description="Share of calls attempted">
          <BarList items={data.languages} valueFormatter={formatNumber} barClassName="bg-blue-600" />
        </Panel>

        <Panel title="Daily call attempts" description="Last seven days" className="xl:col-span-2">
          <ColumnChart items={data.weeklyAttempts} />
        </Panel>

        <Panel title="Language switching" description="How conversations handled a change of language">
          <dl className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <dt className="text-slate-600">Switches detected</dt>
              <dd className="font-semibold tabular-nums text-slate-900">{switching.switchesDetected}</dd>
            </div>
            <div className="flex items-center justify-between text-sm">
              <dt className="text-slate-600">Continued by AI assistant</dt>
              <dd className="font-semibold tabular-nums text-slate-900">
                {switching.continuedWithoutEscalation}
                <span className="ml-1 text-xs font-normal text-slate-500">
                  {percent(switching.continuedWithoutEscalation, switching.switchesDetected)}
                </span>
              </dd>
            </div>
            <div className="flex items-center justify-between text-sm">
              <dt className="text-slate-600">Handed to a human</dt>
              <dd className="font-semibold tabular-nums text-slate-900">
                {switching.handedToHuman}
                <span className="ml-1 text-xs font-normal text-slate-500">
                  {percent(switching.handedToHuman, switching.switchesDetected)}
                </span>
              </dd>
            </div>
          </dl>
        </Panel>
      </div>
    </>
  );
}
