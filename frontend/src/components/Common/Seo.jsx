import React from "react";
import { Helmet } from "react-helmet-async";
import {
  SEO,
  SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
} from "../../data/seoData";

export default function Seo({ page }) {
  const meta = SEO[page];
  if (!meta) return null;

  const url = `${SITE_URL}${meta.path === "/" ? "" : meta.path}`;

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={DEFAULT_OG_IMAGE} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
    </Helmet>
  );
}