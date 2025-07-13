// Utility function to merge class names conditionally
export function cn(...inputs: Array<string | Record<string, boolean> | undefined | null | false>): string {
  return inputs
    .flatMap(input => {
      if (typeof input === 'string') {
        return input.trim();
      }
      if (typeof input === 'object' && input !== null) {
        return Object.entries(input)
          .filter(([, value]) => Boolean(value))
          .map(([key]) => key);
      }
      return [];
    })
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}
