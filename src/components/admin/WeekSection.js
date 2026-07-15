"use client";

import { useOptimistic } from "react";
import { deleteWorkout } from "@/app/admin/actions";
import WorkoutSection from "@/components/admin/WorkoutSection";
import AddWorkoutForm from "@/components/admin/AddWorkoutForm";
import SubmitButton from "@/components/SubmitButton";

export default function WeekSection({ week, onDeleteWeek }) {
  const [workouts, removeWorkoutOptimistic] = useOptimistic(
    week.workouts ?? [],
    (state, removedId) => state.filter((w) => w.id !== removedId)
  );

  async function handleDeleteWorkout(formData) {
    removeWorkoutOptimistic(formData.get("id"));
    await deleteWorkout(formData);
  }

  const nextWorkoutNumber = workouts.length + 1;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6 shadow-lg shadow-black/20">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-sm shrink-0">
            {week.week_number}
          </div>
          <h2 className="text-lg font-bold text-white">
            שבוע {week.week_number}
            {week.title && (
              <span className="text-zinc-400 font-normal">
                {" "}
                · {week.title}
              </span>
            )}
          </h2>
        </div>
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

      {workouts.map((workout) => (
        <WorkoutSection
          key={workout.id}
          workout={workout}
          onDeleteWorkout={handleDeleteWorkout}
        />
      ))}

      {workouts.length === 0 && (
        <p className="text-zinc-500 text-sm mb-4">
          אין עדיין אימונים בשבוע הזה - הוסף אימון ראשון למטה.
        </p>
      )}

      <AddWorkoutForm weekId={week.id} nextWorkoutNumber={nextWorkoutNumber} />
    </div>
  );
}
