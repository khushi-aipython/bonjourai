export function BarList({ items, valueFormatter = (value) => value, barClassName = "bg-blue-600" }) {
  const max = Math.max(...items.map((item) => item.value), 1);
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.label}>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="text-slate-700">{item.label}</span>
            <span className="font-medium tabular-nums text-slate-900">{valueFormatter(item.value)}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full transition-all duration-500 ${barClassName}`}
              style={{ width: `${(item.value / max) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function StackedBar({ segments }) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0) || 1;
  return (
    <div>
      <div className="flex h-3 overflow-hidden rounded-full bg-slate-100">
        {segments.map((segment) => (
          <div
            key={segment.label}
            className={`h-full transition-all duration-500 ${segment.className}`}
            style={{ width: `${(segment.value / total) * 100}%` }}
            title={`${segment.label}: ${segment.value}`}
          />
        ))}
      </div>
      <ul className="mt-4 grid grid-cols-3 gap-3">
        {segments.map((segment) => (
          <li key={segment.label}>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className={`h-2.5 w-2.5 rounded-sm ${segment.className}`} aria-hidden="true" />
              {segment.label}
            </div>
            <p className="mt-1 text-lg font-semibold tabular-nums text-slate-900">
              {segment.value}
              <span className="ml-1 text-xs font-normal text-slate-500">
                {Math.round((segment.value / total) * 100)}%
              </span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ColumnChart({ items }) {
  const max = Math.max(...items.map((item) => item.value), 1);
  return (
    <div className="flex h-56 items-end gap-3">
      {items.map((item) => (
        <div key={item.label} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
          <span className="text-xs font-medium tabular-nums text-slate-700">{item.value}</span>
          <div
            className="w-full max-w-12 rounded-t-md bg-blue-600/90 transition-all duration-500"
            style={{ height: `${(item.value / max) * 100}%` }}
          />
          <span className="text-xs text-slate-500">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
