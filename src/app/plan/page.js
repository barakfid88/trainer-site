import { getWorkoutPlan } from "@/lib/getWorkoutPlan";
import PlanView from "@/components/PlanView";
import PrintButton from "@/components/admin/PrintButton";

export const metadata = {
  title: "תוכנית אימונים - ברק, מאמן כושר אישי",
};

// עמוד ציבורי - בלי צורך בהתחברות. הכתובת הזו קבועה, ותמיד מציגה
// את התוכנית העדכנית ביותר שהוגדרה באדמין. אפשר לשלוח את הקישור
// הזה למתאמן פעם אחת, וכל עדכון עתידי יופיע בו אוטומטית.
export default async function PlanPage() {
  const { weeks, error } = await getWorkoutPlan();
  const hasContent = weeks && weeks.length > 0;

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between gap-4 mb-8 print:hidden">
        <div>
          <p className="text-orange-500 font-bold tracking-widest text-sm mb-1">
            התוכנית שלך
          </p>
          <h1 className="text-2xl font-bold text-white">תוכנית אימונים</h1>
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
        <div className="bg-white text-black rounded-2xl p-6 sm:p-10 shadow-2xl shadow-black/40 print:shadow-none print:rounded-none print:p-0">
          <PlanView weeks={weeks} />
        </div>
      )}
    </div>
  );
}
