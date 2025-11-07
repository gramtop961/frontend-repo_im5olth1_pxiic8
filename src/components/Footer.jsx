export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/60 py-10 text-sm text-gray-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-6">Questions? Contact us.</p>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {[
            "FAQ",
            "Help Center",
            "Account",
            "Media Center",
            "Investor Relations",
            "Jobs",
            "Ways to Watch",
            "Terms of Use",
            "Privacy",
            "Cookie Preferences",
            "Corporate Information",
            "Contact Us",
          ].map((link) => (
            <li key={link}>
              <a href="#" className="hover:underline">
                {link}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-6">Imaxflix © {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
