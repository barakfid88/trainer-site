"use client";

import { useState } from "react";

// כמה "גווני קרם" שמחזירים בין האימונים, כדי שכל אימון יבלוט קצת
// אחרת - בדיוק כמו תגיות קטגוריה באפליקציית כושר, אבל בגוון קרם
// רך במקום צבעים זוהרים.
const THEMES = [
  {
    card: "bg-[#fdf1e5] border-[#f3d9b8]",
    accent: "text-[#9a4a15]",
    body: "text-[#44372a]",
    badge: "bg-[#f3d9b8] text-[#9a4a15]",
  },
  {
    card: "bg-[#eef6ea] border-[#cfe4c4]",
    accent: "text-[#3f6b2b]",
    body: "text-[#374135]",
    badge: "bg-[#cfe4c4] text-[#3f6b2b]",
  },
  {
    card: "bg-[#e9f2f6] border-[#c3dbe5]",
    accent: "text-[#2f6a83]",
    body: "text-[#333e42]",
    badge: "bg-[#c3dbe5] text-[#2f6a83]",
  },
  {
    card: "bg-[#f3eef8] border-[#ddd0ea]",
    accent: "text-[#6b4a92]",
    body: "text-[#3d3542]",
    badge: "bg-[#ddd0ea] text-[#6b4a92]",
  },
  {
    card: "bg-[#fbeef1] border-[#f0d3da]",
    accent: "text-[#a34a63]",
    body: "text-[#423337]",
    badge: "bg-[#f0d3da] text-[#a34a63]",
  },
];

// תצוגת המסך (לא הדפסה) של התוכנית - בסגנון "אפליקציית כושר":
// טאבים לבחירת שבוע, וכרטיסים צבעוניים לכל אימון ותרגיל.
// גרסת ההדפסה/PDF נשארת דרך PlanView הנקי, בנפרד לגמרי.
export default function PlanCards({ weeks }) {
  const [activeWeekId, setActiveWeekId] = useState(
    weeks.length > 0 ? weeks[weeks.length - 1].id : null
  );

  const activeWeek = weeks.find((w) => w.id === activeWeekId) ?? weeks[0];

  return (
    <div dir="rtl">
      {weeks.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {weeks.map((week) => {
            const isActive = week.id === activeWeek?.id;
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
      )}

      {activeWeek && (
        <div>
          <h2 className="text-xl font-extrabold text-white mb-5">
            שבוע {activeWeek.week_number}
            {activeWeek.title && (
              <span className="text-zinc-400 font-normal"> · {activeWeek.title}</span>
            )}
          </h2>

          <div className="space-y-6">
            {(activeWeek.workouts ?? []).map((workout, i) => {
              const theme = THEMES[i % THEMES.length];
              return (
                <div key={workout.id}>
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`w-8 h-8 shrink-0 rounded-lg flex items-center justify-center text-sm font-bold ${theme.badge}`}
                    >
                      {workout.workout_number}
                    </span>
                    <h3 className="text-lg font-bold text-white">
                      אימון {workout.workout_number}
                      {workout.title && (
                        <span className="text-zinc-400 font-normal"> · {workout.title}</span>
                      )}
                    </h3>
                  </div>

                  <div className="space-y-2.5">
                    {(workout.exercises ?? []).map((exercise) => (
                      <div
                        key={exercise.id}
                        className={`border rounded-xl px-4 py-3 ${theme.card}`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                          <span className={`text-base font-semibold ${theme.body}`}>
                            {exercise.name}
                          </span>
                          <div className="flex items-center gap-2 text-sm">
                            <span
                              className={`${theme.accent} bg-black/5 rounded-full px-3 py-1 font-bold`}
                            >
                              {exercise.sets} × {exercise.reps}
                            </span>
                            {exercise.weight != null && exercise.weight !== "" && (
                              <span className={`${theme.body} bg-black/5 rounded-full px-3 py-1 font-medium`}>
                                {exercise.weight} ק״ג
                              </span>
                            )}
                          </div>
                        </div>
                        {exercise.notes && (
                          <p className={`mt-2 text-sm leading-relaxed whitespace-pre-wrap border-t pt-2 opacity-80 ${theme.body} border-black/10`}>
                            {exercise.notes}
                          </p>
                        )}
                      </div>
                    ))}

                    {(workout.exercises ?? []).length === 0 && (
                      <p className="text-zinc-500 text-sm">אין עדיין תרגילים באימון הזה.</p>
                    )}
                  </div>
                </div>
              );
            })}

            {(activeWeek.workouts ?? []).length === 0 && (
              <p className="text-zinc-500 text-sm">אין עדיין אימונים בשבוע הזה.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
