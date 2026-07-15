import { addWorkout } from "@/app/admin/actions";
import SubmitButton from "@/components/SubmitButton";

export default function AddWorkoutForm({ weekId, nextWorkoutNumber, action }) {
  return (
    <form
      action={action ?? addWorkout}
      className="flex flex-wrap items-end gap-3 bg-zinc-950/30 border border-dashed border-zinc-700 rounded-xl p-4 mb-4"
    >
      <input type="hidden" name="week_id" value={weekId} />
      <div className="w-24">
        <label className="block text-xs text-zinc-500 mb-1">אימון מס'</label>
        <input
          name="workout_number"
          type="number"
          defaultValue={nextWorkoutNumber}
          required
          className="w-full bg-zinc-950 border border-zinc-700 text-white rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
        />
      </div>
      <div className="flex-1 min-w-[140px]">
        <label className="block text-xs text-zinc-500 mb-1">
          כותרת (אופציונלי)
        </label>
        <input
          name="title"
          placeholder="למשל: פלג גוף עליון"
          className="w-full bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-600 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
        />
      </div>
      <SubmitButton
        pendingText="מוסיף..."
        className="flex items-center gap-1.5 bg-zinc-700 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-zinc-600 transition-colors"
      >
        <span className="text-base leading-none">+</span> הוסף אימון
      </SubmitButton>
    </form>
  );
}
