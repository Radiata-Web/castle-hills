import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = "https://chstainandrestoration.com";
  return [
    {
      url: `${url}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 2,
    },
    {
      url: `${url}/fence-staining`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0,
    },
    {
      url: `${url}/metal-fences`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0,
    },
    {
      url: `${url}/automatic-gates`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0,
    },
    {
      url: `${url}/pergolas-and-patio-covers`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0,
    },
    {
      url: `${url}/interior-painting`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0,
    },
    {
      url: `${url}/exterior-painting`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0,
    },
    {
      url: `${url}/custom-wood-structures-outdoor-design`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${url}/our-expertise`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${url}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${url}/luxury-finishes-coatings`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${url}/interior-exterior-restoration-renovation`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
  ];
}
