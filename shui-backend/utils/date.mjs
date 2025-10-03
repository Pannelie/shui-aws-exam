import { DateTime } from "luxon";

export const formatDateForResponse = (date) => {
  if (!date) return null;

  const dt = DateTime.fromISO(date, { zone: "Europe/Stockholm" });

  return dt.toFormat("yyyy-MM-dd HH:mm"); // Exempel: "2025-10-03 11:10"
};
