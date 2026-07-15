import { addWeek } from "@/app/admin/actions";
import SubmitButton from "@/components/SubmitButton";

export default function AddWeekForm({ nextWeekNumber, action }) {
  return (
    <form
      action={action ?? addWeek}
      className="flex flex-wrap items-end gap-3 bg-zinc-900/50 border border-dashed border-zinc-700 rounded-2xl p-5 mb-8"
    >
      <div className="w-24">
        <label className="block text-xs text-zinc-500 mb-1">שבוע מס'</label>
        <input
          name="week_number"
          type="number"
          defaultValue={nextWeekNumber}
          required
          className="w-full bg-zinc-950 border border-zinc-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
        />
      </div>
      <div className="flex-1 min-w-[160px]">
        <label className="block text-xs text-zinc-500 mb-1">
          כותרת (אופציונלי)
        </label>
        <input
          name="title"
          placeholder="למשל: התמקדות בפלג גוף עליון"
          className="w-full bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
        />
      </div>
      <SubmitButton
        pendingText="מוסיף..."
        className="flex items-center gap-1.5 bg-orange-500 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-orange-400 hover:shadow-lg hover:shadow-orange-500/20 transition-all"
      >
        <span className="text-base leading-none">+</span> הוסף שבוע
      </SubmitButton>
    </form>
  );
}
