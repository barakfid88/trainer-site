"use client";

import { useOptimistic, useState } from "react";
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
  // Accordion - האימון נפתח/נסגר בלחיצה, כדי שתוכניות עם הרבה
  // אימונים לא יהפכו לעמוד ארוך ומכביד.
  const [isOpen, setIsOpen] = useState(true);

  // useOptimistic נותן לנו עותק "מיידי" של רשימת התרגילים - גם הוספה
  // וגם מחיקה מופיעות על המסך באותו רגע, בלי לחכות לתשובה מהשרת.
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
        notes: formData.get("notes") || null,
      },
    });
    await addExercise(formData);
  }

  return (
    <div className="bg-zinc-950/50 border border-zinc-800 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-3 p-4 text-right hover:bg-white/[0.03] transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="w-7 h-7 shrink-0 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold flex items-center justify-center">
            {workout.workout_number}
          </span>
          <span className="text-sm font-bold text-zinc-200 truncate">
            אימון {workout.workout_number}
            {workout.title && (
              <span className="text-zinc-500 font-normal"> · {workout.title}</span>
            )}
          </span>
          <span className="text-xs text-zinc-600 shrink-0">
            ({exercises.length} תרגילים)
          </span>
        </div>
        <span
          className={`text-zinc-500 shrink-0 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          ⌄
        </span>
      </button>

      {isOpen && (
        <div className="px-4 pb-4">
          <form action={onDeleteWorkout} className="mb-3">
            <input type="hidden" name="id" value={workout.id} />
            <SubmitButton
              pendingText="מוחק..."
              className="text-xs text-zinc-600 hover:text-red-500 transition-colors"
            >
              מחק אימון
            </SubmitButton>
          </form>

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
                <div className="w-full">
                  <label className={labelClass}>הערות</label>
                  <textarea
                    name="notes"
                    defaultValue={exercise.notes ?? ""}
                    rows={2}
                    placeholder="הערות לתרגיל - טכניקה, קצב, דגשים..."
                    className={`${inputClass} resize-y`}
                  />
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
            <div className="w-full">
              <label className={labelClass}>הערות</label>
              <textarea
                name="notes"
                rows={2}
                placeholder="הערות לתרגיל - טכניקה, קצב, דגשים..."
                className={`${inputClass} resize-y`}
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
