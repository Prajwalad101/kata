export default function isString(value: unknown): value is string {
  if (typeof value === "string") {
    return true;
  }
  return false;
}
