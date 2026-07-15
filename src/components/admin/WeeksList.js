"use client";

import { useOptimistic } from "react";
import { addWeek, deleteWeek } from "@/app/admin/actions";
import WeekSection from "@/components/admin/WeekSection";
import AddWeekForm from "@/components/admin/AddWeekForm";

function weeksReducer(state, action) {
  if (action.type === "add") {
    return [...state, action.week];
  }
  if (action.type === "remove") {
    return state.filter((w) => w.id !== action.id);
  }
  return state;
}

export default function WeeksList({ weeks }) {
  const [optimisticWeeks, dispatchWeek] = useOptimistic(weeks, weeksReducer);

  async function handleDeleteWeek(formData) {
    dispatchWeek({ type: "remove", id: formData.get("id") });
    await deleteWeek(formData);
  }

  async function handleAddWeek(formData) {
    dispatchWeek({
      type: "add",
      week: {
        id: `temp-${crypto.randomUUID()}`,
        week_number: Number(formData.get("week_number")),
        title: formData.get("title") || null,
        workouts: [],
      },
    });
    await addWeek(formData);
  }

  const nextWeekNumber = optimisticWeeks.length + 1;

  return (
    <>
      <AddWeekForm nextWeekNumber={nextWeekNumber} action={handleAddWeek} />

      {optimisticWeeks.length === 0 && (
        <div className="text-center py-16 text-zinc-500">
          <div className="text-4xl mb-3">📋</div>
          עדיין אין שבועות בתוכנית - הוסף שבוע ראשון למעלה כדי להתחיל.
        </div>
      )}

      {optimisticWeeks.map((week) => (
        <WeekSection
          key={week.id}
          week={week}
          onDeleteWeek={handleDeleteWeek}
        />
      ))}
    </>
  );
}
