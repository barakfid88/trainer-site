import { addWeek } from "@/app/admin/actions";

export default function AddWeekForm({ nextWeekNumber }) {
  return (
    <form
      action={addWeek}
      className="flex flex-wrap items-end gap-3 bg-zinc-900 border border-zinc-800 border-dashed rounded-2xl p-6 mb-6"
    >
      <div className="w-28">
        <label className="block text-xs text-zinc-500 mb-1">מספר שבוע</label>
        <input
          name="week_number"
          type="number"
          defaultValue={nextWeekNumber}
          required
          className="w-full bg-zinc-950 border border-zinc-700 text-white rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>
      <div className="flex-1 min-w-[160px]">
        <label className="block text-xs text-zinc-500 mb-1">
          כותרת (אופציונלי)
        </label>
        <input
          name="title"
          placeholder="למשל: התמקדות בפלג גוף עליון"
          className="w-full bg-zinc-950 border border-zinc-700 text-white rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>
      <button
        type="submit"
        className="bg-orange-500 text-white px-5 py-1.5 rounded-lg text-sm font-medium hover:bg-orange-400 transition-colors"
      >
        + הוסף שבוע חדש
      </button>
    </form>
  );
}
