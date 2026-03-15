// Auto-discovers all MDX posts and exports their metadata
// In a real setup we'd use import.meta.glob, but for SSG we keep it explicit

interface PostMeta {
  title: string;
  date: string;
  slug: string;
  summary: string;
}

// Import meta from each post
import { meta as subagentTiming } from "./posts/subagent-timing-problem.mdx";
import { meta as taskResumptionHardening } from "./posts/task-resumption-hardening.mdx";
import { meta as watchlistOnDemandSystem } from "./posts/watchlist-on-demand-system.mdx";
import { meta as layoutTransitionFieldReport } from "./posts/layout-transition-field-report.mdx";

export const posts: PostMeta[] = [
  subagentTiming,
  taskResumptionHardening,
  watchlistOnDemandSystem,
  layoutTransitionFieldReport,
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export type { PostMeta };
