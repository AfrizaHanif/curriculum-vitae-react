import { cache } from "react";
import {
  portfolioItems,
  caseStudyItems,
  diagramCSItems,
  solutionCSItems,
} from "./portfolioData";

export const getAllPortfolioItems = () => portfolioItems;

export const getPortfolioItem = cache((slug: string) => {
  try {
    const decodedSlug = decodeURIComponent(slug);
    return portfolioItems.find(
      (p) =>
        p.slug.toLowerCase() === decodedSlug.toLowerCase() ||
        p.id === decodedSlug,
    );
  } catch (error) {
    return undefined;
  }
});

export const getCaseStudy = cache((portfolioId: string) => {
  return caseStudyItems.find((cs) => cs.portfolio_id === portfolioId);
});

export const getDiagram = cache((caseStudyId: string) => {
  return diagramCSItems.find((d) => d.case_study_id === caseStudyId);
});

export const getSolutions = cache((caseStudyId: string) => {
  return solutionCSItems.filter((s) => s.case_study_id === caseStudyId);
});
