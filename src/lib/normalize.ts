// d:\My Projects\React\curriculum-vitae\src\lib\normalize.ts

// Define what a mapping rule can be:
// 1. A string (direct mapping)
// 2. An array of strings (fallback: try first, then second, etc.)
// 3. A function (custom transformation for combining columns)
// 4. An object with a transform function (explicit transformation)

export type MappingRule<TSource, TTargetValue> =
  | string
  | string[]
  | ((item: TSource) => TTargetValue)
  | { transform: (item: TSource) => TTargetValue };

export type NormalizationRules<TSource, TTarget> = {
  [K in keyof TTarget]?: MappingRule<TSource, TTarget[K]>;
};

/**
 * Normalizes an array of data objects based on provided mapping rules.
 * This is useful when API column names differ from Frontend component props.
 *
 * @param data - The array of data objects to normalize.
 * @param rules - An object where keys are the target properties and values are rules.
 * @param defaults - Optional default values to be applied to each object.
 * @returns A new array with normalized objects.
 */

export function normalizeData<TTarget, TSource = Record<string, unknown>>(
  data: TSource[] | undefined,
  rules: NormalizationRules<TSource, TTarget>,
  defaults?: Partial<TTarget>,
): TTarget[] {
  if (!Array.isArray(data)) {
    return [];
  }

  return data.map((item) => {
    // Apply defaults first, then preserve existing properties
    const normalizedItem = { ...defaults, ...item } as unknown as TTarget;

    for (const [targetKey, rule] of Object.entries(rules)) {
      const key = targetKey as keyof TTarget;
      if (typeof rule === "function") {
        // CASE: Custom transformation (e.g., multiple columns to one)
        // Example: fullName: (item) => `${item.first_name} ${item.last_name}`
        normalizedItem[key] = rule(item);
      } else if (Array.isArray(rule)) {
        // CASE: Fallback strategy (one of multiple columns to one)
        // Example: title: ['name', 'title', 'label']
        const value = rule
          .map((k) => (item as Record<string, unknown>)[k])
          .find((val) => val !== undefined && val !== null && val !== "");

        if (value !== undefined) {
          normalizedItem[key] = value as unknown as TTarget[keyof TTarget];
        }
      } else if (typeof rule === "string") {
        // CASE: Direct mapping (rename)
        // Example: label: 'category_name'
        const value = (item as Record<string, unknown>)[rule];
        if (value !== undefined) {
          normalizedItem[key] = value as unknown as TTarget[keyof TTarget];
        }
      } else if (rule && typeof rule === "object" && "transform" in rule) {
        // CASE: Object with transform function
        const value = (rule as { transform: (item: TSource) => unknown }).transform(item);
        if (value !== undefined) {
          normalizedItem[key] = value as unknown as TTarget[keyof TTarget];
        }
      }
    }

    return normalizedItem;
  });
}

