"use client";

import { useOptimistic } from "react";
import { deleteWeek } from "@/app/admin/actions";
import WeekSection from "@/components/admin/WeekSection";

export default function WeeksList({ weeks }) {
  const [optimisticWeeks, removeWeekOptimistic] = useOptimistic(
    weeks,
    (state, removedId) => state.filter((w) => w.id !== removedId)
  );

  async function handleDeleteWeek(formData) {
    removeWeekOptimistic(formData.get("id"));
    await deleteWeek(formData);
  }

  return (
    <>
      {optimisticWeeks.map((week) => (
        <WeekSection key={week.id} week={week} onDeleteWeek={handleDeleteWeek} />
      ))}
    </>
  );
}
