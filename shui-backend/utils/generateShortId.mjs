import { v4 as uuid } from "uuid";

export function generateShortId(length = 4) {
  return uuid().replace(/-/g, "").substring(0, length);
}
