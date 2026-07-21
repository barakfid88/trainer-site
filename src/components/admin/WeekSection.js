"use client";

import { useOptimistic } from "react";
import { addWorkout, deleteWorkout } from "@/app/admin/actions";
import WorkoutSection from "@/components/admin/WorkoutSection";
import AddWorkoutForm from "@/components/admin/AddWorkoutForm";
import SubmitButton from "@/components/SubmitButton";

function workoutsReducer(state, action) {
  if (action.type === "add") {
    return [action.workout, ...state];
  }
  if (action.type === "remove") {
    return state.filter((w) => w.id !== action.id);
  }
  return state;
}

export default function WeekSection({ week, onDeleteWeek }) {
  const [workouts, dispatchWorkout] = useOptimistic(
    week.workouts ?? [],
    workoutsReducer
  );

  async function handleDeleteWorkout(formData) {
    dispatchWorkout({ type: "remove", id: formData.get("id") });
    await deleteWorkout(formData);
  }

  async function handleAddWorkout(formData) {
    dispatchWorkout({
      type: "add",
      workout: {
        id: `temp-${crypto.randomUUID()}`,
        workout_number: Number(formData.get("workout_number")),
        title: formData.get("title") || null,
        exercises: [],
      },
    });
    await addWorkout(formData);
  }

  // אותו תיקון כמו בשבועות - לפי המספר הגבוה ביותר הקיים, לא לפי
  // כמות האימונים, כדי לא להתנגש במספר שכבר קיים אחרי מחיקה.
  const nextWorkoutNumber =
    workouts.length > 0
      ? Math.max(...workouts.map((w) => w.workout_number)) + 1
      : 1;

  return (
    <div className="bg-zinc-900/60 backdrop-blur border border-zinc-800 rounded-2xl p-6 shadow-xl shadow-black/20">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-white">
          שבוע {week.week_number}
          {week.title && (
            <span className="text-zinc-400 font-normal"> · {week.title}</span>
          )}
        </h2>
        <form action={onDeleteWeek}>
          <input type="hidden" name="id" value={week.id} />
          <SubmitButton
            pendingText="מוחק..."
            className="text-sm text-zinc-500 hover:text-red-500 transition-colors"
          >
            מחק שבוע
          </SubmitButton>
        </form>
      </div>

      <div className="space-y-3 mb-4">
        {workouts.map((workout) => (
          <WorkoutSection
            key={workout.id}
            workout={workout}
            onDeleteWorkout={handleDeleteWorkout}
          />
        ))}
      </div>

      {workouts.length === 0 && (
        <p className="text-zinc-500 text-sm mb-4">
          אין עדיין אימונים בשבוע הזה - הוסף אימון ראשון למטה.
        </p>
      )}

      <AddWorkoutForm
        weekId={week.id}
        nextWorkoutNumber={nextWorkoutNumber}
        action={handleAddWorkout}
      />
    </div>
  );
}
