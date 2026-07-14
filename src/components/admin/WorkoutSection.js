import {
  addExercise,
  deleteExercise,
  deleteWorkout,
  updateExercise,
} from "@/app/admin/actions";

const inputClass =
  "w-full bg-zinc-950 border border-zinc-700 text-white rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors";
const labelClass = "block text-xs text-zinc-500 mb-1";

export default function WorkoutSection({ workout }) {
  const exercises = workout.exercises ?? [];

  return (
    <div className="bg-zinc-950/40 border border-zinc-800 rounded-xl p-4 mb-3">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-zinc-200">
          אימון {workout.workout_number}
          {workout.title && (
            <span className="text-zinc-500 font-normal"> · {workout.title}</span>
          )}
        </h3>
        <form action={deleteWorkout}>
          <input type="hidden" name="id" value={workout.id} />
          <button
            type="submit"
            className="text-xs text-zinc-600 hover:text-red-500 transition-colors"
          >
            מחק אימון
          </button>
        </form>
      </div>

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
              <button
                type="submit"
                className="text-zinc-400 hover:text-orange-500 hover:scale-110 transition-all text-lg px-1.5 py-1"
                title="שמור שינויים"
              >
                💾
              </button>
              <button
                type="submit"
                formAction={deleteExercise}
                className="text-zinc-500 hover:text-red-500 hover:scale-110 transition-all text-lg px-1.5 py-1"
                title="מחק תרגיל"
              >
                ✕
              </button>
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
        action={addExercise}
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
        <button
          type="submit"
          className="flex items-center gap-1.5 bg-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-orange-400 hover:shadow-lg hover:shadow-orange-500/20 transition-all"
        >
          <span className="text-base leading-none">+</span> הוסף תרגיל
        </button>
      </form>
    </div>
  );
}
