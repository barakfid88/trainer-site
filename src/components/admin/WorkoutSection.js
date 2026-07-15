"use client";

import { useOptimistic } from "react";
import { addExercise, deleteExercise, updateExercise } from "@/app/admin/actions";
import SubmitButton from "@/components/SubmitButton";

const inputClass =
  "w-full bg-zinc-950 border border-zinc-700 text-white rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors";
const labelClass = "block text-xs text-zinc-500 mb-1";

// "reducer" קטן שיודע לטפל בשני סוגי שינויים אופטימיים - הוספה ומחיקה.
function exercisesReducer(state, action) {
  if (action.type === "add") {
    return [...state, action.exercise];
  }
  if (action.type === "remove") {
    return state.filter((e) => e.id !== action.id);
  }
  return state;
}

export default function WorkoutSection({ workout, onDeleteWorkout }) {
  // useOptimistic נותן לנו עותק "מיידי" של רשימת התרגילים - גם הוספה
  // וגם מחיקה מופיעות על המסך באותו רגע, בלי לחכות לתשובה מהשרת.
  // אם משהו ישתבש, React יחזיר את המצב האמיתי אוטומטית.
  const [exercises, dispatchExercise] = useOptimistic(
    workout.exercises ?? [],
    exercisesReducer
  );

  async function handleDeleteExercise(formData) {
    dispatchExercise({ type: "remove", id: formData.get("id") });
    await deleteExercise(formData);
  }

  async function handleAddExercise(formData) {
    dispatchExercise({
      type: "add",
      exercise: {
        id: `temp-${crypto.randomUUID()}`,
        name: formData.get("name"),
        sets: Number(formData.get("sets")),
        reps: Number(formData.get("reps")),
        weight: Number(formData.get("weight")),
      },
    });
    await addExercise(formData);
  }

  return (
    <div className="bg-zinc-950/40 border border-zinc-800 rounded-xl p-4 mb-3">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-zinc-200">
          אימון {workout.workout_number}
          {workout.title && (
            <span className="text-zinc-500 font-normal"> · {workout.title}</span>
          )}
        </h3>
        <form action={onDeleteWorkout}>
          <input type="hidden" name="id" value={workout.id} />
          <SubmitButton
            pendingText="מוחק..."
            className="text-xs text-zinc-600 hover:text-red-500 transition-colors"
          >
            מחק אימון
          </SubmitButton>
        </form>
      </div>

      {/* כל תרגיל הוא כרטיס נפרד עם שדות מתויגים - כך שגם במסך צר
          (טלפון) אפשר לראות בבירור מה כתוב בכל שדה. */}
      <div className="space-y-2 mb-3">
        {exercises.map((exercise) => (
          <form
            key={exercise.id}
            action={updateExercise}
            className="flex flex-wrap items-end gap-2 bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 hover:border-zinc-700 transition-colors"
          >
            <input type="hidden" name="id" value={exercise.id} />
            <div className="flex-1 min-w-[130px]">
              <label className={labelClass}>תרגיל</label>
              <input
                name="name"
                defaultValue={exercise.name}
                required
                className={inputClass}
              />
            </div>
            <div className="w-20">
              <label className={labelClass}>סטים</label>
              <input
                name="sets"
                type="number"
                defaultValue={exercise.sets}
                required
                className={inputClass}
              />
            </div>
            <div className="w-20">
              <label className={labelClass}>חזרות</label>
              <input
                name="reps"
                type="number"
                defaultValue={exercise.reps}
                required
                className={inputClass}
              />
            </div>
            <div className="w-24">
              <label className={labelClass}>משקל</label>
              <input
                name="weight"
                type="number"
                step="0.5"
                defaultValue={exercise.weight}
                required
                className={inputClass}
              />
            </div>
            <div className="flex gap-1">
              <SubmitButton
                pendingText="⏳"
                className="text-zinc-400 hover:text-orange-500 hover:scale-110 transition-all text-lg px-1.5 py-1"
                title="שמור שינויים"
              >
                💾
              </SubmitButton>
              <SubmitButton
                formAction={handleDeleteExercise}
                className="text-zinc-500 hover:text-red-500 hover:scale-110 transition-all text-lg px-1.5 py-1"
                title="מחק תרגיל"
              >
                ✕
              </SubmitButton>
            </div>
          </form>
        ))}

        {exercises.length === 0 && (
          <p className="text-zinc-600 text-sm py-1">
            אין עדיין תרגילים באימון הזה - הוסף למטה.
          </p>
        )}
      </div>

      <form
        action={handleAddExercise}
        className="flex flex-wrap items-end gap-2 pt-3 border-t border-zinc-800"
      >
        <input type="hidden" name="workout_id" value={workout.id} />
        <div className="flex-1 min-w-[130px]">
          <label className={labelClass}>תרגיל</label>
          <input name="name" required className={inputClass} />
        </div>
        <div className="w-20">
          <label className={labelClass}>סטים</label>
          <input name="sets" type="number" required className={inputClass} />
        </div>
        <div className="w-20">
          <label className={labelClass}>חזרות</label>
          <input name="reps" type="number" required className={inputClass} />
        </div>
        <div className="w-24">
          <label className={labelClass}>משקל</label>
          <input
            name="weight"
            type="number"
            step="0.5"
            required
            className={inputClass}
          />
        </div>
        <SubmitButton
          pendingText="מוסיף..."
          className="flex items-center gap-1.5 bg-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-orange-400 hover:shadow-lg hover:shadow-orange-500/20 transition-all"
        >
          <span className="text-base leading-none">+</span> הוסף תרגיל
        </SubmitButton>
      </form>
    </div>
  );
}
