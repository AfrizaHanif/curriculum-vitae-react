/* eslint-disable @typescript-eslint/no-explicit-any */
// d:\My Projects\React\curriculum-vitae\src\lib\normalize.ts

// Define what a mapping rule can be:
// 1. A string (direct mapping)
// 2. An array of strings (fallback: try first, then second, etc.)
// 3. A function (custom transformation for combining columns)
// 4. An object with a transform function (explicit transformation)

export type MappingRule<T> =
  | string
  | string[]
  | ((item: T) => any)
  | { transform: (item: T) => any };

export type NormalizationRules<T> = Record<string, MappingRule<T>>;

/**
 * Normalizes an array of data objects based on provided mapping rules.
 * This is useful when API column names differ from Frontend component props.
 *
 * @param data - The array of data objects to normalize.
 * @param rules - An object where keys are the target properties and values are rules.
 * @param defaults - Optional default values to be applied to each object.
 * @returns A new array with normalized objects.
 */

export function normalizeData<T = any>(
  data: T[] | undefined,
  rules: NormalizationRules<T>,
  defaults?: Partial<T>,
): T[] {
  if (!Array.isArray(data)) {
    return [];
  }

  return data.map((item) => {
    // Apply defaults first, then preserve existing properties

    const normalizedItem: any = { ...defaults, ...item };

    for (const [targetKey, rule] of Object.entries(rules)) {
      if (typeof rule === "function") {
        // CASE: Custom transformation (e.g., multiple columns to one)
        // Example: fullName: (item) => `${item.first_name} ${item.last_name}`
        normalizedItem[targetKey] = rule(item);
      } else if (Array.isArray(rule)) {
        // CASE: Fallback strategy (one of multiple columns to one)
        // Example: title: ['name', 'title', 'label']
        const value = rule

          .map((key) => (item as any)[key])
          .find((val) => val !== undefined && val !== null && val !== "");

        if (value !== undefined) {
          normalizedItem[targetKey] = value;
        }
      } else if (typeof rule === "string") {
        // CASE: Direct mapping (rename)
        // Example: label: 'category_name'
        const value = (item as any)[rule];
        if (value !== undefined) {
          normalizedItem[targetKey] = value;
        }
      } else if (rule && typeof rule === "object" && "transform" in rule) {
        // CASE: Object with transform function
        const value = rule.transform(item);
        if (value !== undefined) {
          normalizedItem[targetKey] = value;
        }
      }
    }

    return normalizedItem;
  });
}
