import { useMemo, useState, useCallback } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Row from "./components/Row";
import Footer from "./components/Footer";
import DetailsModal from "./components/DetailsModal";

export default function App() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [myList, setMyList] = useState([]);

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

  const onSelect = useCallback((item) => {
    setSelected(item);
    setOpen(true);
  }, []);

  const toggleList = useCallback((item) => {
    setMyList((prev) => {
      const exists = prev.find((x) => x.id === item.id);
      if (exists) return prev.filter((x) => x.id !== item.id);
      return [...prev, item];
    });
  }, []);

  const inList = !!(selected && myList.find((x) => x.id === selected.id));

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="pt-16">
        <Hero />
        {myList.length > 0 && (
          <section id="my-list">
            <Row title="My List" items={myList} onSelect={onSelect} />
          </section>
        )}
        {rows.map((r) => (
          <Row key={r.title} title={r.title} items={r.items} onSelect={onSelect} />
        ))}
      </main>
      <Footer />

      <DetailsModal
        open={open}
        item={selected}
        onClose={() => setOpen(false)}
        onToggleList={toggleList}
        inList={inList}
      />
    </div>
  );
}
