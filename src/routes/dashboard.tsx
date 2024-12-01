import Dashboard from "@/components/dashboard.tsx";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: DashboardPage,
  ssr: true,
  beforeLoad: () => {
    document.title = 'Dashboard | React Local';
  }
});

function DashboardPage() {
  return <Dashboard />;
}