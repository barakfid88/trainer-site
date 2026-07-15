import { redirect } from "next/navigation";

// /plan (בלי slug) היה הקישור הישן מלפני שהוספנו תמיכה בכמה
// אדמינים. במקום לשבור אותו, פשוט מפנים לקישור האישי של ברק.
export default function PlanRedirect() {
  redirect("/plan/barak");
}
