"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError("אימייל או סיסמה שגויים");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="relative min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-950 via-zinc-950 to-orange-950/40 px-6 py-16">
      {/* זוהר עדין ברקע - עיגול מטושטש בצבע כתום שנותן עומק לעמוד */}
      <div className="pointer-events-none absolute -top-40 right-1/2 translate-x-1/2 w-[36rem] h-[36rem] bg-orange-600/20 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-[size:24px_24px]" />

      <div className="relative w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mb-4 text-2xl">
            🔒
          </div>
          <p className="text-orange-500 font-bold tracking-widest text-sm mb-2">
            איזור מנהל
          </p>
          <h1 className="text-3xl font-extrabold text-white">התחברות</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 bg-zinc-900/80 backdrop-blur border border-zinc-800 rounded-2xl p-8 shadow-2xl shadow-black/40"
        >
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">
              אימייל
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-500 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1.5">
              סיסמה
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-500 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm bg-red-950/50 border border-red-900 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-orange-500 text-white px-6 py-3 rounded-full font-medium hover:bg-orange-400 hover:shadow-lg hover:shadow-orange-500/20 transition-all disabled:opacity-50 disabled:hover:shadow-none"
          >
            {loading ? "מתחבר..." : "התחבר"}
          </button>
        </form>
      </div>
    </div>
  );
}
