import { useEffect } from 'react';

interface SEOConfig {
  title: string;
  description: string;
  image?: string;
  url?: string;
  siteName?: string;
  schema?: object;
}

/**
 * Hook to dynamically update HTML meta tags for SEO and social sharing.
 * Updates <title>, meta description, Open Graph tags, Twitter Card tags, and JSON-LD schema.
 *
 * @param config SEO configuration object
 */
export function useSEO({ title, description, image, url, siteName = 'La Voz Misionera', schema }: SEOConfig) {
  useEffect(() => {
    // Update document title
    document.title = `${title} | ${siteName}`;

    // Create or update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);

    // Create or update Open Graph tags
    const ogTags = [
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url || window.location.href },
      { property: 'og:site_name', content: siteName },
      { property: 'og:type', content: 'website' },
    ];

    if (image) {
      ogTags.push({ property: 'og:image', content: image });
    }

    ogTags.forEach(({ property, content }) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

    // Create or update Twitter Card tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
    ];

    if (image) {
      twitterTags.push({ name: 'twitter:image', content: image });
    }

    twitterTags.forEach(({ name, content }) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', name);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });

    // Cleanup function (optional, but good practice)
    return () => {
      // We could remove the tags we added, but it's safer to leave them
      // as subsequent SEO calls will overwrite them.
    };
  }, [title, description, image, url, siteName, schema]);

  // JSON-LD Schema support
  useEffect(() => {
    if (!schema) return;

    let scriptTag = document.querySelector('script[type="application/ld+json"]');

    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }

    scriptTag.textContent = JSON.stringify(schema);

    return () => {
      if (scriptTag && scriptTag.parentNode) {
        scriptTag.parentNode.removeChild(scriptTag);
      }
    };
  }, [schema]);
}