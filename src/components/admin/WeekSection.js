import { addExercise, deleteExercise, deleteWeek } from "@/app/admin/actions";

export default function WeekSection({ week }) {
  const exercises = week.exercises ?? [];

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">
          שבוע {week.week_number}
          {week.title && (
            <span className="text-zinc-400 font-normal"> - {week.title}</span>
          )}
        </h2>
        <form action={deleteWeek}>
          <input type="hidden" name="id" value={week.id} />
          <button
            type="submit"
            className="text-sm text-zinc-500 hover:text-red-500 transition-colors"
          >
            מחק שבוע
          </button>
        </form>
      </div>

      <table className="w-full text-right border-collapse">
        <thead>
          <tr className="text-zinc-400 text-sm border-b border-zinc-800">
            <th className="py-2 font-medium">תרגיל</th>
            <th className="py-2 font-medium">סטים</th>
            <th className="py-2 font-medium">חזרות</th>
            <th className="py-2 font-medium">משקל</th>
            <th className="py-2 w-8"></th>
          </tr>
        </thead>
        <tbody>
          {exercises.map((exercise) => (
            <tr key={exercise.id} className="border-b border-zinc-800/60">
              <td className="py-2 text-white">{exercise.name}</td>
              <td className="py-2 text-zinc-300">{exercise.sets}</td>
              <td className="py-2 text-zinc-300">{exercise.reps}</td>
              <td className="py-2 text-zinc-300">{exercise.weight}</td>
              <td className="py-2">
                <form action={deleteExercise}>
                  <input type="hidden" name="id" value={exercise.id} />
                  <button
                    type="submit"
                    className="text-zinc-600 hover:text-red-500 transition-colors"
                    title="מחק תרגיל"
                  >
                    ✕
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <form
        action={addExercise}
        className="flex flex-wrap items-end gap-3 mt-4 pt-4 border-t border-zinc-800"
      >
        <input type="hidden" name="week_id" value={week.id} />
        <div className="flex-1 min-w-[120px]">
          <label className="block text-xs text-zinc-500 mb-1">תרגיל</label>
          <input
            name="name"
            required
            className="w-full bg-zinc-950 border border-zinc-700 text-white rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div className="w-20">
          <label className="block text-xs text-zinc-500 mb-1">סטים</label>
          <input
            name="sets"
            type="number"
            required
            className="w-full bg-zinc-950 border border-zinc-700 text-white rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div className="w-20">
          <label className="block text-xs text-zinc-500 mb-1">חזרות</label>
          <input
            name="reps"
            type="number"
            required
            className="w-full bg-zinc-950 border border-zinc-700 text-white rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <div className="w-24">
          <label className="block text-xs text-zinc-500 mb-1">משקל</label>
          <input
            name="weight"
            type="number"
            step="0.5"
            required
            className="w-full bg-zinc-950 border border-zinc-700 text-white rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-orange-400 transition-colors"
        >
          הוסף תרגיל
        </button>
      </form>
    </div>
  );
}
