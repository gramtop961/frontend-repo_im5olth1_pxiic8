import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Row({ title, items = [], onSelect }) {
  const scrollerRef = useRef(null);
  const [showNav, setShowNav] = useState(false);

  // Drag-to-scroll (mouse and touch)
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

  const scrollByAmount = (dir) => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.9);
    el.scrollTo({ left: el.scrollLeft + (dir === "left" ? -amount : amount), behavior: "smooth" });
  };

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: { staggerChildren: 0.06, delayChildren: 0.1 },
      },
    }),
    []
  );

  const itemVariants = useMemo(
    () => ({ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }),
    []
  );

  return (
    <section
      className="group relative w-full py-6"
      onMouseEnter={() => setShowNav(true)}
      onMouseLeave={() => setShowNav(false)}
    >
      <h2 className="px-6 text-xl font-semibold text-white md:px-8">{title}</h2>

      {/* Gradient edge fades (Netflix-like) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Nav arrows */}
      <AnimatePresence>
        {showNav && (
          <>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-label="Scroll left"
              onClick={() => scrollByAmount("left")}
              className="absolute left-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-black/60 p-2 text-white shadow md:inline-flex hover:bg-black/80"
            >
              <ChevronLeft size={22} />
            </motion.button>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-label="Scroll right"
              onClick={() => scrollByAmount("right")}
              className="absolute right-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-black/60 p-2 text-white shadow md:inline-flex hover:bg-black/80"
            >
              <ChevronRight size={22} />
            </motion.button>
          </>
        )}
      </AnimatePresence>

      <motion.div
        ref={scrollerRef}
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="no-scrollbar mt-3 flex gap-3 overflow-x-auto px-6 pb-2 md:px-8"
      >
        {items.map((item, idx) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            className="relative h-40 w-64 shrink-0"
          >
            <button
              type="button"
              onClick={() => onSelect?.(item)}
              className="group/card peer relative block h-full w-full overflow-hidden rounded-md bg-zinc-800 text-left focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover/card:scale-110"
              />
              {/* top and bottom gradients */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Hover lift card to mimic Netflix preview */}
              <div className="absolute inset-0 z-10 scale-100 opacity-0 transition-all duration-300 ease-out group-hover/card:opacity-100 group-hover/card:shadow-2xl">
                <div className="absolute -inset-3 -top-6 -bottom-10 z-0 rounded-lg bg-transparent transition-transform duration-300 group-hover/card:scale-[1.03]" />
              </div>

              {/* Title + quick actions on hover */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 p-3 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100">
                <p className="pointer-events-none line-clamp-1 text-sm font-semibold text-white drop-shadow">
                  {item.title}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white px-2 py-1 text-xs font-semibold text-black">
                    <Play size={14} /> Play
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-1 text-xs font-semibold text-white backdrop-blur">
                    <Plus size={14} /> My List
                  </span>
                </div>
              </div>
            </button>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
