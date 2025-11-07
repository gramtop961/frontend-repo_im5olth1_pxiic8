import { useMemo } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Row from "./components/Row";
import Footer from "./components/Footer";

export default function App() {
  const rows = useMemo(() => {
    const sample = (seed) =>
      Array.from({ length: 15 }).map((_, i) => ({
        id: `${seed}-${i}`,
        title: `Title ${i + 1}`,
        image: `https://picsum.photos/seed/${seed}-${i}/600/400`,
      }));
    return [
      { title: "Trending Now", items: sample("trending") },
      { title: "Top Picks for You", items: sample("top") },
      { title: "New Releases", items: sample("new") },
      { title: "Critically Acclaimed", items: sample("critics") },
    ];
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="pt-16">
        <Hero />
        {rows.map((r) => (
          <Row key={r.title} title={r.title} items={r.items} />
        ))}
      </main>
      <Footer />
    </div>
  );
}
