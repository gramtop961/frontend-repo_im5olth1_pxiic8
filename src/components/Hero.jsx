import { Play, Info } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[80vh] w-full overflow-hidden bg-black">
      <img
        src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?q=80&w=2070&auto=format&fit=crop"
        alt="Featured"
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="mb-4 text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
            Watch unlimited movies and series on Imaxflix
          </h1>
          <p className="mb-8 text-lg text-gray-200">
            Your cinematic universe. Stream trending titles, discover hidden gems, and build your perfect list.
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded bg-white px-5 py-3 font-semibold text-black hover:bg-gray-200">
              <Play size={20} />
              Play
            </button>
            <button className="inline-flex items-center gap-2 rounded bg-white/20 px-5 py-3 font-semibold text-white backdrop-blur hover:bg-white/30">
              <Info size={20} />
              More Info
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
