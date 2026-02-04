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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sectionComponents: { [key: string]: React.ComponentType<any> } = {
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
  const { sectionId, sectionTitle } = props;

  const SectionComponent = sectionComponents[sectionId];

  if (SectionComponent) {
    return <SectionComponent {...props} />;
  }

  return <DefaultSection sectionTitle={sectionTitle} />;
}
