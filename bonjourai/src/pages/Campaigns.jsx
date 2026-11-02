import { useState } from "react";
import PageHeader from "../components/PageHeader";
import Panel from "../components/Panel";
import DataTable from "../components/DataTable";
import StatusBadge from "../components/StatusBadge";
import Modal from "../components/Modal";
import Icon from "../components/Icon";
import CreateCampaignModal from "../components/CreateCampaignModal";
import { ErrorState } from "../components/AsyncState";
import useAsyncData from "../hooks/useAsyncData";
import { fetchCampaigns } from "../services/api";
import { formatDate, formatNumber } from "../lib/format";

function scheduleLabel(campaign) {
  const range = campaign.startDate
    ? campaign.endDate
      ? `${formatDate(campaign.startDate)} to ${formatDate(campaign.endDate)}`
      : `From ${formatDate(campaign.startDate)}`
    : "Not scheduled";
  return { window: `${campaign.window}, ${campaign.days}`, range };
}

function PauseConfirmation({ campaign, onCancel, onConfirm }) {
  const pausing = campaign.status === "Active";
  return (
    <Modal
      open
      size="md"
      title={pausing ? "Pause campaign?" : "Resume campaign?"}
      description={campaign.name}
      onClose={onCancel}
      footer={
        <>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`rounded-md px-4 py-2 text-sm font-medium text-white transition-colors ${pausing ? "bg-slate-800 hover:bg-slate-900" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {pausing ? "Pause campaign" : "Resume campaign"}
          </button>
        </>
      }
    >
      <p className="text-sm text-slate-600">
        {pausing
          ? "No new reminder calls will be scheduled for this campaign until it is resumed."
          : "Reminder calls for this campaign will be scheduled again within its calling window."}{" "}
        This is a simulated action in the demo.
      </p>
    </Modal>
  );
}

export default function Campaigns() {
  const { data, loading, error, reload } = useAsyncData(fetchCampaigns);
  const [createdCampaigns, setCreatedCampaigns] = useState([]);
  const [statusOverrides, setStatusOverrides] = useState({});
  const [createOpen, setCreateOpen] = useState(false);
  const [pendingToggle, setPendingToggle] = useState(null);
  const [notice, setNotice] = useState(null);

  const campaigns = [...createdCampaigns, ...(data ?? [])].map((campaign) => ({
    ...campaign,
    status: statusOverrides[campaign.id] ?? campaign.status,
  }));

  const confirmToggle = () => {
    const nextStatus = pendingToggle.status === "Active" ? "Paused" : "Active";
    setStatusOverrides((overrides) => ({ ...overrides, [pendingToggle.id]: nextStatus }));
    setNotice(`"${pendingToggle.name}" is now ${nextStatus.toLowerCase()}.`);
    setPendingToggle(null);
  };

  const columns = [
    {
      key: "name",
      header: "Campaign",
      render: (campaign) => (
        <div>
          <p className="font-medium text-slate-900">{campaign.name}</p>
          <p className="text-xs text-slate-500">{campaign.id}</p>
        </div>
      ),
    },
    {
      key: "targetCount",
      header: "Target borrowers",
      render: (campaign) => formatNumber(campaign.targetCount),
    },
    { key: "language", header: "Language", render: (campaign) => campaign.language },
    {
      key: "schedule",
      header: "Schedule",
      render: (campaign) => {
        const schedule = scheduleLabel(campaign);
        return (
          <div>
            <p className="text-slate-900">{schedule.window}</p>
            <p className="text-xs text-slate-500">{schedule.range}</p>
          </div>
        );
      },
    },
    {
      key: "status",
      header: "Status",
      render: (campaign) => <StatusBadge status={campaign.status} />,
    },
    {
      key: "completedCalls",
      header: "Completed calls",
      render: (campaign) => formatNumber(campaign.completedCalls),
    },
    {
      key: "actions",
      header: "Actions",
      cellClassName: "text-right",
      render: (campaign) =>
        campaign.status === "Active" || campaign.status === "Paused" ? (
          <button
            type="button"
            onClick={() => setPendingToggle(campaign)}
            className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100"
          >
            <Icon name={campaign.status === "Active" ? "pause" : "play"} className="h-4 w-4" />
            {campaign.status === "Active" ? "Pause" : "Resume"}
          </button>
        ) : (
          <span className="text-xs text-slate-400">No actions</span>
        ),
    },
  ];

  return (
    <>
      <PageHeader
        title="Campaigns"
        description="Plan and monitor simulated repayment reminder campaigns."
        actions={
          <button
            type="button"
            onClick={() => setCreateOpen(true)}
            className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
          >
            <Icon name="plus" className="h-4 w-4" />
            Create campaign
          </button>
        }
      />

      {notice && (
        <div role="status" className="flex items-center justify-between gap-3 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <span>{notice}</span>
          <button type="button" onClick={() => setNotice(null)} className="text-emerald-700 hover:text-emerald-900">
            Dismiss
          </button>
        </div>
      )}

      <Panel>
        {error ? (
          <ErrorState onRetry={reload} message="We could not load campaigns." />
        ) : (
          <DataTable
            columns={columns}
            rows={campaigns}
            getRowKey={(campaign) => campaign.id}
            loading={loading}
            emptyTitle="No campaigns yet"
            emptyDescription="Create a campaign to schedule simulated reminder calls."
          />
        )}
      </Panel>

      {createOpen && (
        <CreateCampaignModal
          onClose={() => setCreateOpen(false)}
          onCreate={(campaign) => {
            setCreatedCampaigns((list) => [campaign, ...list]);
            setNotice(`"${campaign.name}" was created as a simulated campaign.`);
          }}
        />
      )}

      {pendingToggle && (
        <PauseConfirmation
          campaign={pendingToggle}
          onCancel={() => setPendingToggle(null)}
          onConfirm={confirmToggle}
        />
      )}
    </>
  );
}
