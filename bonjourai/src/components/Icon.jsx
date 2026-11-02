import { createElement } from "react";

const ICONS = {
  overview: [
    { tag: "rect", x: 3, y: 3, width: 7, height: 9, rx: 1 },
    { tag: "rect", x: 14, y: 3, width: 7, height: 5, rx: 1 },
    { tag: "rect", x: 14, y: 12, width: 7, height: 9, rx: 1 },
    { tag: "rect", x: 3, y: 16, width: 7, height: 5, rx: 1 },
  ],
  borrowers: [
    { tag: "circle", cx: 9, cy: 7, r: 4 },
    { tag: "path", d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" },
    { tag: "path", d: "M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" },
  ],
  campaigns: [
    { tag: "path", d: "M3 11l18-5v12L3 14v-3z" },
    { tag: "path", d: "M11.6 16.8a3 3 0 1 1-5.8-1.6" },
  ],
  live: [
    { tag: "path", d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" },
  ],
  history: [
    { tag: "circle", cx: 12, cy: 12, r: 10 },
    { tag: "polyline", points: "12 6 12 12 16 14" },
  ],
  analytics: [
    { tag: "path", d: "M3 3v18h18" },
    { tag: "path", d: "M18 17V9M13 17V5M8 17v-3" },
  ],
  settings: [
    { tag: "path", d: "M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" },
  ],
  search: [
    { tag: "circle", cx: 11, cy: 11, r: 8 },
    { tag: "path", d: "m21 21-4.35-4.35" },
  ],
  menu: [{ tag: "path", d: "M4 6h16M4 12h16M4 18h16" }],
  chevron: [{ tag: "polyline", points: "6 9 12 15 18 9" }],
  close: [{ tag: "path", d: "M18 6 6 18M6 6l12 12" }],
  check: [{ tag: "polyline", points: "20 6 9 17 4 12" }],
  alert: [
    { tag: "path", d: "M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" },
    { tag: "path", d: "M12 9v4M12 17h.01" },
  ],
  logout: [
    { tag: "path", d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" },
    { tag: "polyline", points: "16 17 21 12 16 7" },
    { tag: "path", d: "M21 12H9" },
  ],
  user: [
    { tag: "circle", cx: 12, cy: 8, r: 4 },
    { tag: "path", d: "M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" },
  ],
  plus: [{ tag: "path", d: "M12 5v14M5 12h14" }],
  pause: [
    { tag: "rect", x: 6, y: 4, width: 4, height: 16 },
    { tag: "rect", x: 14, y: 4, width: 4, height: 16 },
  ],
  play: [{ tag: "polygon", points: "6 4 20 12 6 20 6 4" }],
  globe: [
    { tag: "circle", cx: 12, cy: 12, r: 10 },
    { tag: "path", d: "M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z" },
  ],
  info: [
    { tag: "circle", cx: 12, cy: 12, r: 10 },
    { tag: "path", d: "M12 16v-4M12 8h.01" },
  ],
};

export default function Icon({ name, className = "h-5 w-5" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {(ICONS[name] ?? []).map(({ tag, ...attributes }, index) =>
        createElement(tag, { key: index, ...attributes }),
      )}
    </svg>
  );
}
