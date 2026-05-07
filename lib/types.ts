export type ProjectCategory = "IoT" | "Web" | "Embedded" | "AI" | "Other";

export interface Project {
  id: string;
  title: string;
  description: string;
  long_description: string | null;
  tags: string[];
  category: ProjectCategory;
  github_url: string | null;
  demo_url: string | null;
  image_url: string | null;
  created_at: string;
}

export type ProjectInsert = Omit<Project, "id" | "created_at">;

export const CATEGORY_COLORS: Record<ProjectCategory, string> = {
  IoT: "text-teal-400 border-teal-500/30 bg-teal-500/10",
  Web: "text-blue-400 border-blue-500/30 bg-blue-500/10",
  Embedded: "text-orange-400 border-orange-500/30 bg-orange-500/10",
  AI: "text-purple-400 border-purple-500/30 bg-purple-500/10",
  Other: "text-slate-400 border-slate-500/30 bg-slate-500/10",
};
