"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

// כל הפונקציות כאן הן "Server Actions" - קוד שרץ אך ורק בשרת,
// גם אם קוראים לו מטופס (form) שנמצא בדפדפן. זה מאפשר לשמור נתונים
// ב-Supabase בלי לבנות API route נפרד לכל פעולה.

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

export async function addExercise(formData) {
  const weekId = formData.get("week_id");
  const name = formData.get("name");
  const sets = Number(formData.get("sets"));
  const reps = Number(formData.get("reps"));
  const weight = Number(formData.get("weight"));

  const supabase = await createClient();
  const { error } = await supabase
    .from("exercises")
    .insert({ week_id: weekId, name, sets, reps, weight });

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
