/**
 * SEO Component
 * 
 * Manages document head metadata for SEO optimization, including title, 
 * description, OpenGraph tags, Twitter cards, and canonical URLs.
 * 
 * @example
 * ```tsx
 * <SEO 
 *   title="Services | Recovery Office"
 *   description="Holistic recovery services for mind and body"
 *   canonical="https://recoveryoffice.com/services"
 * />
 * ```
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  SITE_NAME,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  DEFAULT_CANONICAL,
  DEFAULT_OG_IMAGE,
} from '../../constants/branding';

interface SEOProps {
  /**
   * Page title (will be appended with site name)
   */
  title?: string;
  
  /**
   * Page meta description
   */
  description?: string;
  
  /**
   * Canonical URL for the page
   */
  canonical?: string;
  
  /**
   * OpenGraph image URL
   */
  ogImage?: string;
  
  /**
   * Alternative page-specific language
   */
  lang?: string;
  
  /**
   * Additional meta tags to include
   */
  meta?: Array<{
    name?: string;
    property?: string;
    content: string;
  }>;
  
  /**
   * Whether to prevent index by search engines
   */
  noIndex?: boolean;

  /**
   * JSON-LD structured data (Schema.org)
   * Can be a single object or array of objects
   */
  structuredData?: object | object[];
}

/**
 * Default site metadata values
 */
const defaultProps = {
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  canonical: DEFAULT_CANONICAL,
  ogImage: DEFAULT_OG_IMAGE,
  lang: 'en',
  meta: [] as SEOProps['meta'],
};

/**
 * SEO component for managing document head metadata
 */
export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonical,
  ogImage,
  lang,
  meta = [],
  noIndex,
  structuredData,
}) => {
  const seo = {
    title: title || defaultProps.title,
    description: description || defaultProps.description,
    canonical: canonical || defaultProps.canonical,
    ogImage: ogImage || defaultProps.ogImage,
    lang: lang || defaultProps.lang,
  };

  // Format title to include site name if it's not already a full title
  const formattedTitle = title && !title.includes('Recovery Office')
    ? `${title} | ${SITE_NAME}`
    : title || DEFAULT_TITLE;

  return (
    <Helmet
      htmlAttributes={{ lang: seo.lang }}
      title={formattedTitle}
      link={[
        { rel: 'canonical', href: seo.canonical },
      ]}
      meta={[
        { name: 'description', content: seo.description },
        { property: 'og:title', content: formattedTitle },
        { property: 'og:description', content: seo.description },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: seo.ogImage },
        { property: 'og:url', content: seo.canonical },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: formattedTitle },
        { name: 'twitter:description', content: seo.description },
        { name: 'twitter:image', content: seo.ogImage },
        ...(noIndex ? [
          { name: 'robots', content: 'noindex, nofollow' },
        ] : []),
        ...meta,
      ]}
    >
      {/* JSON-LD structured data for improved SEO */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO; 