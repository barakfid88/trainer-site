"use client";

// window.print() פותח את דיאלוג ההדפסה הרגיל של הדפדפן, ובו אפשר
// לבחור "Save as PDF" - כך מייצאים PDF בלי צורך בשום ספרייה חיצונית.
export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="flex items-center gap-1.5 bg-zinc-800 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-zinc-700 transition-colors border border-zinc-700"
    >
      🖨️ ייצוא ל-PDF
    </button>
  );
}
