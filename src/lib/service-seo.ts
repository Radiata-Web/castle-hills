import { jsonLdScript, pageHead, type PageMeta } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

type ServicePageSeo = PageMeta & {
  serviceName: string;
  serviceType: string;
  breadcrumbs: { name: string; path: string }[];
};

export function servicePageHead(meta: ServicePageSeo) {
  const head = pageHead(meta);
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: meta.breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path === "/" ? "" : crumb.path}`,
    })),
  };

  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: meta.serviceName,
    serviceType: meta.serviceType,
    description: meta.description,
    url: `${SITE_URL}${meta.pathname}`,
    provider: {
      "@type": "LocalBusiness",
      name: "Castle Hills Stain & Restoration",
      url: SITE_URL,
      areaServed: {
        "@type": "AdministrativeArea",
        name: "Dallas–Fort Worth",
      },
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Dallas–Fort Worth",
    },
  };

  return {
    ...head,
    scripts: [jsonLdScript([breadcrumbList, service])],
  };
}
