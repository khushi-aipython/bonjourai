import { useCallback, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/Dashboard";
import Borrowers from "./pages/Borrowers";
import Campaigns from "./pages/Campaigns";
import LiveCalls from "./pages/LiveCalls";
import CallHistory from "./pages/CallHistory";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import { NAV_ITEMS, getPageFromHash } from "./lib/navigation";

const PAGE_VIEWS = {
  overview: Dashboard,
  borrowers: Borrowers,
  campaigns: Campaigns,
  "live-calls": LiveCalls,
  "call-history": CallHistory,
  analytics: Analytics,
  settings: Settings,
};

export default function App() {
  const [pageKey, setPageKey] = useState(getPageFromHash);
  const [search, setSearch] = useState("");
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => setPageKey(getPageFromHash());
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigate = useCallback((key) => {
    window.location.hash = `/${key}`;
    setNavOpen(false);
    window.scrollTo(0, 0);
  }, []);

  const PageView = PAGE_VIEWS[pageKey];
  const pageLabel = NAV_ITEMS.find((item) => item.key === pageKey)?.label;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Sidebar activeKey={pageKey} onNavigate={navigate} open={navOpen} onClose={() => setNavOpen(false)} />

      <div className="lg:pl-60">
        <Topbar
          breadcrumb={pageLabel}
          search={search}
          onSearchChange={setSearch}
          onSearchSubmit={() => navigate("borrowers")}
          onMenuClick={() => setNavOpen(true)}
          onNavigate={navigate}
        />

        <main className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
          <PageView search={search} onSearchChange={setSearch} onNavigate={navigate} />
        </main>
      </div>
    </div>
  );
}
