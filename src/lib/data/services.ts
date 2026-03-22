import { cache } from "react";
import {
  portfolioItems,
  projectItems,
  caseStudyItems,
  diagramCSItems,
  solutionCSItems,
} from "./portfolioData";
import { blogItems } from "./blogData";

// Get all items from the data service
export const getAllPortfolioItems = () => portfolioItems;
export const getAllProjectItems = () => projectItems;
export const getAllBlogItems = () => blogItems;

// Get selected item based on slug or ID from the data service
export const getPortfolioItem = cache((slug: string) => {
  try {
    const decodedSlug = decodeURIComponent(slug);
    return portfolioItems.find(
      (p) =>
        p.slug.toLowerCase() === decodedSlug.toLowerCase() ||
        p.id === decodedSlug,
    );
  } catch (error) {
    console.error(error);
    return undefined;
  }
});
export const getProjectItem = cache((slug: string) => {
  try {
    const decodedSlug = decodeURIComponent(slug);
    return projectItems.find(
      (p) =>
        p.slug.toLowerCase() === decodedSlug.toLowerCase() ||
        p.id === decodedSlug,
    );
  } catch (error) {
    console.error(error);
    return undefined;
  }
});
export const getBlogItem = cache((slug: string) => {
  try {
    const decodedSlug = decodeURIComponent(slug);
    return blogItems.find(
      (p) =>
        p.slug.toLowerCase() === decodedSlug.toLowerCase() ||
        p.id === decodedSlug,
    );
  } catch (error) {
    console.error(error);
    return undefined;
  }
});

// Get items based on category or type from the data service
export const getCaseStudy = cache((portfolioId: string) => {
  return caseStudyItems.find((cs) => cs.portfolio_id === portfolioId);
});
export const getDiagram = cache((caseStudyId: string) => {
  return diagramCSItems.find((d) => d.case_study_id === caseStudyId);
});
export const getSolutions = cache((caseStudyId: string) => {
  return solutionCSItems.filter((s) => s.case_study_id === caseStudyId);
});
