"use client";

import { useTransition } from "react";
import { deleteAllWeeks } from "@/app/admin/actions";

export default function DeleteAllButton() {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    const confirmed = window.confirm(
      "למחוק את כל התוכנית? כל השבועות, האימונים והתרגילים יימחקו לצמיתות ולא ניתן יהיה לשחזר."
    );
    if (!confirmed) return;

    startTransition(() => {
      deleteAllWeeks();
    });
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="text-sm text-red-500/80 hover:text-red-400 border border-red-900/50 hover:border-red-800 rounded-full px-4 py-2 transition-colors disabled:opacity-50"
    >
      {isPending ? "מוחק..." : "🗑️ מחק תוכנית"}
    </button>
  );
}
