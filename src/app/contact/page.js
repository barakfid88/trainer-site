"use client";

import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="max-w-md mx-auto px-6 py-32 text-center">
        <p className="text-orange-500 font-bold tracking-widest text-sm mb-3">
          תודה רבה
        </p>
        <h1 className="text-3xl font-bold text-white mb-3">
          תודה, {name}!
        </h1>
        <p className="text-zinc-400">
          קיבלתי את ההודעה שלך, אחזור אליך בהקדם האפשרי.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <div className="text-center mb-10">
        <p className="text-orange-500 font-bold tracking-widest text-sm mb-2">
          בואו נדבר
        </p>
        <h1 className="text-3xl font-bold text-white">צור קשר</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 bg-zinc-900 border border-zinc-800 rounded-2xl p-8"
      >
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">
            שם מלא
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="השם שלך"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">
            טלפון
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="050-0000000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-1">
            הודעה
          </label>
          <textarea
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full bg-zinc-950 border border-zinc-700 text-white placeholder-zinc-500 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="ספר לי קצת על המטרות שלך"
          />
        </div>
        <button
          type="submit"
          className="bg-orange-500 text-white px-6 py-3 rounded-full font-medium hover:bg-orange-400 transition-colors"
        >
          שלח הודעה
        </button>
      </form>
    </div>
  );
}
