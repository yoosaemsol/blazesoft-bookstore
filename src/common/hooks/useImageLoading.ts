import { useState, useEffect } from 'react';

export const useImageLoading = (src: string) => {
  const [isCoverLoading, setIsCoverLoading] = useState(true);
  const [isCoverAvailable, setIsCoverAvailable] = useState(true);

  useEffect(() => {
    if (src?.length === 0) {
      setIsCoverLoading(false);
      setIsCoverAvailable(false);

      return;
    }

    const img = new Image();

    const handleLoad = () => {
      setIsCoverLoading(false);
      setIsCoverAvailable(true);
    };

    const handleError = () => {
      setIsCoverLoading(false);
      setIsCoverAvailable(false);
    };

    img.onload = handleLoad;
    img.onerror = handleError;

    img.src = src;

    // Cleanup function to remove event listeners
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return { isCoverLoading, isCoverAvailable };
};
