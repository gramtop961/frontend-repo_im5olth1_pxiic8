import { X, Play, Plus, Check } from "lucide-react";

export default function DetailsModal({ open, item, onClose, onToggleList, inList }) {
  if (!open || !item) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative z-10 w-full max-w-3xl overflow-hidden rounded-xl bg-zinc-900 text-white shadow-2xl">
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-white/10 p-2 hover:bg-white/20"
        >
          <X size={20} />
        </button>
        <div className="relative h-64 w-full bg-black">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
        </div>
        <div className="space-y-4 p-6">
          <h3 className="text-2xl font-bold">{item.title}</h3>
          <p className="text-sm text-zinc-300">
            Dive into this featured title on Imaxflix. Enjoy stunning stories across genres with immersive visuals and sound.
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded bg-white px-4 py-2 font-semibold text-black hover:bg-gray-200">
              <Play size={18} /> Play
            </button>
            <button
              onClick={() => onToggleList?.(item)}
              className="inline-flex items-center gap-2 rounded bg-white/10 px-4 py-2 font-semibold text-white hover:bg-white/20"
            >
              {inList ? <Check size={18} /> : <Plus size={18} />}
              {inList ? "In My List" : "Add to My List"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
