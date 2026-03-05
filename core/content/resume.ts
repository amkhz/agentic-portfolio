export interface ResumeContactItem {
  label: string;
  href?: string;
}

export interface ResumeExperience {
  role: string;
  company: string;
  date: string;
  summary?: string;
  bullets: string[];
}

export interface ResumeEducationItem {
  degree: string;
  institution: string;
  year?: string;
}

export interface ResumeSkillGroup {
  label: string;
  items: string[];
}

export interface ResumeModel {
  name: string;
  title: string;
  contacts: ResumeContactItem[];
  profile: string[];
  experience: ResumeExperience[];
  education: ResumeEducationItem[];
  skillGroups: ResumeSkillGroup[];
  professionalDevelopment: string[];
  rawSections: Array<{ heading: string; lines: string[] }>;
}

function stripMdStrong(value: string): string {
  return value.replace(/\*\*(.*?)\*\*/g, "$1").trim();
}

function parseInlineLink(token: string): ResumeContactItem {
  const linkMatch = token.match(/\[([^\]]+)\]\(([^)]+)\)/);
  if (!linkMatch) return { label: token.trim() };

  return {
    label: linkMatch[1].trim(),
    href: linkMatch[2].trim(),
  };
}

function normalizeContactHref(item: ResumeContactItem): ResumeContactItem {
  if (!item.href) {
    if (item.label.includes("@")) {
      return { ...item, href: `mailto:${item.label}` };
    }
    return item;
  }

  if (item.href.startsWith("http://") || item.href.startsWith("https://")) {
    return item;
  }

  if (item.href.includes("@")) {
    return { ...item, href: `mailto:${item.href}` };
  }

  return item;
}

function parseHeader(lines: string[]): {
  name: string;
  title: string;
  contacts: ResumeContactItem[];
} {
  const name = lines.find((line) => line.startsWith("# "))?.replace("# ", "").trim() ?? "";
  const title = stripMdStrong(
    lines.find((line) => line.startsWith("**") && line.endsWith("**")) ?? ""
  );

  const contactLine = lines
    .find((line) => {
      const trimmed = line.trim();
      if (!trimmed.includes("|")) return false;
      if (trimmed.startsWith("#")) return false;
      if (trimmed.startsWith("## ")) return false;
      if (trimmed.startsWith("**") && trimmed.endsWith("**")) return false;
      return trimmed.includes("@") || trimmed.includes("](");
    })
    ?.trim();

  const contacts = contactLine
    ? contactLine.split("|").map((token) => normalizeContactHref(parseInlineLink(token.trim())))
    : [];

  return { name, title, contacts };
}

function sectionLines(lines: string[], section: string): string[] {
  const start = lines.findIndex((line) => line.trim() === `## ${section}`);
  if (start < 0) return [];

  const end = lines.findIndex(
    (line, index) => index > start && line.startsWith("## ")
  );

  const block = end < 0 ? lines.slice(start + 1) : lines.slice(start + 1, end);
  return block.map((line) => line.trimEnd()).filter((line) => line.length > 0);
}

function parseProfile(lines: string[]): string[] {
  return sectionLines(lines, "Profile").filter((line) => !line.startsWith("## "));
}

function parseExperience(lines: string[]): ResumeExperience[] {
  const block = sectionLines(lines, "Professional Experience");
  const entries: ResumeExperience[] = [];
  let current: ResumeExperience | null = null;

  for (const line of block) {
    if (line.startsWith("### ")) {
      if (current) entries.push(current);

      const heading = line.replace("### ", "").trim();
      const [role, company = ""] = heading.split("|").map((part) => part.trim());
      current = {
        role,
        company,
        bullets: [],
        summary: undefined,
        date: "",
      };
      continue;
    }

    if (!current) continue;

    if (line.startsWith("**") && line.endsWith("**")) {
      current.date = stripMdStrong(line);
      continue;
    }

    if (line.startsWith("- ")) {
      current.bullets.push(line.replace(/^- /, "").trim());
      continue;
    }

    if (!current.summary) {
      current.summary = stripMdStrong(line);
    }
  }

  if (current) entries.push(current);
  return entries;
}

function parseEducation(lines: string[]): ResumeEducationItem[] {
  const block = sectionLines(lines, "Education");
  return block
    .filter((line) => line.startsWith("**"))
    .map((line) => {
      const parts = line.split("|").map((part) => stripMdStrong(part.trim()));
      return {
        degree: parts[0] ?? "",
        institution: parts[1] ?? "",
        year: parts[2],
      };
    });
}

function parseSkillGroups(lines: string[]): ResumeSkillGroup[] {
  const block = sectionLines(lines, "Skills & Expertise");
  return block
    .filter((line) => line.startsWith("**"))
    .map((line) => {
      const match =
        line.match(/^\*\*(.+?):\*\*\s*(.+)$/) ??
        line.match(/^\*\*(.+?)\*\*:\s*(.+)$/);

      if (!match) return { label: stripMdStrong(line), items: [] };

      return {
        label: match[1].trim(),
        items: match[2]
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      };
    });
}

function parseProfessionalDevelopment(lines: string[]): string[] {
  const block = sectionLines(lines, "Professional Development");
  return block.map((line) => stripMdStrong(line));
}

function parseRawSections(lines: string[]): Array<{ heading: string; lines: string[] }> {
  const sections: Array<{ heading: string; lines: string[] }> = [];
  let currentHeading = "";
  let currentLines: string[] = [];

  for (const line of lines) {
    if (line.startsWith("## ")) {
      if (currentHeading) {
        sections.push({ heading: currentHeading, lines: currentLines });
      }
      currentHeading = line.replace("## ", "").trim();
      currentLines = [];
      continue;
    }

    if (currentHeading && line.trim().length > 0) {
      currentLines.push(line);
    }
  }

  if (currentHeading) {
    sections.push({ heading: currentHeading, lines: currentLines });
  }

  return sections;
}

export async function getResumeModel(): Promise<ResumeModel> {
  const response = await fetch('/1pageresume.md');
  const markdown = await response.text();
  const lines = markdown.split(/\r?\n/).map((line) => line.trimEnd());
  const { name, title, contacts } = parseHeader(lines);

  return {
    name,
    title,
    contacts,
    profile: parseProfile(lines),
    experience: parseExperience(lines),
    education: parseEducation(lines),
    skillGroups: parseSkillGroups(lines),
    professionalDevelopment: parseProfessionalDevelopment(lines),
    rawSections: parseRawSections(lines),
  };
}
