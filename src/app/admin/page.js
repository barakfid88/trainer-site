import Link from "next/link";
import { getWorkoutPlan } from "@/lib/getWorkoutPlan";
import LogoutButton from "@/components/LogoutButton";
import WeeksList from "@/components/admin/WeeksList";
import PrintButton from "@/components/admin/PrintButton";
import PlanView from "@/components/PlanView";
import DeleteAllButton from "@/components/admin/DeleteAllButton";
import { createClient } from "@/lib/supabase/server";

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // הפרופיל מחזיק את ה-slug הציבורי של המשתמש (למשל "barak" או "adam"),
  // כדי לדעת איזה קישור /plan/[slug] להציג לו.
  const { data: profile } = await supabase
    .from("profiles")
    .select("slug, display_name")
    .eq("id", user.id)
    .single();

  const { weeks, error } = await getWorkoutPlan(user.id, supabase);

  let totalWorkouts = 0;
  let totalExercises = 0;
  weeks?.forEach((w) => {
    totalWorkouts += w.workouts?.length ?? 0;
    w.workouts?.forEach((wo) => {
      totalExercises += wo.exercises?.length ?? 0;
    });
  });

  return (
    <div className="relative min-h-[calc(100vh-64px)] overflow-hidden">
      <div className="pointer-events-none absolute -top-40 right-1/3 w-[36rem] h-[36rem] bg-orange-600/10 rounded-full blur-3xl print:hidden" />
      <div className="pointer-events-none absolute top-40 left-0 w-[24rem] h-[24rem] bg-emerald-600/5 rounded-full blur-3xl print:hidden" />

      {/* כל האזור הזה נעלם בהדפסה (print:hidden) - זה ממשק הניהול
          האינטראקטיבי, לא מה שרוצים להדפיס למתאמן. */}
      <div className="relative max-w-4xl mx-auto px-6 py-16 print:hidden">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-xl shrink-0">
              🏋️
            </div>
            <div>
              <p className="text-orange-500 font-bold tracking-widest text-xs mb-1">
                איזור מנהל · {profile?.display_name ?? user?.email}
              </p>
              <h1 className="text-3xl font-extrabold text-white">
                תוכניות אימונים
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {weeks?.length > 0 && <DeleteAllButton />}
            <LogoutButton />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="bg-zinc-900/80 backdrop-blur border border-zinc-800 rounded-xl px-4 py-2.5 text-sm shadow-lg shadow-black/20">
            <span className="text-orange-400 font-bold">{weeks?.length ?? 0}</span>
            <span className="text-zinc-500"> שבועות</span>
          </div>
          <div className="bg-zinc-900/80 backdrop-blur border border-zinc-800 rounded-xl px-4 py-2.5 text-sm shadow-lg shadow-black/20">
            <span className="text-emerald-400 font-bold">{totalWorkouts}</span>
            <span className="text-zinc-500"> אימונים</span>
          </div>
          <div className="bg-zinc-900/80 backdrop-blur border border-zinc-800 rounded-xl px-4 py-2.5 text-sm shadow-lg shadow-black/20">
            <span className="text-sky-400 font-bold">{totalExercises}</span>
            <span className="text-zinc-500"> תרגילים</span>
          </div>
          {weeks?.length > 0 && <PrintButton />}
        </div>

        {weeks?.length > 0 && profile?.slug && (
          <div className="flex items-center gap-2 text-sm text-zinc-400 bg-zinc-900/60 border border-zinc-800 rounded-xl px-4 py-3 mb-8">
            <span>🔗</span>
            <span>
              קישור קבוע לשליחה למתאמן - תמיד מציג את הגרסה העדכנית:{" "}
            </span>
            <Link
              href={`/plan/${profile.slug}`}
              target="_blank"
              className="text-orange-400 hover:text-orange-300 underline"
            >
              trainer-site-chi.vercel.app/plan/{profile.slug}
            </Link>
          </div>
        )}

        {error && (
          <div className="bg-red-950 border border-red-800 text-red-300 rounded-xl p-4 mb-6 text-sm">
            שגיאה בטעינת הנתונים: {error.message}
          </div>
        )}

        <WeeksList weeks={weeks ?? []} />
      </div>

      {/* גרסת ההדפסה - מוסתרת לגמרי במסך הרגיל (hidden), ומופיעה
          רק כשמדפיסים (print:block). זהה בדיוק לתצוגה שמוצגת
          למתאמן בעמוד /plan/[slug] (PlanView משותף). */}
      <div className="hidden print:block text-black bg-white p-8">
        <PlanView weeks={weeks} />
      </div>
    </div>
  );
}
