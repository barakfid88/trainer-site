"use client";

import { useOptimistic, useState, useEffect } from "react";
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
  const [activeWeekId, setActiveWeekId] = useState(
    weeks.length > 0 ? weeks[weeks.length - 1].id : null
  );

  // אם השבוע הפעיל נמחק (או שעדיין לא נבחר אחד), בוחרים ברירת
  // מחדל הגיונית - השבוע האחרון ברשימה.
  useEffect(() => {
    if (optimisticWeeks.length === 0) {
      setActiveWeekId(null);
      return;
    }
    if (!optimisticWeeks.some((w) => w.id === activeWeekId)) {
      setActiveWeekId(optimisticWeeks[optimisticWeeks.length - 1].id);
    }
  }, [optimisticWeeks, activeWeekId]);

  async function handleDeleteWeek(formData) {
    dispatchWeek({ type: "remove", id: formData.get("id") });
    await deleteWeek(formData);
  }

  async function handleAddWeek(formData) {
    const tempId = `temp-${crypto.randomUUID()}`;
    dispatchWeek({
      type: "add",
      week: {
        id: tempId,
        week_number: Number(formData.get("week_number")),
        title: formData.get("title") || null,
        workouts: [],
      },
    });
    setActiveWeekId(tempId);
    await addWeek(formData);
  }

  const nextWeekNumber = optimisticWeeks.length + 1;
  const activeWeek = optimisticWeeks.find((w) => w.id === activeWeekId);

  return (
    <div>
      <AddWeekForm nextWeekNumber={nextWeekNumber} action={handleAddWeek} />

      {optimisticWeeks.length === 0 && (
        <div className="text-center py-16 text-zinc-500">
          <div className="text-4xl mb-3">📋</div>
          עדיין אין שבועות בתוכנית - הוסף שבוע ראשון למעלה כדי להתחיל.
        </div>
      )}

      {optimisticWeeks.length > 0 && (
        <>
          {/* טאבים לבחירת שבוע - במקום לגלול דרך כל השבועות אחד
              מתחת לשני, לוחצים ורואים רק את זה שרוצים. */}
          <div className="flex flex-wrap gap-2 mb-6">
            {optimisticWeeks.map((week) => {
              const isActive = week.id === activeWeekId;
              return (
                <button
                  key={week.id}
                  type="button"
                  onClick={() => setActiveWeekId(week.id)}
                  className={`flex items-center gap-2 pr-4 pl-3 py-2 rounded-full text-sm font-medium border transition-all ${
                    isActive
                      ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20"
                      : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white"
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                      isActive ? "bg-white/20" : "bg-zinc-800"
                    }`}
                  >
                    {week.week_number}
                  </span>
                  {week.title || `שבוע ${week.week_number}`}
                </button>
              );
            })}
          </div>

          {activeWeek && (
            <WeekSection week={activeWeek} onDeleteWeek={handleDeleteWeek} />
          )}
        </>
      )}
    </div>
  );
}
