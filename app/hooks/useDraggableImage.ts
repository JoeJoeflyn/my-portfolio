"use client";
import React from "react";

const useDraggable = (
  containerRef: React.RefObject<HTMLDivElement>,
  imageRef: React.RefObject<HTMLImageElement>
) => {
  const [isDragging, setIsDragging] = React.useState(false);
  const [startY, setStartY] = React.useState(0);
  const [translation, setTranslation] = React.useState(0);
  const [initialTranslation, setInitialTranslation] = React.useState(0);
  const [maxTranslation, setMaxTranslation] = React.useState(0);
  const [isReposition, setIsReposition] = React.useState(false);
  const [imageHeight, setImageHeight] = React.useState(0);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTranslation = localStorage.getItem("imageTranslation");
      const initialTranslationValue = savedTranslation ? +savedTranslation : 0;
      setTranslation(initialTranslationValue);
    }
  }, []);

  React.useEffect(() => {
    const imageElement = imageRef.current;

    if (imageElement) {
      const updateImageHeight = () => setImageHeight(imageElement.offsetHeight);

      if (imageElement.complete) {
        updateImageHeight();
      } else {
        imageElement.addEventListener("load", updateImageHeight);

        return () => {
          imageElement.removeEventListener("load", updateImageHeight);
        };
      }
    }
  }, [imageRef]);

  React.useEffect(() => {
    const containerHeight = containerRef.current?.offsetHeight || 0;
    const calculatedMaxTranslation = containerHeight - imageHeight;

    setMaxTranslation(
      imageHeight > containerHeight ? calculatedMaxTranslation : 0
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef.current?.offsetHeight]);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("imageTranslation", translation.toString());
    }
  }, [translation]);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      if (!isReposition) return;
      const diffY = e.clientY - startY;
      let newTranslation = initialTranslation + diffY;

      newTranslation = Math.min(0, Math.max(newTranslation, maxTranslation));

      setTranslation(newTranslation);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging, startY, initialTranslation, maxTranslation]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartY(e.clientY);
    setInitialTranslation(translation);
  };

  return { translation, handleMouseDown, setIsReposition, isReposition };
};

export default useDraggable;
