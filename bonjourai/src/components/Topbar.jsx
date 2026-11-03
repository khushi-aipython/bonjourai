import { useEffect, useState } from "react";
import Icon from "./Icon";
import { EMPLOYEE } from "../lib/constants";

export default function Topbar({ breadcrumb, search, onSearchChange, onSearchSubmit, onMenuClick, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [signOutNotice, setSignOutNotice] = useState(false);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const handleClick = (event) => {
      if (!event.target.closest("[data-profile-menu]")) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/95 px-4 backdrop-blur sm:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Open navigation"
        className="rounded-md p-2 text-slate-600 transition-colors hover:bg-slate-100 md:hidden"
      >
        <Icon name="menu" />
      </button>

      <nav aria-label="Breadcrumb" className="hidden min-w-0 items-center gap-2 text-sm md:flex">
        <span className="text-slate-500">Operations</span>
        <Icon name="chevron" className="h-4 w-4 -rotate-90 text-slate-400" />
        <span className="truncate font-medium text-slate-900" aria-current="page">
          {breadcrumb}
        </span>
      </nav>

      <form
        className="ml-auto flex max-w-xs flex-1 items-center md:ml-6 md:max-w-sm"
        onSubmit={(event) => {
          event.preventDefault();
          onSearchSubmit();
        }}
        role="search"
      >
        <div className="relative w-full">
          <Icon name="search" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search borrowers by name or ID"
            aria-label="Search borrowers"
            className="w-full rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </form>

      <span className="hidden shrink-0 items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold tracking-wide text-white sm:inline-flex">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-400" aria-hidden="true" />
        DEMO MODE
      </span>

      <div className="relative" data-profile-menu>
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
          className="flex items-center gap-2 rounded-md p-1 pr-2 transition-colors hover:bg-slate-100"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-700">
            {EMPLOYEE.initials}
          </span>
          <span className="hidden text-left sm:block">
            <span className="block text-sm font-medium text-slate-900">{EMPLOYEE.name}</span>
            <span className="block text-xs text-slate-500">{EMPLOYEE.role}</span>
          </span>
          <Icon name="chevron" className="hidden h-4 w-4 text-slate-400 sm:block" />
        </button>

        {menuOpen && (
          <div role="menu" className="absolute right-0 mt-2 w-56 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
            <div className="border-b border-slate-100 px-3 py-2 sm:hidden">
              <p className="text-sm font-medium text-slate-900">{EMPLOYEE.name}</p>
              <p className="text-xs text-slate-500">{EMPLOYEE.role}</p>
            </div>
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setMenuOpen(false);
                onNavigate("settings");
              }}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              <Icon name="user" className="h-4 w-4" />
              Profile and settings
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={() => setSignOutNotice(true)}
              className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              <Icon name="logout" className="h-4 w-4" />
              Sign out
            </button>
            {signOutNotice && (
              <p className="px-3 pb-2 pt-1 text-xs text-slate-500">Sign-in is not connected in this demo.</p>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
