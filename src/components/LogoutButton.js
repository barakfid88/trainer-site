"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-zinc-400 hover:text-red-400 border border-zinc-800 hover:border-red-900 rounded-full px-4 py-2 transition-colors"
    >
      התנתק
    </button>
  );
}
