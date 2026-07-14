import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-zinc-950 text-white print:hidden">
      <nav className="max-w-4xl mx-auto flex flex-col items-center gap-3 px-6 py-4">
        <span className="text-lg font-bold text-orange-500">
          ברק | מאמן כושר
        </span>
        <div className="flex gap-8 text-sm">
          <Link href="/" className="hover:text-orange-400 transition-colors">
            בית
          </Link>
          <Link
            href="/about"
            className="hover:text-orange-400 transition-colors"
          >
            אודות
          </Link>
          <Link
            href="/services"
            className="hover:text-orange-400 transition-colors"
          >
            שירותים
          </Link>
          <Link
            href="/contact"
            className="hover:text-orange-400 transition-colors"
          >
            צור קשר
          </Link>
        </div>
      </nav>
    </header>
  );
}
