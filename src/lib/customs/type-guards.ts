import {
  DataFeatureItem,
  EducationFeatureData,
  ExperienceFeatureData,
} from "./resume-feature-types";

export function isExperienceData(
  item: DataFeatureItem,
): item is ExperienceFeatureData {
  return item.type === "experience";
}

export function isEducationData(
  item: DataFeatureItem,
): item is EducationFeatureData {
  return item.type === "education";
}
