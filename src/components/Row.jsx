import { useEffect, useRef } from "react";

export default function Row({ title, items = [] }) {
  const scrollerRef = useRef(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onDown = (e) => {
      isDown = true;
      startX = (e.pageX || e.touches?.[0]?.pageX || 0) - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };
    const onLeave = () => (isDown = false);
    const onUp = () => (isDown = false);
    const onMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = (e.pageX || e.touches?.[0]?.pageX || 0) - el.offsetLeft;
      const walk = (x - startX) * 2;
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener("mousedown", onDown);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mouseup", onUp);
    el.addEventListener("mousemove", onMove, { passive: false });

    el.addEventListener("touchstart", onDown, { passive: true });
    el.addEventListener("touchend", onUp);
    el.addEventListener("touchmove", onMove, { passive: false });

    return () => {
      el.removeEventListener("mousedown", onDown);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mouseup", onUp);
      el.removeEventListener("mousemove", onMove);

      el.removeEventListener("touchstart", onDown);
      el.removeEventListener("touchend", onUp);
      el.removeEventListener("touchmove", onMove);
    };
  }, []);

  return (
    <section className="relative w-full py-6">
      <h2 className="px-6 text-xl font-semibold text-white md:px-8">{title}</h2>
      <div
        ref={scrollerRef}
        className="no-scrollbar mt-3 flex gap-3 overflow-x-auto px-6 pb-2 md:px-8"
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="group relative h-40 w-72 shrink-0 overflow-hidden rounded-lg bg-gray-800"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 text-sm font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
