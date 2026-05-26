import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [],
      },
    ],
    sitemap: "https://skills.vishalvoid.com/sitemap.xml",
    host: "https://skills.vishalvoid.com",
    // LLM-readable index for AI crawlers
    // https://skills.vishalvoid.com/llms.txt
  };
}
