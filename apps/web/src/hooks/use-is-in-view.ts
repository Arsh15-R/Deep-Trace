"use client";

import * as React from "react";

export interface UseIsInViewOptions {
  inView?: boolean;
  inViewOnce?: boolean;
  inViewMargin?: string;
}

export function useIsInView<T extends HTMLElement = HTMLElement>(
  externalRef?: React.Ref<T>,
  options: UseIsInViewOptions = {}
) {
  const localRef = React.useRef<T>(null);
  const [isInView, setIsInView] = React.useState(true);

  React.useImperativeHandle(externalRef, () => localRef.current as T);

  React.useEffect(() => {
    if (!options.inView) {
      setIsInView(true);
      return;
    }
    const element = localRef.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (options.inViewOnce) {
            observer.disconnect();
          }
        } else if (!options.inViewOnce) {
          setIsInView(false);
        }
      },
      { rootMargin: options.inViewMargin ?? "0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [options.inView, options.inViewOnce, options.inViewMargin]);

  return { ref: localRef, isInView };
}
