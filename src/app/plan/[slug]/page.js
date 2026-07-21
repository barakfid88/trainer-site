import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getWorkoutPlan } from "@/lib/getWorkoutPlan";
import PlanView from "@/components/PlanView";
import PlanCards from "@/components/PlanCards";
import PrintButton from "@/components/admin/PrintButton";

// עמוד ציבורי - בלי צורך בהתחברות. ה-slug בכתובת (למשל /plan/barak
// או /plan/adam) מזהה איזה מנהל, ותמיד מציג את התוכנית העדכנית
// ביותר שהוא הגדיר. אפשר לשלוח את הקישור הזה למתאמן פעם אחת, וכל
// עדכון עתידי יופיע בו אוטומטית.
export async function generateMetadata({ params }) {
  const { slug } = await params;
  return { title: `תוכנית אימונים - ${slug}` };
}

export default async function PlanPage({ params }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, display_name")
    .eq("slug", slug)
    .single();

  if (!profile) {
    notFound();
  }

  const { weeks, error } = await getWorkoutPlan(profile.id, supabase);
  const hasContent = weeks && weeks.length > 0;

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between gap-4 mb-8 print:hidden">
        <div>
          <p className="text-orange-500 font-bold tracking-widest text-sm mb-1">
            התוכנית שלך
          </p>
          <h1 className="text-2xl font-bold text-white">
            תוכנית אימונים{profile.display_name ? ` - ${profile.display_name}` : ""}
          </h1>
        </div>
        {hasContent && <PrintButton />}
      </div>

      {error && (
        <p className="text-red-400 bg-red-950 border border-red-900 rounded-xl p-4">
          שגיאה בטעינת התוכנית.
        </p>
      )}

      {!error && !hasContent && (
        <p className="text-zinc-400">
          התוכנית עדיין לא מוכנה - חזור לבדוק בקרוב.
        </p>
      )}

      {hasContent && (
        <>
          {/* תצוגת מסך - כרטיסי תרגיל בגווני קרם על משטח אפור-כהה,
              בסגנון אפליקציית כושר. גרסת ההדפסה נשארת נקייה בנפרד. */}
          <div className="print:hidden bg-zinc-800 rounded-2xl p-6 sm:p-10 shadow-2xl shadow-black/40">
            <PlanCards weeks={weeks} />
          </div>

          {/* תצוגת הדפסה/PDF - נשארת נקייה, שחור-לבן */}
          <div className="hidden print:block text-black bg-white p-8">
            <PlanView weeks={weeks} />
          </div>
        </>
      )}
    </div>
  );
}
