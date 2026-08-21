import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://hamza-manzoor.vercel.app";
  const projectIds = [
    "voxbee",
    "romingo",
    "theqube",
    "xeurix",
    "lartigiano",
    "camperoni",
    "whatshush",
    "logaura",
  ];
  const buildDate = new Date("2025-02-21T00:00:00.000Z");

  const projectUrls = projectIds.map((id) => ({
    url: `${baseUrl}/projects/${id}`,
    lastModified: buildDate,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: buildDate,
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: buildDate,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: buildDate,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    ...projectUrls,
  ];
}
