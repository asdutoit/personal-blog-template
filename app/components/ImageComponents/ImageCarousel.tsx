"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { ImageData } from "./ImageGrid";
import {
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
} from "lucide-react";

interface ImageCarouselProps {
  images: ImageData[];
  initialIndex: number;
  onClose: () => void;
  transitionStyle?: "slide" | "fade";
}

export function ImageCarousel({
  images,
  initialIndex,
  onClose,
  transitionStyle = "slide",
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [[page, direction], setPage] = useState([initialIndex, 0]);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(
    new Set([initialIndex])
  );
  const [showUI, setShowUI] = useState(true); // Always start with UI visible
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const resetZoom = () => {
    setIsZoomed(false);
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleClose = useCallback(async () => {
    // Exit fullscreen if currently in fullscreen mode
    if (document.fullscreenElement) {
      try {
        await document.exitFullscreen();
      } catch (error) {
        console.warn("Exit fullscreen failed:", error);
      }
    }
    onClose();
  }, [onClose]);

  // UI visibility management - simplified to just toggle
  const toggleUI = useCallback(() => {
    setShowUI((prev) => !prev);
  }, []);

  // Preload images effect - preload current + 2 in each direction
  useEffect(() => {
    const preloadImages = () => {
      const imagesToPreload = new Set<number>();

      // Add current image
      imagesToPreload.add(currentIndex);

      // Add images 2 positions in each direction
      for (let i = -2; i <= 2; i++) {
        const index = (currentIndex + i + images.length) % images.length;
        imagesToPreload.add(index);
      }

      // Preload images that haven't been loaded yet
      imagesToPreload.forEach((index) => {
        if (!loadedImages.has(index)) {
          const img = new window.Image();
          img.onload = () => {
            setLoadedImages((prev) => new Set(prev).add(index));
          };
          img.src = images[index].src;
        }
      });
    };

    preloadImages();
  }, [currentIndex, images, loadedImages]);

  const nextImage = useCallback(() => {
    const newIndex = (currentIndex + 1) % images.length;
    setPage([newIndex, 1]);
    setCurrentIndex(newIndex);
    resetZoom();
    // Don't hide UI when navigating - keep arrows visible
  }, [currentIndex, images.length]);

  const prevImage = useCallback(() => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setPage([newIndex, -1]);
    setCurrentIndex(newIndex);
    resetZoom();
    // Don't hide UI when navigating - keep arrows visible
  }, [currentIndex, images.length]);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3));
    setIsZoomed(true);
  };

  const handleZoomOut = useCallback(() => {
    const newZoomLevel = Math.max(zoomLevel - 0.5, 1);
    setZoomLevel(newZoomLevel);
    if (newZoomLevel === 1) {
      setIsZoomed(false);
      setPanOffset({ x: 0, y: 0 });
    }
  }, [zoomLevel]);

  const handleImageClick = () => {
    // Don't toggle zoom on image click - only toggle UI
    // Zoom should be controlled by zoom buttons only
    toggleUI();
  };

  // Fullscreen functionality
  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      try {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } catch (error) {
        console.warn("Fullscreen not supported or denied");
      }
    } else {
      try {
        await document.exitFullscreen();
        setIsFullscreen(false);
      } catch (error) {
        console.warn("Exit fullscreen failed");
      }
    }
  }, []);

  // Handle image area tap for UI toggle
  const handleImageAreaTap = useCallback(
    (e: React.MouseEvent) => {
      // Check if tap is on the image area (not UI elements)
      if (
        e.target === e.currentTarget ||
        (e.target as Element).closest(".image-container")
      ) {
        toggleUI(); // Always just toggle UI
      }
    },
    [toggleUI]
  );

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          if (!isZoomed) prevImage();
          break;
        case "ArrowRight":
          if (!isZoomed) nextImage();
          break;
        case "Escape":
          handleClose();
          break;
        case "+":
        case "=":
          handleZoomIn();
          break;
        case "-":
          handleZoomOut();
          break;
        case "0":
          resetZoom();
          break;
        case "f":
        case "F":
          toggleFullscreen();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    isZoomed,
    nextImage,
    prevImage,
    handleClose,
    handleZoomOut,
    toggleFullscreen,
  ]);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 1,
      position: "absolute" as const,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      position: "absolute" as const,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 1,
      position: "absolute" as const,
    }),
  };

  const fadeVariants = {
    enter: () => ({
      opacity: 0,
      position: "absolute" as const,
    }),
    center: {
      zIndex: 1,
      opacity: 1,
      position: "absolute" as const,
    },
    exit: () => ({
      zIndex: 0,
      opacity: 0,
      position: "absolute" as const,
    }),
  };

  const variants = transitionStyle === "fade" ? fadeVariants : slideVariants;

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const currentImage = images[page];

  // Check if an image should load with priority
  const shouldLoadWithPriority = useCallback(
    (index: number) => {
      // Priority loading for current image and immediate neighbors
      return Math.abs(index - currentIndex) <= 1;
    },
    [currentIndex]
  );

  // Check if an image is ready to display
  const isImageReady = useCallback(
    (index: number) => {
      return loadedImages.has(index) || shouldLoadWithPriority(index);
    },
    [loadedImages, shouldLoadWithPriority]
  );

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[60] flex items-center justify-center"
        style={{ backgroundColor: "var(--background)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.15,
          ease: "easeOut",
        }}
      >
        {/* Header */}
        <AnimatePresence>
          {showUI && (
            <motion.div
              className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-background/90 to-transparent"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <span className="text-foreground font-medium">
                    {currentIndex + 1} of {images.length}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleZoomOut}
                      disabled={zoomLevel <= 1}
                      className="p-2 rounded-sm bg-black/10 hover:bg-black/20 transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      <ZoomOut size={20} className="text-foreground" />
                    </button>
                    <span className="text-sm text-foreground/70 min-w-[3rem] text-center">
                      {Math.round(zoomLevel * 100)}%
                    </span>
                    <button
                      onClick={handleZoomIn}
                      disabled={zoomLevel >= 3}
                      className="p-2 rounded-sm bg-black/10 hover:bg-black/20 transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      <ZoomIn size={20} className="text-foreground" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleFullscreen}
                    className="p-2 rounded-sm bg-black/10 hover:bg-black/20 transition-colors cursor-pointer"
                    title="Toggle Fullscreen (F)"
                  >
                    {isFullscreen ? (
                      <Minimize size={20} className="text-foreground" />
                    ) : (
                      <Maximize size={20} className="text-foreground" />
                    )}
                  </button>
                  <button
                    onClick={handleClose}
                    className="p-2 rounded-sm bg-black/10 hover:bg-black/20 transition-colors cursor-pointer"
                  >
                    <X size={24} className="text-foreground" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons - Always visible when not zoomed */}
        {!isZoomed && (
          <>
            <motion.button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-sm bg-white/20 hover:bg-white/30 transition-colors"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronLeft size={24} className="text-foreground" />
            </motion.button>
            <motion.button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-sm bg-white/20 hover:bg-white/30 transition-colors"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronRight size={24} className="text-foreground" />
            </motion.button>
          </>
        )}

        {/* Image Container - Maximized for available space */}
        <div
          className="relative w-full h-full flex items-center justify-center pt-14 pb-14 px-2"
          onClick={handleImageAreaTap}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={page}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={
                  transitionStyle === "fade"
                    ? { opacity: { duration: 0.4, ease: "easeInOut" } }
                    : {
                        x: { type: "tween", duration: 0.3, ease: "easeInOut" },
                        opacity: { duration: 0.2 },
                      }
                }
                drag={isZoomed ? false : "x"}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={transitionStyle === "fade" ? 0.2 : 1}
                onDragEnd={(_, { offset, velocity }) => {
                  if (!isZoomed) {
                    const swipe = swipePower(offset.x, velocity.x);
                    if (swipe < -swipeConfidenceThreshold) {
                      nextImage();
                    } else if (swipe > swipeConfidenceThreshold) {
                      prevImage();
                    }
                  }
                }}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  cursor: isZoomed && zoomLevel > 1 ? "grab" : "pointer",
                }}
              >
                <motion.div
                  animate={{
                    scale: zoomLevel,
                    x: panOffset.x,
                    y: panOffset.y,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="relative w-full h-full flex items-center justify-center image-container"
                  onClick={handleImageClick}
                  drag={isZoomed && zoomLevel > 1}
                  dragConstraints={{
                    left: -(zoomLevel * 200),
                    right: zoomLevel * 200,
                    top: -(zoomLevel * 200),
                    bottom: zoomLevel * 200,
                  }}
                  onDrag={(_, info) => {
                    if (isZoomed && zoomLevel > 1) {
                      setPanOffset((prev) => ({
                        x: prev.x + info.delta.x,
                        y: prev.y + info.delta.y,
                      }));
                    }
                  }}
                >
                  {isImageReady(page) ? (
                    <motion.div
                      className="relative w-full h-full flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Image
                        src={currentImage.src}
                        alt={currentImage.alt}
                        width={2400}
                        height={2400}
                        priority={shouldLoadWithPriority(page)}
                        loading={
                          shouldLoadWithPriority(page) ? "eager" : "lazy"
                        }
                        className={`object-contain w-full h-full transition-opacity duration-300 ${
                          loadedImages.has(page) ? "opacity-100" : "opacity-0"
                        }`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1920px) 90vw, 1728px"
                        onLoad={() => {
                          setLoadedImages((prev) => new Set(prev).add(page));
                        }}
                        placeholder="blur"
                        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGZpbHRlciBpZD0iYiI+PGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMiIvPjwvZmlsdGVyPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2IiBmaWx0ZXI9InVybCgjYikiLz48cmVjdCB4PSI1IiB5PSI1IiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIGZpbGw9IiNlNWU3ZWIiIGZpbHRlcj0idXJsKCNiKSIgb3BhY2l0eT0iMC41Ii8+PC9zdmc+"
                      />
                    </motion.div>
                  ) : (
                    <div className="w-full h-full relative">
                      {/* Blurred background skeleton */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
                        {/* Animated shimmer effect */}
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                      </div>

                      {/* Center loading indicator */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-5 shadow-xl">
                          <div className="flex flex-col items-center gap-3">
                            {/* Custom spinner */}
                            <div className="relative w-12 h-12">
                              <div className="absolute inset-0 rounded-full border-3 border-gray-200 dark:border-gray-700" />
                              <div className="absolute inset-0 rounded-full border-3 border-transparent border-t-blue-500 animate-spin" />
                              <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-blue-400 animate-spin animation-delay-150" />
                            </div>
                            <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                              Loading image...
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Navigation */}
        <AnimatePresence>
          {showUI && (
            <motion.div
              className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/90 to-transparent"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-center items-center gap-2 mb-4">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const newDirection = index > page ? 1 : -1;
                      setPage([index, newDirection]);
                      setCurrentIndex(index);
                      resetZoom();
                    }}
                    className={`w-2 h-2 rounded-sm transition-all duration-200 ${
                      index === currentIndex
                        ? "bg-foreground scale-125"
                        : "bg-foreground/40 hover:bg-foreground/60"
                    }`}
                  />
                ))}
              </div>
              <div className="text-center text-foreground/70 text-sm">
                {isZoomed
                  ? "Use zoom buttons to zoom out • Drag to pan"
                  : "Tap image to toggle UI • Swipe or use arrows to navigate • Press F for fullscreen"}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
