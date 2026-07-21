"use client";

// error.js הוא "רשת ביטחון" - אם משהו בעמוד האדמין נכשל (למשל שגיאה
// מהשרת), Next.js מציג את זה במקום לקרוס לגמרי לעמוד שגיאה כללי.
export default function AdminError({ error, reset }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="text-4xl mb-4">⚠️</div>
        <h1 className="text-xl font-bold text-white mb-2">
          משהו השתבש
        </h1>
        <p className="text-zinc-400 text-sm mb-6">
          {error?.message?.includes("duplicate key")
            ? "המספר שבחרת כבר קיים - נסה מספר אחר."
            : "אירעה שגיאה זמנית. אפשר לנסות שוב."}
        </p>
        <button
          onClick={reset}
          className="bg-orange-500 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-orange-400 transition-colors"
        >
          נסה שוב
        </button>
      </div>
    </div>
  );
}
