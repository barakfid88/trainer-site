import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/LogoutButton";
import WeekSection from "@/components/admin/WeekSection";
import AddWeekForm from "@/components/admin/AddWeekForm";

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: weeks, error } = await supabase
    .from("workout_weeks")
    .select("*, exercises(*)")
    .order("week_number", { ascending: true })
    .order("created_at", { foreignTable: "exercises", ascending: true });

  const nextWeekNumber = (weeks?.length ?? 0) + 1;
  const totalExercises =
    weeks?.reduce((sum, w) => sum + (w.exercises?.length ?? 0), 0) ?? 0;

  return (
    <div className="relative min-h-[calc(100vh-64px)] overflow-hidden">
      <div className="pointer-events-none absolute -top-40 right-1/3 w-[36rem] h-[36rem] bg-orange-600/10 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-6 py-16">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-xl shrink-0">
              🏋️
            </div>
            <div>
              <p className="text-orange-500 font-bold tracking-widest text-xs mb-1">
                איזור מנהל · {user?.email}
              </p>
              <h1 className="text-3xl font-extrabold text-white">
                תוכניות אימונים
              </h1>
            </div>
          </div>
          <LogoutButton />
        </div>

        <div className="flex gap-3 mb-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm">
            <span className="text-white font-bold">{weeks?.length ?? 0}</span>
            <span className="text-zinc-500"> שבועות</span>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm">
            <span className="text-white font-bold">{totalExercises}</span>
            <span className="text-zinc-500"> תרגילים</span>
          </div>
        </div>

        {error && (
          <div className="bg-red-950 border border-red-800 text-red-300 rounded-xl p-4 mb-6 text-sm">
            שגיאה בטעינת הנתונים: {error.message}
          </div>
        )}

        <AddWeekForm nextWeekNumber={nextWeekNumber} />

        {weeks?.length === 0 && (
          <div className="text-center py-16 text-zinc-500">
            <div className="text-4xl mb-3">📋</div>
            עדיין אין שבועות בתוכנית - הוסף שבוע ראשון למעלה כדי להתחיל.
          </div>
        )}

        {weeks?.map((week) => (
          <WeekSection key={week.id} week={week} />
        ))}
      </div>
    </div>
  );
}
