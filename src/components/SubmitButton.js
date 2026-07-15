"use client";

import { useFormStatus } from "react-dom";

// כפתור submit "חכם" - יודע אוטומטית אם הטופס שהוא נמצא בתוכו
// באמצע שליחה (pending), ומציג פידבק ויזואלי במקום שהכפתור
// יישאר "מת" בלי שום סימן שמשהו קורה. useFormStatus קורא את
// המצב של ה-<form> הקרוב ביותר מעליו אוטומטית.
export default function SubmitButton({
  children,
  pendingText,
  className = "",
  ...props
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`${className} disabled:opacity-50 disabled:cursor-wait transition-opacity`}
      {...props}
    >
      {pending ? (pendingText ?? "...") : children}
    </button>
  );
}
