import { createClient } from "@/lib/supabase/server";

// שולף את התוכנית המלאה: שבועות עם האימונים שלהם, וכל אימון עם
// התרגילים שלו - ממוין נכון. פונקציה משותפת שמשמשת גם את עמוד
// האדמין (לתצוגת הדפסה) וגם את עמוד /plan הציבורי.
export async function getWorkoutPlan() {
  const supabase = await createClient();

  const { data: weeksData, error } = await supabase
    .from("workout_weeks")
    .select("*, workouts(*, exercises(*))")
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
