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
  finishDate?: string | Date | null,
  locale: string = "id-ID",
): string {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
  };

  const start = new Date(startDate).toLocaleDateString(locale, options);

  if (!finishDate) {
    return `${start} - Sekarang`;
  }

  const finish = new Date(finishDate).toLocaleDateString(locale, options);
  return `${start} - ${finish}`;
}

export const formatDate = (
  dateString: string,
  locale: string = "id-ID",
): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Intl.DateTimeFormat(locale, options).format(date);
};

export type SortOrder = "newest" | "oldest" | "az" | "za";

interface SortConfig<T> {
  sortOrder: SortOrder;
  titleKey: keyof T;
  primaryDateKey: keyof T;
  secondaryDateKey?: keyof T;
  nullPrimaryDateValue?: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function sortItems<T extends Record<string, any>>(
  items: readonly T[],
  config: SortConfig<T>,
): T[] {
  const {
    sortOrder,
    titleKey,
    primaryDateKey,
    secondaryDateKey,
    nullPrimaryDateValue = Infinity,
  } = config;

  return [...items].sort((a, b) => {
    // Alphabet sorting
    if (sortOrder === "az") {
      return String(a[titleKey]).localeCompare(String(b[titleKey]));
    }
    if (sortOrder === "za") {
      return String(b[titleKey]).localeCompare(String(a[titleKey]));
    }

    // Date sorting
    const valA = a[primaryDateKey]
      ? new Date(a[primaryDateKey]).getTime()
      : nullPrimaryDateValue;
    const valB = b[primaryDateKey]
      ? new Date(b[primaryDateKey]).getTime()
      : nullPrimaryDateValue;

    const tieBreaker = () => {
      if (secondaryDateKey) {
        const secondaryA = new Date(a[secondaryDateKey]).getTime();
        const secondaryB = new Date(b[secondaryDateKey]).getTime();
        return sortOrder === "oldest"
          ? secondaryA - secondaryB
          : secondaryB - secondaryA;
      }
      return 0;
    };

    if (sortOrder === "oldest") {
      // ascending
      if (valA !== valB) return valA - valB;
      return tieBreaker();
    }

    // (Default) newest, descending
    if (valA !== valB) return valB - valA;
    return tieBreaker();
  });
}

export function sortItemsByDate<T extends { date: string | Date }>(
  items: readonly T[],
): T[] {
  return [...items].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function sortItemsByDateKey<T>(items: T[], key: keyof T): T[] {
  return [...items].sort((a, b) => {
    const dateA = new Date(a[key] as string | number | Date).getTime();
    const dateB = new Date(b[key] as string | number | Date).getTime();
    return dateB - dateA;
  });
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

// export const isActiveLink = (pathname: string, href?: string) => {
//   if (!href) return false;
//   return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
// };
export function isActiveLink(
  pathname: string,
  href: string | undefined,
): boolean {
  if (!href || href === "#") {
    return false;
  }

  // Handle exact match for the root path.
  if (href === "/") {
    return pathname === "/";
  }

  // For other paths, check for an exact match or if the current path is a sub-path.
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function formatMonthYear(date: string | Date, locale: string = "id-ID") {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString(locale, {
    month: "short",
    year: "numeric",
  });
}

export function getPathname(url: string | undefined): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("http")) {
    try {
      return new URL(url).pathname;
    } catch {
      return url;
    }
  }
  return url;
}
