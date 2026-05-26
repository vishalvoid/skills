import type { MetadataRoute } from "next";
import { skills } from "@/data/skills";
import { externalSkills } from "@/data/external-skills";

const BASE = "https://skills.vishalvoid.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const ownSkillPages: MetadataRoute.Sitemap = skills.map((skill) => ({
    url: `${BASE}/${skill.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const externalSkillPages: MetadataRoute.Sitemap = externalSkills.map((skill) => ({
    url: `${BASE}/skills/anthropic/${skill.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    {
      url: BASE,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE}/skills`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...ownSkillPages,
    ...externalSkillPages,
  ];
}
