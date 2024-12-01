import AboutPage from "@/components/about";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
  ssr: true,
  beforeLoad: () => {
    document.title = 'About | React Local';
  }
});

function About() {
  return <AboutPage />;
}
