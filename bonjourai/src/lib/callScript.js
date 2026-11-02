const TRACKED_FIELDS = ["language", "state", "intent", "action", "escalation", "optedOut"];

const INITIAL_SNAPSHOT = {
  language: null,
  state: "Connecting",
  intent: "Not detected yet",
  action: "Dialing borrower",
  escalation: "None",
  optedOut: false,
};

const pad = (value) => String(value).padStart(2, "0");

function stepTimestamp(index) {
  const seconds = 4 + index * 13;
  return `${pad(Math.floor(seconds / 60))}:${pad(seconds % 60)}`;
}

export function getSnapshot(steps, count) {
  return steps.slice(0, count).reduce((snapshot, step) => {
    const changes = Object.fromEntries(
      TRACKED_FIELDS.filter((field) => field in step).map((field) => [field, step[field]]),
    );
    return { ...snapshot, ...changes };
  }, INITIAL_SNAPSHOT);
}

export function getTranscript(steps, count) {
  return steps.slice(0, count).map((step, index) => ({
    ...step,
    at: stepTimestamp(index),
    languageChanged: index > 0 && steps[index - 1].language !== step.language,
  }));
}

export function getEvents(steps, count) {
  return steps
    .slice(0, count)
    .map((step, index) => (step.event ? { ...step.event, at: stepTimestamp(index) } : null))
    .filter(Boolean);
}
