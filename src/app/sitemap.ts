import { MetadataRoute } from "next";
import { blogItems } from "@/lib/data/blogData";
import {
  caseStudyItems,
  portfolioItems,
  projectItems,
} from "@/lib/data/portfolioData";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // Replace with your actual website URL
  const baseUrl = "https://afrizahanif.com";

  // Get all portfolio items that have a case study
  const portfolioWithCaseStudies = portfolioItems.filter((p) =>
    caseStudyItems.some((cs) => cs.portfolio_id === p.id),
  );

  // Map blog items to sitemap format
  const blogRoutes = blogItems.map((item) => ({
    url: `${baseUrl}/blog/${item.slug}`,
    lastModified: new Date(), // Or use a date from your item data if available
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Map project items to sitemap format
  const projectRoutes = projectItems.map((item) => ({
    url: `${baseUrl}/project/${item.slug}`,
    lastModified: new Date(), // Or use a date from your item data if available
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Map portfolio items to sitemap format
  const portfolioRoutes = portfolioItems.map((item) => ({
    url: `${baseUrl}/portfolio/${item.slug}`,
    lastModified: new Date(), // Or use a date from your item data if available
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  // Map case studies to sitemap format
  const caseStudyRoutes = portfolioWithCaseStudies.map((item) => ({
    url: `${baseUrl}/portfolio/${item.slug}/case-study`,
    lastModified: new Date(), // Or use a date from your item data if available
    changeFrequency: "weekly" as const,
    priority: 1.0,
  }));

  // Define static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/project`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/profile`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/setup`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/expertise`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resume`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/testimony`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/colophon`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];

  return [
    ...staticRoutes,
    ...blogRoutes,
    ...projectRoutes,
    ...portfolioRoutes,
    ...caseStudyRoutes,
  ];
}
