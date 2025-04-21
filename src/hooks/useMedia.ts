// useMedia.ts
import { useState, useEffect } from "react";

const getDevice = (
  mediaQuery:
    | string
    | "mobile"
    | "tablet"
    | "laptop"
    | "desktop"
    | "largeDesktop",
) => {
  switch (mediaQuery) {
    case "mobile":
      return "(max-width: 639px)";
    case "tablet":
      return "(min-width: 768px)";
    case "laptop":
      return "(min-width: 1024px)";
    case "desktop":
      return "(min-width: 1280px)";
    case "largeDesktop":
      return "(min-width: 1536px)";
    default:
      return mediaQuery;
  }
};

export const useMedia = (query: string) => {
  const deviceQuery = getDevice(query);
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(deviceQuery);
    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);

    setMatches(mediaQueryList.matches);
    mediaQueryList.addEventListener("change", listener);

    return () => {
      mediaQueryList.removeEventListener("change", listener);
    };
  }, [deviceQuery]);

  return matches;
};
