import type { MetadataRoute } from "next";
import { PROVIDER_SLUGS } from "@/data/external-skills";

const BASE = "https://skills.vishalvoid.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const providerPages: MetadataRoute.Sitemap = PROVIDER_SLUGS.map(({ id }) => ({
    url: `${BASE}/skills/${id}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const skillPages: MetadataRoute.Sitemap = PROVIDER_SLUGS.flatMap(({ id, slugs }) =>
    slugs.map((slug) => ({
      url: `${BASE}/skills/${id}/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

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
    ...providerPages,
    ...skillPages,
  ];
}
