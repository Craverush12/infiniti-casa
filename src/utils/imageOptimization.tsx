import React, { useState, useEffect, useRef } from 'react';

// Image Optimization Utilities
// Handles lazy loading, responsive images, WebP support, and progressive loading

export interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export interface ResponsiveImageConfig {
  src: string;
  srcSet: string;
  sizes: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
}

// Check if WebP is supported
export const supportsWebP = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
};

// Generate responsive image srcSet
export const generateSrcSet = (
  baseUrl: string,
  widths: number[] = [320, 640, 768, 1024, 1280, 1920]
): string => {
  if (!baseUrl) return '';
  
  // Handle data URLs and blob URLs
  if (baseUrl.startsWith('data:') || baseUrl.startsWith('blob:')) {
    return baseUrl;
  }
  
  // For relative URLs or invalid URLs, return empty string
  if (!baseUrl.startsWith('http://') && !baseUrl.startsWith('https://')) {
    return baseUrl;
  }
  
  try {
    return widths
      .map(width => `${baseUrl}?w=${width} ${width}w`)
      .join(', ');
  } catch (error) {
    console.warn('Invalid URL provided to generateSrcSet:', baseUrl);
    return baseUrl;
  }
};

// Generate appropriate sizes attribute
export const generateSizes = (breakpoints: { [key: string]: string }): string => {
  return Object.entries(breakpoints)
    .map(([query, size]) => `(${query}) ${size}`)
    .join(', ');
};

// Default responsive sizes
export const defaultSizes = {
  '(max-width: 640px)': '100vw',
  '(max-width: 768px)': '50vw',
  '(max-width: 1024px)': '33vw',
  '(max-width: 1280px)': '25vw',
  '(min-width: 1281px)': '20vw'
};

// Create optimized image URL with WebP support
export const createOptimizedImageUrl = (
  originalUrl: string,
  width?: number,
  quality: number = 80,
  format?: 'webp' | 'jpeg' | 'auto'
): string => {
  if (!originalUrl) return '';
  
  try {
    // Handle relative URLs and data URLs
    if (originalUrl.startsWith('data:') || originalUrl.startsWith('blob:')) {
      return originalUrl;
    }
    
    // If it's a relative URL, make it absolute
    let fullUrl = originalUrl;
    if (!originalUrl.startsWith('http://') && !originalUrl.startsWith('https://')) {
      // For relative URLs, just return the original URL without modification
      return originalUrl;
    }
    
    const url = new URL(fullUrl);
    const params = new URLSearchParams(url.search);
    
    if (width) params.set('w', width.toString());
    params.set('q', quality.toString());
    
    if (format && format !== 'auto') {
      params.set('f', format);
    } else if (supportsWebP()) {
      params.set('f', 'webp');
    }
    
    url.search = params.toString();
    return url.toString();
  } catch (error) {
    console.warn('Invalid URL provided to createOptimizedImageUrl:', originalUrl);
    return originalUrl;
  }
};

// Generate responsive image configuration
export const createResponsiveImage = (
  baseUrl: string,
  alt: string,
  className?: string,
  customSizes?: { [key: string]: string }
): ResponsiveImageConfig => {
  if (!baseUrl) {
    return {
      src: '',
      srcSet: '',
      sizes: '',
      alt,
      className,
      loading: 'lazy',
      decoding: 'async'
    };
  }
  
  const widths = [320, 640, 768, 1024, 1280, 1920];
  const srcSet = generateSrcSet(baseUrl, widths);
  const sizes = generateSizes(customSizes || defaultSizes);
  
  return {
    src: createOptimizedImageUrl(baseUrl, 1024), // Default size
    srcSet,
    sizes,
    alt,
    className,
    loading: 'lazy',
    decoding: 'async'
  };
};

// Lazy loading hook
export const useLazyImage = (src: string, placeholder?: string) => {
  const [imageSrc, setImageSrc] = useState(placeholder || src);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const img = new Image();
    
    img.onload = () => {
      setImageSrc(src);
      setIsLoaded(true);
    };
    
    img.onerror = () => {
      setHasError(true);
    };
    
    img.src = src;
  }, [src]);

  return { imageSrc, isLoaded, hasError };
};

// Progressive image loading component
export const ProgressiveImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  sizes,
  loading = 'lazy',
  decoding = 'async',
  placeholder,
  onLoad,
  onError
}) => {
  const { imageSrc, isLoaded, hasError } = useLazyImage(src, placeholder);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  if (hasError) {
    return (
      <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
        <span className="text-gray-500 text-sm">Image not available</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder/Blur */}
      {placeholder && !isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{
            backgroundImage: `url(${placeholder})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(10px)'
          }}
        />
      )}
      
      {/* Main Image */}
      <img
        src={imageSrc}
        alt={alt}
        sizes={sizes}
        loading={loading}
        decoding={decoding}
        onLoad={handleLoad}
        onError={handleError}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-rust-500 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

// Optimized image component with responsive support
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  sizes,
  loading = 'lazy',
  decoding = 'async',
  placeholder,
  onLoad,
  onError
}) => {
  const optimizedSrc = createOptimizedImageUrl(src);
  const responsiveConfig = createResponsiveImage(src, alt, className);

  return (
    <img
      {...responsiveConfig}
      className={`${className} ${loading === 'lazy' ? 'lazy' : ''}`}
      loading={loading}
      decoding={decoding}
      onLoad={onLoad}
      onError={onError}
      style={{
        width: '100%',
        height: 'auto',
        objectFit: 'cover'
      }}
    />
  );
};

// Background image optimization
export const createOptimizedBackgroundImage = (
  imageUrl: string,
  width?: number,
  quality: number = 80
): string => {
  if (!imageUrl) return '';
  
  const optimizedUrl = createOptimizedImageUrl(imageUrl, width, quality);
  return `url(${optimizedUrl})`;
};

// Preload critical images
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

// Preload multiple images
export const preloadImages = async (urls: string[]): Promise<void> => {
  const promises = urls.map(url => preloadImage(url));
  await Promise.all(promises);
};

// Image compression utility
export const compressImage = async (
  file: File,
  quality: number = 0.8,
  maxWidth?: number
): Promise<File> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const img = new Image();
    
    img.onload = () => {
      let { width, height } = img;
      
      if (maxWidth && width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      ctx.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now()
            });
            resolve(compressedFile);
          } else {
            resolve(file);
          }
        },
        'image/jpeg',
        quality
      );
    };
    
    img.src = URL.createObjectURL(file);
  });
};

// Intersection Observer for lazy loading
export const useIntersectionObserver = (
  callback: () => void,
  options: IntersectionObserverInit = {}
) => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback();
          observer.unobserve(entry.target);
        }
      });
    }, options);

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [callback, options]);

  return elementRef;
};

// Export React hooks 