"use client";

import { useState, useEffect } from "react";

interface UseImageFallbackOptions {
  fallbackUrl?: string;
  onError?: (error: Event) => void;
  onLoad?: (event: Event) => void;
}

/**
 * Hook for handling image loading with fallback support
 */
export function useImageFallback(
  primaryUrl: string,
  options: UseImageFallbackOptions = {}
) {
  const [currentUrl, setCurrentUrl] = useState(primaryUrl);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setCurrentUrl(primaryUrl);
    setIsLoading(true);
    setHasError(false);
  }, [primaryUrl]);

  const handleLoad = (event: Event) => {
    setIsLoading(false);
    setHasError(false);
    options.onLoad?.(event);
  };

  const handleError = (event: Event) => {
    setIsLoading(false);
    setHasError(true);

    if (options.fallbackUrl && currentUrl !== options.fallbackUrl) {
      setCurrentUrl(options.fallbackUrl);
      setIsLoading(true);
      setHasError(false);
    }

    options.onError?.(event);
  };

  return {
    src: currentUrl,
    isLoading,
    hasError,
    onLoad: handleLoad,
    onError: handleError,
  };
}

/**
 * Hook for preloading images
 */
export function useImagePreload(urls: string[]) {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    const preloadPromises = urls.map((url) => {
      return new Promise<string>((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
          setLoadedImages((prev) => new Set([...prev, url]));
          resolve(url);
        };

        img.onerror = () => {
          setFailedImages((prev) => new Set([...prev, url]));
          reject(url);
        };

        img.src = url;
      });
    });

    Promise.allSettled(preloadPromises);
  }, [urls]);

  return {
    loadedImages,
    failedImages,
    isLoaded: (url: string) => loadedImages.has(url),
    hasFailed: (url: string) => failedImages.has(url),
  };
}
