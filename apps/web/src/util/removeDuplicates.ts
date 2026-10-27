export function removeDuplicates<T>(duplicates: T[], key: (item: T) => string | number): T[] {
  const map = new Map<string | number, T>();

  for (const item of duplicates) {
    const id = key(item);
    map.set(id, item);
  }

  return Array.from(map.values());
}
