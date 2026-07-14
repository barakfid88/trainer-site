import {
  addExercise,
  deleteExercise,
  deleteWeek,
  updateExercise,
} from "@/app/admin/actions";

const inputClass =
  "w-full bg-zinc-950 border border-zinc-700 text-white rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500";
const labelClass = "block text-xs text-zinc-500 mb-1";

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

      {/* כל תרגיל הוא כרטיס נפרד עם שדות מתויגים - כך שגם במסך צר
          (טלפון) אפשר לראות בבירור מה כתוב בכל שדה, כי הם עוברים
          שורה כשאין מקום (flex-wrap), במקום להידחס בטבלה נוקשה. */}
      <div className="space-y-3 mb-4">
        {exercises.map((exercise) => (
          <form
            key={exercise.id}
            action={updateExercise}
            className="flex flex-wrap items-end gap-3 bg-zinc-950/50 border border-zinc-800 rounded-xl p-3"
          >
            <input type="hidden" name="id" value={exercise.id} />
            <div className="flex-1 min-w-[140px]">
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
            <div className="flex gap-2">
              <button
                type="submit"
                className="text-zinc-400 hover:text-orange-500 transition-colors text-lg px-1"
                title="שמור שינויים"
              >
                💾
              </button>
              <button
                type="submit"
                formAction={deleteExercise}
                className="text-zinc-500 hover:text-red-500 transition-colors text-lg px-1"
                title="מחק תרגיל"
              >
                ✕
              </button>
            </div>
          </form>
        ))}

        {exercises.length === 0 && (
          <p className="text-zinc-500 text-sm py-2">
            אין עדיין תרגילים בשבוע הזה - הוסף למטה.
          </p>
        )}
      </div>

      <form
        action={addExercise}
        className="flex flex-wrap items-end gap-3 pt-4 border-t border-zinc-800"
      >
        <input type="hidden" name="week_id" value={week.id} />
        <div className="flex-1 min-w-[140px]">
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
