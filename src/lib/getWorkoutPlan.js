import { createClient } from "@/lib/supabase/server";

// שולף את התוכנית המלאה של בעלים ספציפי (ownerId): שבועות עם
// האימונים שלהם, וכל אימון עם התרגילים שלו - ממוין נכון. פונקציה
// משותפת שמשמשת גם את עמוד האדמין וגם את עמוד /plan/[slug] הציבורי.
//
// אפשר להעביר לקוח Supabase קיים (existingClient) כדי לא ליצור
// חיבור כפול מיותר - שימושי בעמוד האדמין, ששם ממילא כבר יוצרים
// לקוח כדי לבדוק מי המשתמש המחובר.
export async function getWorkoutPlan(ownerId, existingClient) {
  const supabase = existingClient ?? (await createClient());

  const { data: weeksData, error } = await supabase
    .from("workout_weeks")
    .select("*, workouts(*, exercises(*))")
    .eq("owner_id", ownerId)
    .order("week_number", { ascending: true })
    .order("workout_number", { referencedTable: "workouts", ascending: true });

  const weeks = weeksData?.map((week) => ({
    ...week,
    // סדר יורד - האימון האחרון שנוסף מופיע ראשון (למעלה).
    workouts: (week.workouts ?? [])
      .slice()
      .sort((a, b) => b.workout_number - a.workout_number)
      .map((workout) => ({
        ...workout,
        exercises: (workout.exercises ?? [])
          .slice()
          .sort((a, b) => new Date(a.created_at) - new Date(b.created_at)),
      })),
  }));

  return { weeks, error };
}
