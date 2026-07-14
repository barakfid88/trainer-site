// תצוגת התוכנית ה"נקייה" - שחור-לבן, טבלאות רגילות, בלי כפתורים
// או שדות עריכה. משמשת גם כתצוגת הדפסה בעמוד האדמין, וגם כתוכן
// הראשי של עמוד /plan הציבורי.
export default function PlanView({ weeks }) {
  return (
    <div dir="rtl">
      <h1 className="text-2xl font-bold mb-1">תוכנית אימונים</h1>
      <p className="text-sm text-gray-600 mb-8">ברק - מאמן כושר אישי</p>

      {weeks?.map((week) => (
        <div key={week.id} className="mb-8 break-inside-avoid">
          <h2 className="text-xl font-bold mb-3 border-b-2 border-gray-800 pb-1">
            שבוע {week.week_number}
            {week.title ? ` - ${week.title}` : ""}
          </h2>

          {(week.workouts ?? []).map((workout) => (
            <div key={workout.id} className="mb-5 break-inside-avoid">
              <h3 className="text-base font-bold mb-2">
                אימון {workout.workout_number}
                {workout.title ? ` - ${workout.title}` : ""}
              </h3>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="border border-gray-400 px-2 py-1 text-right">
                      תרגיל
                    </th>
                    <th className="border border-gray-400 px-2 py-1 text-right">
                      סטים
                    </th>
                    <th className="border border-gray-400 px-2 py-1 text-right">
                      חזרות
                    </th>
                    <th className="border border-gray-400 px-2 py-1 text-right">
                      משקל
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(workout.exercises ?? []).map((exercise) => (
                    <tr key={exercise.id}>
                      <td className="border border-gray-400 px-2 py-1">
                        {exercise.name}
                      </td>
                      <td className="border border-gray-400 px-2 py-1">
                        {exercise.sets}
                      </td>
                      <td className="border border-gray-400 px-2 py-1">
                        {exercise.reps}
                      </td>
                      <td className="border border-gray-400 px-2 py-1">
                        {exercise.weight}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
