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
    <div className="max-w-sm mx-auto px-6 py-24">
      <div className="text-center mb-10">
        <p className="text-orange-500 font-bold tracking-widest text-sm mb-2">
          איזור מנהל
        </p>
        <h1 className="text-3xl font-bold text-white">התחברות</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 bg-zinc-900 border border-zinc-800 rounded-2xl p-8"
      >
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">
            אימייל
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="admin@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">
            סיסמה
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="••••••••"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="bg-orange-500 text-white px-6 py-3 rounded-full font-medium hover:bg-orange-400 transition-colors disabled:opacity-50"
        >
          {loading ? "מתחבר..." : "התחבר"}
        </button>
      </form>
    </div>
  );
}
