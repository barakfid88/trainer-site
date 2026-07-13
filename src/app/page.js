import Link from "next/link";

export default function Home() {
  return (
    <div>
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-32 bg-gradient-to-br from-zinc-900 via-zinc-900 to-orange-900 text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1600&q=80')",
          }}
        />
        <div className="relative">
          <p className="text-orange-500 font-bold tracking-widest text-sm mb-3">
            YOU CAN DO IT
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            בואו נבנה יחד את הגרסה הכי טובה שלכם
          </h1>
          <p className="text-lg text-zinc-300 max-w-2xl mx-auto mb-8">
            אני ברק, מאמן כושר אישי. אני עוזר לאנשים להשיג את המטרות שלהם
            בחדר הכושר - בין אם זו ירידה במשקל, בניית מסת שריר, או פשוט
            הרגלים בריאים יותר.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-orange-500 text-white px-8 py-3 rounded-full font-medium hover:bg-orange-400 transition-colors"
          >
            צור קשר עכשיו
          </Link>
        </div>
      </section>
    </div>
  );
}
