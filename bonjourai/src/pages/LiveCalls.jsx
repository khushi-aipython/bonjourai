import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import Panel from "../components/Panel";
import StatusBadge from "../components/StatusBadge";
import Icon from "../components/Icon";
import CallTranscript from "../components/CallTranscript";
import CallInsightsPanel from "../components/CallInsightsPanel";
import { ErrorState, LoadingState } from "../components/AsyncState";
import useAsyncData from "../hooks/useAsyncData";
import { fetchCallScenarios } from "../services/api";
import { formatDuration } from "../lib/format";
import { getEvents, getSnapshot, getTranscript } from "../lib/callScript";

const CONNECT_MS = 1600;
const STEP_MS = 2400;

const STATUS_LABELS = {
  idle: "Ready",
  connecting: "Connecting",
  in_progress: "In Progress",
  completed: "Completed",
};

export default function LiveCalls() {
  const { data: scenarios, loading, error, reload } = useAsyncData(fetchCallScenarios);
  const [selectedId, setSelectedId] = useState(null);
  const [status, setStatus] = useState("idle");
  const [revealed, setRevealed] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  const scenario = scenarios?.find((item) => item.id === (selectedId ?? scenarios[0]?.id)) ?? null;
  const steps = scenario?.steps ?? [];
  const total = steps.length;
  const callStatus = status === "in_progress" && revealed >= total ? "completed" : status;

  useEffect(() => {
    if (status !== "connecting") return undefined;
    const timer = setTimeout(() => setStatus("in_progress"), CONNECT_MS);
    return () => clearTimeout(timer);
  }, [status]);

  useEffect(() => {
    if (callStatus !== "in_progress") return undefined;
    const timer = setTimeout(() => setRevealed((count) => count + 1), STEP_MS);
    return () => clearTimeout(timer);
  }, [callStatus, revealed]);

  useEffect(() => {
    if (callStatus !== "in_progress") return undefined;
    const interval = setInterval(() => setElapsed((seconds) => seconds + 1), 1000);
    return () => clearInterval(interval);
  }, [callStatus]);

  const startTestCall = () => {
    setRevealed(0);
    setElapsed(0);
    setStatus("connecting");
  };

  const endCall = () => setStatus("completed");

  if (error) {
    return (
      <>
        <PageHeader title="Live Calls" description="Monitor automated reminder conversations." />
        <Panel>
          <ErrorState onRetry={reload} message="We could not load the call simulator." />
        </Panel>
      </>
    );
  }

  const isActive = callStatus === "connecting" || callStatus === "in_progress";
  const snapshot = getSnapshot(steps, revealed);
  const transcript = getTranscript(steps, revealed);
  const events = getEvents(steps, revealed);
  const languageChanges = transcript.filter((message) => message.languageChanged).length;

  return (
    <>
      <PageHeader
        title="Live Calls"
        description="Simulated test call. No real phone call is placed from this screen."
      />

      {loading ? (
        <Panel>
          <LoadingState rows={6} />
        </Panel>
      ) : (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
          <div className="space-y-4 xl:col-span-3">
            <Panel
              title="Call monitor"
              action={
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={scenario?.id ?? ""}
                    onChange={(event) => setSelectedId(event.target.value)}
                    disabled={isActive}
                    aria-label="Choose test call scenario"
                    className="max-w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:bg-slate-100 disabled:text-slate-400"
                  >
                    {scenarios.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                  {isActive ? (
                    <button
                      type="button"
                      onClick={endCall}
                      className="inline-flex items-center gap-2 rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
                    >
                      <Icon name="pause" className="h-4 w-4" />
                      End call
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={startTestCall}
                      className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                    >
                      <Icon name="play" className="h-4 w-4" />
                      {status === "idle" ? "Start test call" : "Start new test call"}
                    </button>
                  )}
                </div>
              }
            >
              <dl className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div>
                  <dt className="text-xs text-slate-500">Call status</dt>
                  <dd className="mt-1">
                    <StatusBadge status={STATUS_LABELS[callStatus]} tone={callStatus === "completed" ? "success" : undefined} />
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500">Borrower ID</dt>
                  <dd className="mt-1 text-sm font-medium tabular-nums text-slate-900">{scenario?.borrowerId ?? "--"}</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500">Duration</dt>
                  <dd className="mt-1 text-sm font-medium tabular-nums text-slate-900">{formatDuration(elapsed)}</dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-500">Language detected</dt>
                  <dd className="mt-1 text-sm font-medium text-slate-900">{snapshot.language ?? "Detecting"}</dd>
                </div>
              </dl>
              <p className="mt-4 flex items-start gap-2 rounded-md bg-blue-50 px-3 py-2 text-xs text-blue-800">
                <Icon name="info" className="mt-px h-4 w-4 shrink-0" />
                The automated assistant identifies itself as an AI assistant at the start of every call.
              </p>
            </Panel>

            <Panel title="Conversation transcript" description="Alternating AI assistant and borrower messages">
              <div className="max-h-[28rem] overflow-y-auto pr-1">
                <CallTranscript
                  messages={transcript}
                  emptyText={
                    callStatus === "idle"
                      ? "Start a test call to see a simulated conversation."
                      : "Connecting to the borrower. Messages will appear here."
                  }
                />
              </div>
            </Panel>
          </div>

          <div className="xl:col-span-2">
            <CallInsightsPanel snapshot={snapshot} events={events} languageChanges={languageChanges} />
          </div>
        </div>
      )}
    </>
  );
}
