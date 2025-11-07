import { Search, Bell, User } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <a href="#" className="text-2xl font-extrabold tracking-tight text-white">
            <span className="text-red-600">Imax</span>flix
          </a>
          <nav className="hidden gap-6 text-sm text-gray-200 md:flex">
            <a className="hover:text-white" href="#home">Home</a>
            <a className="hover:text-white" href="#series">Series</a>
            <a className="hover:text-white" href="#films">Films</a>
            <a className="hover:text-white" href="#new">New & Popular</a>
            <a className="hover:text-white" href="#my-list">My List</a>
          </nav>
        </div>
        <div className="flex items-center gap-4 text-gray-200">
          <button aria-label="Search" className="rounded p-2 hover:bg-white/10">
            <Search size={20} />
          </button>
          <button aria-label="Notifications" className="rounded p-2 hover:bg-white/10">
            <Bell size={20} />
          </button>
          <div className="flex items-center gap-2 rounded bg-white/10 px-2 py-1">
            <User size={18} />
            <span className="text-sm">Profile</span>
          </div>
        </div>
      </div>
    </header>
  );
}
