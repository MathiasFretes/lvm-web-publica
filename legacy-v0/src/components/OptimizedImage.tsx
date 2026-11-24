/**
 * OptimizedImage Component
 *
 * A performance-optimized image component with:
 * - WebP support with fallback
 * - Responsive srcSet for different screen sizes
 * - Lazy loading via native loading="lazy"
 * - Placeholder while loading
 * - Error handling with fallback
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  Image,
  ImageProps,
  View,
  ActivityIndicator,
  StyleSheet,
  Platform,
} from 'react-native';
import { isWeb } from '../constants/platform';

// Image size presets for responsive images
export type ImageSize = 'thumb' | 'small' | 'medium' | 'large' | 'full';

const SIZE_MAP: Record<ImageSize, number> = {
  thumb: 64,
  small: 320,
  medium: 640,
  large: 1024,
  full: 1920,
};

export interface OptimizedImageProps extends Omit<ImageProps, 'source'> {
  /** Image source URL */
  source: string | { uri: string };
  /** Alternative WebP source URL */
  webpSource?: string;
  /** Responsive image sources for different sizes */
  responsiveSources?: Record<ImageSize, string>;
  /** Alt text for accessibility */
  alt?: string;
  /** Show loading placeholder */
  showLoader?: boolean;
  /** Placeholder color while loading */
  placeholderColor?: string;
  /** Fallback image URL if main fails */
  fallbackSource?: string;
  /** Preferred size preset */
  size?: ImageSize;
  /** Custom width (overrides size) */
  width?: number;
  /** Custom height (overrides size) */
  height?: number;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  source,
  webpSource,
  responsiveSources,
  alt = '',
  showLoader = true,
  placeholderColor = '#e5e7eb',
  fallbackSource,
  size = 'medium',
  width,
  height,
  style,
  onLoad,
  onError,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [currentSource, setCurrentSource] = useState<string | null>(null);

  // Get the image URI
  const imageUri = useMemo(() => {
    if (typeof source === 'string') return source;
    return source.uri;
  }, [source]);

  // Determine the best source based on platform
  const bestSource = useMemo(() => {
    // For web, prefer WebP if available and supported
    if (isWeb && webpSource) {
      return webpSource;
    }
    return imageUri;
  }, [isWeb, webpSource, imageUri]);

  // Calculate dimensions
  const dimensions = useMemo(() => {
    const w = width || SIZE_MAP[size];
    const h = height || (width ? undefined : SIZE_MAP[size]);
    return { width: w, height: h };
  }, [width, height, size]);

  useEffect(() => {
    setCurrentSource(bestSource);
    setIsLoading(true);
    setHasError(false);
  }, [bestSource]);

  const handleLoad = (event: any) => {
    setIsLoading(false);
    onLoad?.(event);
  };

  const handleError = (event: any) => {
    setIsLoading(false);
    setHasError(true);

    // Try fallback
    if (fallbackSource && currentSource !== fallbackSource) {
      setCurrentSource(fallbackSource);
      setHasError(false);
      setIsLoading(true);
    }

    onError?.(event);
  };

  // Generate srcSet HTML attribute for web
  const srcSetAttribute = useMemo(() => {
    if (!isWeb || !responsiveSources) return undefined;

    return Object.entries(responsiveSources)
      .map(([sizeKey, url]) => `${url} ${SIZE_MAP[sizeKey as ImageSize]}w`)
      .join(', ');
  }, [isWeb, responsiveSources]);

  // Generate sizes HTML attribute for web
  const sizesAttribute = useMemo(() => {
    if (!isWeb || !responsiveSources) return undefined;

    return `
      (max-width: 640px) ${SIZE_MAP.small}px,
      (max-width: 1024px) ${SIZE_MAP.medium}px,
      ${SIZE_MAP.large}px
    `.trim();
  }, [isWeb, responsiveSources]);

  // Web component with srcSet support
  if (isWeb && responsiveSources) {
    return (
      <View style={[styles.container, dimensions, style]}>
        {isLoading && showLoader && (
          <View style={[styles.placeholder, { backgroundColor: placeholderColor }, dimensions]}>
            <ActivityIndicator size="small" color="#c6a15b" />
          </View>
        )}
        <img
          src={currentSource || undefined}
          srcSet={srcSetAttribute}
          sizes={sizesAttribute}
          alt={alt}
          loading="lazy"
          decoding="async"
          style={{
            width: dimensions.width,
            height: dimensions.height || 'auto',
            objectFit: 'cover',
            display: isLoading ? 'none' : 'block',
          }}
          onLoad={handleLoad}
          onError={handleError}
        />
      </View>
    );
  }

  // React Native component
  return (
    <View style={[styles.container, dimensions, style]}>
      {isLoading && showLoader && (
        <View style={[styles.placeholder, { backgroundColor: placeholderColor }, dimensions]}>
          <ActivityIndicator size="small" color="#c6a15b" />
        </View>
      )}
      <Image
        source={{ uri: currentSource || undefined }}
        style={[
          dimensions,
          { display: isLoading ? 'none' : 'flex' },
        ]}
        onLoad={handleLoad}
        onError={handleError}
        accessibilityLabel={alt}
        accessibilityRole="image"
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OptimizedImage;
