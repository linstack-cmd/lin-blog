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

export const posts: PostMeta[] = [subagentTiming, taskResumptionHardening].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

export type { PostMeta };
