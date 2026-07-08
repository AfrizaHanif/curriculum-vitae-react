import {
  portfolioItems,
  caseStudyItems,
  diagramCSItems,
  solutionCSItems,
} from "@/lib/data/portfolioData";
import {
  ChallengesSection,
  DefaultSection,
  DesignSection,
  GoalBenefitsSection,
  OverviewSection,
  ProblemSection,
  ProcessSection,
  ResultsSection,
  RoleSection,
  TechStackSection,
} from "./sections";

type PortfolioItem = (typeof portfolioItems)[number];
type CaseStudyItem = (typeof caseStudyItems)[number];
type DiagramItem = (typeof diagramCSItems)[number];
type SolutionItem = (typeof solutionCSItems)[number];

interface SectionContentProps {
  sectionId: string;
  sectionTitle: string;
  item: PortfolioItem;
  caseStudy?: CaseStudyItem;
  diagram?: DiagramItem;
  solution?: SolutionItem[];
}

// WARNING: This must match with id of ScrollSpy Nav
const sectionComponents: { [key: string]: React.ComponentType<SectionContentProps> } = {
  overview: OverviewSection,
  role: RoleSection,
  problem: ProblemSection,
  "goal-benefits": GoalBenefitsSection,
  design: DesignSection,
  "tech-stack": TechStackSection,
  process: ProcessSection,
  challenges: ChallengesSection,
  results: ResultsSection,
};

export default function SectionContent(props: SectionContentProps) {
  // Set ID and Title as props
  const { sectionId, sectionTitle } = props;

  // Get ID from sectionComponents
  const SectionComponent = sectionComponents[sectionId];

  // Check if data available (Via ID)
  if (SectionComponent) {
    return <SectionComponent {...props} />;
  }

  // Back to default section (Not available / fallback)
  return <DefaultSection sectionTitle={sectionTitle} />;
}
