"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// כל הפונקציות כאן הן "Server Actions" - קוד שרץ אך ורק בשרת,
// גם אם קוראים לו מטופס (form) שנמצא בדפדפן. זה מאפשר לשמור נתונים
// ב-Supabase בלי לבנות API route נפרד לכל פעולה.
//
// מבנה הנתונים: שבוע (workout_weeks) מכיל כמה אימונים (workouts),
// וכל אימון מכיל את התרגילים שלו (exercises).

export async function addWeek(formData) {
  const weekNumber = Number(formData.get("week_number"));
  const title = formData.get("title");

  const supabase = await createClient();
  const { error } = await supabase
    .from("workout_weeks")
    .insert({ week_number: weekNumber, title: title || null });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
}

export async function deleteWeek(formData) {
  const id = formData.get("id");

  const supabase = await createClient();
  const { error } = await supabase.from("workout_weeks").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
}

export async function addWorkout(formData) {
  const weekId = formData.get("week_id");
  const workoutNumber = Number(formData.get("workout_number"));
  const title = formData.get("title");

  const supabase = await createClient();
  const { error } = await supabase
    .from("workouts")
    .insert({ week_id: weekId, workout_number: workoutNumber, title: title || null });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
}

export async function deleteWorkout(formData) {
  const id = formData.get("id");

  const supabase = await createClient();
  const { error } = await supabase.from("workouts").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
}

export async function addExercise(formData) {
  const workoutId = formData.get("workout_id");
  const name = formData.get("name");
  const sets = Number(formData.get("sets"));
  const reps = Number(formData.get("reps"));
  const weight = Number(formData.get("weight"));

  const supabase = await createClient();
  const { error } = await supabase
    .from("exercises")
    .insert({ workout_id: workoutId, name, sets, reps, weight });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
}

export async function updateExercise(formData) {
  const id = formData.get("id");
  const name = formData.get("name");
  const sets = Number(formData.get("sets"));
  const reps = Number(formData.get("reps"));
  const weight = Number(formData.get("weight"));

  const supabase = await createClient();
  const { error } = await supabase
    .from("exercises")
    .update({ name, sets, reps, weight })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
}

export async function deleteExercise(formData) {
  const id = formData.get("id");

  const supabase = await createClient();
  const { error } = await supabase.from("exercises").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/admin");
}
