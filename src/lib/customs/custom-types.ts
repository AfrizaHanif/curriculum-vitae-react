// This file is the collection of customized itemtype
// NOTE:
// This require to use custom component from Custom folder and use map() inside of page.tsx

import { DataFeatureItem } from "./resume-feature-types";
import { FeatureItem } from "../../types/bootstrap-types";

// Feature
export interface ResumeFeatureItem extends FeatureItem {
  data?: DataFeatureItem[];
}

export interface ExpertiseFeatureItem extends FeatureItem {
  projects?: string[];
}
