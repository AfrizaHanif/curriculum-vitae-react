// This file is the collection of object's data that can be customizable depend what you need. This can be replace description
// NOTE: This require to use custom component from Custom folder and use map() inside of page.tsx

interface BaseFeatureData {
  location: string;
  status: "Planning" | "Ongoing" | "Stopped" | "Finished";
  description?: string;
  latitude?: number;
  longitude?: number;
  start_period: Date;
  finish_period?: Date;
}

export interface EducationFeatureData extends BaseFeatureData {
  type: "education";
  degree: string;
  major: string;
  gpa?: number;
}

export interface ExperienceFeatureData extends BaseFeatureData {
  type: "experience";
  title: string;
}

export type DataFeatureItem = EducationFeatureData | ExperienceFeatureData;

export interface SetupItem {
  name: string;
  category: string;
  description: string;
  why?: string;
}
