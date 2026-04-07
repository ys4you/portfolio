import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
}

const DEFAULTS = {
  siteName: "Yesse Seijnaeve",
  title: "Yesse Seijnaeve — Game & Web Developer",
  description:
    "Game development student and web developer building ray tracers, voxel engines, and full-stack web applications.",
  image: "/images/og-default.png",
  url: "https://yesseseijn.com",
};

/**
 * Sets document title and Open Graph / Twitter meta tags.
 * Drop <SEO /> into any page component.
 */
export default function SEO({
  title,
  description,
  image,
  url,
  type = "website",
}: SEOProps) {
  const fullTitle = title
    ? `${title} — ${DEFAULTS.siteName}`
    : DEFAULTS.title;
  const metaDescription = description || DEFAULTS.description;
  const metaImage = image || DEFAULTS.image;
  const metaUrl = url || DEFAULTS.url;

  useEffect(() => {
    document.title = fullTitle;

    setMeta("description", metaDescription);

    // Open Graph
    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", metaDescription, "property");
    setMeta("og:image", metaImage, "property");
    setMeta("og:url", metaUrl, "property");
    setMeta("og:type", type, "property");
    setMeta("og:site_name", DEFAULTS.siteName, "property");

    // Twitter Card
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", metaDescription);
    setMeta("twitter:image", metaImage);
  }, [fullTitle, metaDescription, metaImage, metaUrl, type]);

  return null;
}

function setMeta(
  nameOrProp: string,
  content: string,
  attr: "name" | "property" = "name"
) {
  let el = document.querySelector(
    `meta[${attr}="${nameOrProp}"]`
  ) as HTMLMetaElement | null;

  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, nameOrProp);
    document.head.appendChild(el);
  }

  el.setAttribute("content", content);
}
