// Accessibility and SEO utility functions

/**
 * Generate optimized alt text for images based on content and context
 */
export function generateAltText(description: string, context?: string): string {
  const baseText = description.trim();
  if (context) {
    return `${baseText} - ${context}`;
  }
  return baseText;
}

/**
 * Create skip navigation links for accessibility
 */
export const skipNavigation = [
  { href: "#main-content", text: "Skip to main content" },
  { href: "#navigation", text: "Skip to navigation" },
  { href: "#search", text: "Skip to search" },
];

/**
 * Generate proper heading hierarchy
 */
export function getHeadingLevel(
  pageType: string,
  sectionType: string
): "h1" | "h2" | "h3" | "h4" | "h5" | "h6" {
  const hierarchy = {
    page: { main: "h1", section: "h2", subsection: "h3" },
    section: { main: "h2", section: "h3", subsection: "h4" },
    component: { main: "h3", section: "h4", subsection: "h5" },
  };

  return (hierarchy as any)[pageType]?.[sectionType] || "h2";
}

/**
 * Generate ARIA labels for interactive elements
 */
export function generateAriaLabel(
  action: string,
  target: string,
  context?: string
): string {
  const label = `${action} ${target}`;
  return context ? `${label} - ${context}` : label;
}

/**
 * Validate and sanitize text content for SEO
 */
export function sanitizeContent(content: string, maxLength?: number): string {
  let sanitized = content
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();

  if (maxLength && sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength - 3) + "...";
  }

  return sanitized;
}

/**
 * Generate focus management utilities
 */
export const focusManagement = {
  trapFocus: (element: HTMLElement) => {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    element.addEventListener("keydown", handleTabKey);
    firstElement?.focus();

    return () => element.removeEventListener("keydown", handleTabKey);
  },

  restoreFocus: (previousActiveElement: HTMLElement | null) => {
    if (previousActiveElement) {
      previousActiveElement.focus();
    }
  },
};

/**
 * Performance optimization utilities for SEO
 */
export const performanceUtils = {
  lazyLoadImages: {
    loading: "lazy" as const,
    decoding: "async" as const,
  },

  preloadCriticalResources: (resources: string[]) => {
    resources.forEach((resource) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.href = resource;
      link.as = resource.endsWith(".css") ? "style" : "script";
      document.head.appendChild(link);
    });
  },

  prefetchPages: (urls: string[]) => {
    urls.forEach((url) => {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.href = url;
      document.head.appendChild(link);
    });
  },
};

/**
 * Language and locale utilities
 */
export const localeUtils = {
  getDirection: (locale: string): "ltr" | "rtl" => {
    const rtlLanguages = ["ar", "he", "fa", "ur"];
    return rtlLanguages.includes(locale.split("-")[0]) ? "rtl" : "ltr";
  },

  formatDateTime: (date: Date, locale: string = "nl-NL"): string => {
    return new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  },
};
