export function removeDuplicates<T>(array: T[], getKey: (item: T) => string | number): T[] {
  const seen = new Set<string | number>();
  return array.filter((item) => {
    const key = getKey(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
