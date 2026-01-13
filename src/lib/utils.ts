/**
 * Formats a date range into a clean string.
 * e.g., "Jan 2023 - Present" or "Jan 2023 - Mar 2023".
 *
 * @param startDate The start date of the period.
 * @param finishDate The end date of the period (can be null for ongoing).
 * @returns A formatted date range string.
 */
export function formatDateRange(
  startDate: string | Date,
  finishDate?: string | Date | null
): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
  };

  const start = new Date(startDate).toLocaleDateString("id-ID", options);

  if (!finishDate) {
    return `${start} - Sekarang`;
  }

  const finish = new Date(finishDate).toLocaleDateString("id-ID", options);
  return `${start} - ${finish}`;
}

export const formatDate = (
  dateString: string,
  locale: string = "id-ID"
): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Intl.DateTimeFormat(locale, options).format(date);
};

export function sortItemsByDate<T extends { date: string | Date }>(
  items: readonly T[]
): T[] {
  return [...items].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

// export const sortedItems = items
//     .slice() // Create a shallow copy to avoid mutating original state/prop
//     .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically by name

export function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // remove punctuation
    .trim()
    .replace(/\s+/g, "-"); // spaces → hyphens
}

export const isActiveLink = (pathname: string, href?: string) => {
  if (!href) return false;
  return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
};
