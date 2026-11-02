import Icon from "./Icon";

const EVENT_TONES = {
  info: "text-blue-700 bg-blue-50",
  success: "text-emerald-700 bg-emerald-50",
  warning: "text-amber-800 bg-amber-50",
  danger: "text-red-700 bg-red-50",
};

export function LanguageChangeMarker({ language, from }) {
  return (
    <div className="flex items-center gap-3 py-1" role="status">
      <div className="h-px flex-1 bg-amber-300" />
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-800 ring-1 ring-inset ring-amber-600/25">
        <Icon name="globe" className="h-3.5 w-3.5" />
        Language changed{from ? ` from ${from}` : ""} to {language}
      </span>
      <div className="h-px flex-1 bg-amber-300" />
    </div>
  );
}

export function TranscriptMessage({ message, previousLanguage }) {
  const isAi = message.speaker === "ai";
  return (
    <div className="space-y-1">
      {message.languageChanged && <LanguageChangeMarker language={message.language} from={previousLanguage} />}
      <div className={`flex ${isAi ? "justify-start" : "justify-end"}`}>
        <div className={`max-w-[85%] rounded-lg px-3.5 py-2.5 text-sm leading-6 ${isAi ? "bg-blue-50 text-slate-800" : "border border-slate-200 bg-white text-slate-800"}`}>
          <div className="mb-1 flex flex-wrap items-center gap-2 text-xs">
            <span className={`font-semibold ${isAi ? "text-blue-700" : "text-slate-700"}`}>
              {isAi ? "BonjourAI (automated AI assistant)" : "Borrower"}
            </span>
            <span className="text-slate-500">{message.at}</span>
            <span className="rounded bg-slate-100 px-1.5 py-0.5 text-slate-600">{message.language}</span>
          </div>
          <p>{message.text}</p>
        </div>
      </div>
    </div>
  );
}

export default function CallTranscript({ messages, emptyText = "No conversation yet." }) {
  if (messages.length === 0) {
    return <p className="py-10 text-center text-sm text-slate-500">{emptyText}</p>;
  }
  return (
    <div className="space-y-3">
      {messages.map((message, index) => (
        <TranscriptMessage
          key={`${message.at}-${index}`}
          message={message}
          previousLanguage={index > 0 ? messages[index - 1].language : null}
        />
      ))}
    </div>
  );
}

export function EventTimeline({ events, emptyText = "No events recorded yet." }) {
  if (events.length === 0) {
    return <p className="text-sm text-slate-500">{emptyText}</p>;
  }
  return (
    <ol className="relative space-y-4 border-l border-slate-200 pl-5">
      {events.map((event, index) => (
        <li key={`${event.at}-${index}`} className="relative">
          <span className="absolute -left-[25px] top-1.5 h-2.5 w-2.5 rounded-full bg-slate-400 ring-4 ring-white" aria-hidden="true" />
          <p className="text-xs tabular-nums text-slate-500">{event.at}</p>
          <p className={`mt-0.5 inline-block rounded px-1.5 py-0.5 text-sm ${EVENT_TONES[event.tone] ?? EVENT_TONES.info}`}>
            {event.text}
          </p>
        </li>
      ))}
    </ol>
  );
}
