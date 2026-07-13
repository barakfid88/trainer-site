const services = [
  {
    title: "אימון אישי",
    description: "מפגשי אימון אחד על אחד, מותאמים אישית למטרות שלך.",
  },
  {
    title: "בניית תוכנית אימונים",
    description: "תוכנית אימונים מלאה שתוכל להתקדם לפיה באופן עצמאי.",
  },
  {
    title: "ליווי תזונתי",
    description: "הכוונה תזונתית בסיסית שתומכת במטרות האימון שלך.",
  },
];

export default function Services() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold text-white mb-8">השירותים שלי</h1>
      <div className="grid gap-6 sm:grid-cols-3">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-zinc-900 rounded-xl shadow-sm p-6 border border-zinc-800 border-t-4 border-t-orange-500"
          >
            <h2 className="text-lg font-semibold text-white mb-2">
              {service.title}
            </h2>
            <p className="text-zinc-400 text-sm leading-6">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
