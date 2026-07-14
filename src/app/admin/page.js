import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/LogoutButton";

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-orange-500 font-bold tracking-widest text-sm mb-2">
            איזור מנהל
          </p>
          <h1 className="text-3xl font-bold text-white">
            שלום, {user?.email}
          </h1>
        </div>
        <LogoutButton />
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-zinc-400">
        כאן יופיע ניהול תוכניות האימונים לפי שבועות - זה השלב הבא שנבנה.
      </div>
    </div>
  );
}
