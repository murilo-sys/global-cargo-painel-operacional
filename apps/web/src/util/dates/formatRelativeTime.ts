export function formatRelativeTime(original: Date, now: Date): string {
  //difference on milliseconds
  const differencePerMs = Math.max(0, now.getTime() - original.getTime());

  const differencePerHour: number = Math.floor(differencePerMs / (1000 * 60 * 60));
  const differencePerMinute: number = Math.floor((differencePerMs % (1000 * 60 * 60)) / (1000 * 60));

  return `${differencePerHour}h ${differencePerMinute}m`;
}
