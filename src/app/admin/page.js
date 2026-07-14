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

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-10">
        <div>
          <p className="text-orange-500 font-bold tracking-widest text-sm mb-2">
            איזור מנהל
          </p>
          <h1 className="text-3xl font-bold text-white">
            תוכניות אימונים
          </h1>
        </div>
        <LogoutButton />
      </div>

      {error && (
        <div className="bg-red-950 border border-red-800 text-red-300 rounded-xl p-4 mb-6 text-sm">
          שגיאה בטעינת הנתונים: {error.message}
        </div>
      )}

      <AddWeekForm nextWeekNumber={nextWeekNumber} />

      {weeks?.length === 0 && (
        <p className="text-zinc-500 text-center py-10">
          עדיין אין שבועות בתוכנית - הוסף שבוע ראשון למעלה כדי להתחיל.
        </p>
      )}

      {weeks?.map((week) => (
        <WeekSection key={week.id} week={week} />
      ))}
    </div>
  );
}
