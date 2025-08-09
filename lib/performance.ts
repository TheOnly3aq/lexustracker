// Performance optimization utilities for Next.js SEO

/**
 * Critical CSS and resource preloading
 */
export const preloadCriticalResources = () => {
  if (typeof window !== "undefined") {
    // Preload critical fonts
    const fontPreloads = ["/fonts/inter-var.woff2", "/fonts/inter-latin.woff2"];

    fontPreloads.forEach((font) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.href = font;
      link.as = "font";
      link.type = "font/woff2";
      link.crossOrigin = "anonymous";
      document.head.appendChild(link);
    });

    // DNS prefetch for external domains
    const dnsPrefetches = [
      "https://fonts.googleapis.com",
      "https://fonts.gstatic.com",
      "https://vercel-insights.com",
    ];

    dnsPrefetches.forEach((domain) => {
      const link = document.createElement("link");
      link.rel = "dns-prefetch";
      link.href = domain;
      document.head.appendChild(link);
    });
  }
};

/**
 * Image optimization utilities
 */
export const imageOptimization = {
  // Generate responsive image sizes
  generateSizes: (breakpoints: {
    mobile: number;
    tablet: number;
    desktop: number;
  }) => {
    return `(max-width: 768px) ${breakpoints.mobile}px, (max-width: 1200px) ${breakpoints.tablet}px, ${breakpoints.desktop}px`;
  },

  // Generate blur placeholder
  generateBlurDataURL: (width: number = 8, height: number = 8) => {
    return `data:image/svg+xml;base64,${Buffer.from(
      `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#1f2937"/>
        <rect width="100%" height="100%" fill="url(#gradient)" opacity="0.5"/>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#374151;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#111827;stop-opacity:1" />
          </linearGradient>
        </defs>
      </svg>`
    ).toString("base64")}`;
  },

  // Common image props for optimization
  commonProps: {
    loading: "lazy" as const,
    decoding: "async" as const,
    quality: 85,
    format: "webp",
  },
};

/**
 * Performance monitoring and Core Web Vitals
 */
export const performanceMonitoring = {
  // Measure and report Core Web Vitals
  measureWebVitals: () => {
    if (typeof window !== "undefined" && "performance" in window) {
      // Cumulative Layout Shift (CLS)
      let cls = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            cls += (entry as any).value;
          }
        }
      }).observe({ type: "layout-shift", buffered: true });

      // First Input Delay (FID)
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const fidEntry = entry as any; // Type assertion for performance entry
          const fid = fidEntry.processingStart - fidEntry.startTime;
          console.log("FID:", fid);
        }
      }).observe({ type: "first-input", buffered: true });

      // Largest Contentful Paint (LCP)
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log("LCP:", entry.startTime);
        }
      }).observe({ type: "largest-contentful-paint", buffered: true });
    }
  },

  // Report performance metrics to analytics
  reportMetrics: (metric: { name: string; value: number; id: string }) => {
    // Send to your analytics service
    if (process.env.NODE_ENV === "production") {
      // Example: gtag('event', 'web_vital', { metric });
    }
  },
};

/**
 * SEO-friendly code splitting and lazy loading
 */
export const lazyLoadingStrategies = {
  // Intersection Observer for lazy loading
  createIntersectionObserver: (
    callback: (entries: IntersectionObserverEntry[]) => void
  ) => {
    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      return new IntersectionObserver(callback, {
        root: null,
        rootMargin: "50px",
        threshold: 0.1,
      });
    }
    return null;
  },

  // Lazy load components below the fold
  belowFoldComponents: {
    threshold: 0.1,
    rootMargin: "100px",
  },
};

/**
 * Service Worker utilities for caching
 */
export const serviceWorkerUtils = {
  // Register service worker for offline functionality
  register: async () => {
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js");
        console.log("SW registered: ", registration);
      } catch (error) {
        console.log("SW registration failed: ", error);
      }
    }
  },

  // Cache strategies for different resource types
  cacheStrategies: {
    images: "CacheFirst",
    api: "NetworkFirst",
    static: "StaleWhileRevalidate",
  },
};

/**
 * Critical rendering path optimization
 */
export const criticalPath = {
  // Inline critical CSS
  inlineCriticalCSS: (css: string) => {
    if (typeof document !== "undefined") {
      const style = document.createElement("style");
      style.textContent = css;
      document.head.appendChild(style);
    }
  },

  // Defer non-critical CSS
  deferCSS: (href: string) => {
    if (typeof document !== "undefined") {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "style";
      link.href = href;
      link.onload = () => {
        link.rel = "stylesheet";
      };
      document.head.appendChild(link);
    }
  },

  // Resource hints
  resourceHints: {
    preconnect: (urls: string[]) => {
      urls.forEach((url) => {
        const link = document.createElement("link");
        link.rel = "preconnect";
        link.href = url;
        document.head.appendChild(link);
      });
    },

    prefetch: (urls: string[]) => {
      urls.forEach((url) => {
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.href = url;
        document.head.appendChild(link);
      });
    },
  },
};

/**
 * Bundle analysis and optimization helpers
 */
export const bundleOptimization = {
  // Dynamic imports with error boundaries
  dynamicImport: async <T>(importFn: () => Promise<T>): Promise<T | null> => {
    try {
      return await importFn();
    } catch (error) {
      console.error("Dynamic import failed:", error);
      return null;
    }
  },

  // Chunk naming for better caching
  chunkNaming: {
    vendors: /[\\/]node_modules[\\/]/,
    common: /[\\/]src[\\/]components[\\/]/,
    pages: /[\\/]src[\\/]pages[\\/]/,
  },
};
