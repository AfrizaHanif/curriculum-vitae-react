import {
  DataFeatureItem,
  EducationFeatureData,
  ExperienceFeatureData,
} from "./data-types";

export function isExperienceData(
  item: DataFeatureItem
): item is ExperienceFeatureData {
  return item.type === "experience";
}

export function isEducationData(
  item: DataFeatureItem
): item is EducationFeatureData {
  return item.type === "education";
}
