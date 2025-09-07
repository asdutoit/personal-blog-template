"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { ImageCarousel } from "./ImageCarousel";
import { ImageData } from "./ImageGrid";
import { X } from "lucide-react";

interface ImageGalleryProps {
  images: ImageData[];
  onClose: () => void;
  layout?: "masonry" | "pattern" | "single";
  gridPattern?: number[];
  masonryColumns?: number;
  fullWidth?: boolean;
}

export function ImageGallery({
  images,
  onClose,
  layout = "masonry",
  gridPattern = [1, 2, 3, 2, 1],
  masonryColumns = 4,
  fullWidth = true,
}: ImageGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [columns, setColumns] = useState(3);
  const [contentReady, setContentReady] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 640) setColumns(2);
      else if (window.innerWidth < 1024) setColumns(3);
      else setColumns(4);
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Delay content rendering to allow modal to appear first
    const timer = setTimeout(() => {
      setContentReady(true);
    }, 150); // Give modal time to fade in

    return () => {
      document.body.style.overflow = "auto";
      clearTimeout(timer);
    };
  }, []);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleImageLoad = (imageId: string) => {
    setLoadedImages((prev) => new Set([...prev, imageId]));
  };

  const getImageHeight = (index: number, imageId: string) => {
    // Create consistent heights based on image ID for better performance
    const heights = [250, 300, 200, 350, 280, 320, 240, 290];
    let hash = 0;
    for (let i = 0; i < imageId.length; i++) {
      const char = imageId.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return heights[Math.abs(hash) % heights.length];
  };

  // Use images directly without filtering
  const filteredImages = images;

  // Memoize image column distribution for masonry layout
  const imageColumns = useMemo(() => {
    if (layout !== "masonry") return [];

    const cols: ImageData[][] = Array(columns)
      .fill(null)
      .map(() => []);
    const colHeights = Array(columns).fill(0);

    filteredImages.forEach((image) => {
      const shortestCol = colHeights.indexOf(Math.min(...colHeights));
      const height = getImageHeight(0, image.id);

      cols[shortestCol].push(image);
      colHeights[shortestCol] += height + 16; // Add gap
    });

    return cols;
  }, [filteredImages, columns, layout]);

  // Render pattern-based grid layout
  const renderPatternGrid = () => {
    let imageIndex = 0;
    const rows: React.ReactElement[] = [];
    let patternIndex = 0;

    while (imageIndex < filteredImages.length) {
      const imagesPerRow = gridPattern[patternIndex % gridPattern.length];
      const rowImages = filteredImages.slice(
        imageIndex,
        imageIndex + imagesPerRow
      );

      if (rowImages.length === 0) break;

      rows.push(
        <motion.div
          key={`row-${patternIndex}`}
          className={`grid gap-2 ${
            imagesPerRow === 1
              ? "grid-cols-1"
              : imagesPerRow === 2
              ? "grid-cols-2"
              : imagesPerRow === 3
              ? "grid-cols-3"
              : imagesPerRow === 4
              ? "grid-cols-2 md:grid-cols-4"
              : `grid-cols-${Math.min(
                  imagesPerRow,
                  3
                )} md:grid-cols-${imagesPerRow}`
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: patternIndex * 0.05, duration: 0.2 }}
        >
          {rowImages.map((image, idx) => {
            const globalIdx = imageIndex + idx;
            const isLargeImage = imagesPerRow === 1;

            return (
              <motion.div
                key={image.id}
                className={`relative overflow-hidden rounded-lg cursor-pointer ${
                  isLargeImage ? "aspect-[16/9]" : "aspect-square"
                }`}
                onClick={() =>
                  handleImageClick(
                    images.findIndex((img) => img.id === image.id)
                  )
                }
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: idx * 0.02 + patternIndex * 0.05,
                  duration: 0.2,
                }}
              >
                <motion.div
                  className="w-full h-full"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className={`object-cover transition-opacity duration-300 ${
                      loadedImages.has(image.id) ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => handleImageLoad(image.id)}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      );

      imageIndex += imagesPerRow;
      patternIndex++;
    }

    return <div className="space-y-2">{rows}</div>;
  };

  // Render single column layout
  const renderSingleColumnGrid = () => {
    return (
      <div className="max-w-md mx-auto space-y-3">
        {filteredImages.map((image, index) => (
          <motion.div
            key={image.id}
            className="relative aspect-[4/3] overflow-hidden rounded-lg cursor-pointer"
            onClick={() =>
              handleImageClick(images.findIndex((img) => img.id === image.id))
            }
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.02, duration: 0.2 }}
            whileHover={{ y: -2 }}
          >
            <motion.div
              className="w-full h-full"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className={`object-cover transition-opacity duration-300 ${
                  loadedImages.has(image.id) ? "opacity-100" : "opacity-0"
                }`}
                sizes="(max-width: 640px) 100vw, 448px"
                onLoad={() => handleImageLoad(image.id)}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-50 bg-white dark:bg-gray-900 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <div className="relative h-full dark:bg-gray-900">
            {/* Header */}
            <motion.div
              className="absolute top-0 left-0 right-0 z-10 p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 pb-2"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.2 }}
            >
              <div className="flex justify-between items-center ">
                <div className="text-2xl font-bold">
                  Gallery ({filteredImages.length}{" "}
                  {filteredImages.length === 1 ? "image" : "images"})
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-black/20 hover:bg-black/30 transition-colors dark:bg-white/20 dark:hover:bg-white/30"
                >
                  <X size={24} className="dark:text-white text-black " />
                </button>
              </div>
            </motion.div>

            {/* Gallery Content */}
            <div
              className="h-full overflow-y-auto pt-20 pb-8 px-4"
              onClick={(e) => e.stopPropagation()}
            >
              {!contentReady ? (
                /* Loading State */
                <motion.div
                  className="flex items-center justify-center h-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading gallery...</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  className={fullWidth ? "w-full px-4" : "max-w-6xl mx-auto"}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  {/* Render based on layout type */}
                  {layout === "masonry" && (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${columns}, 1fr)`,
                        gap: "16px",
                      }}
                    >
                      {imageColumns.map((column, colIndex) => (
                        <div key={colIndex} className="flex flex-col gap-4">
                          {column.map((image, imageIndex) => {
                            const globalIndex = images.findIndex(
                              (img) => img.id === image.id
                            );
                            const height = getImageHeight(
                              globalIndex,
                              image.id
                            );

                            return (
                              <motion.div
                                key={image.id}
                                className="relative overflow-hidden rounded-lg cursor-pointer"
                                style={{ height: `${height}px` }}
                                onClick={() => handleImageClick(globalIndex)}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  delay: colIndex * 0.01 + imageIndex * 0.005,
                                  duration: 0.15,
                                }}
                              >
                                <motion.div
                                  className="w-full h-full"
                                  whileHover={{ scale: 1.05 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className={`object-cover transition-opacity duration-300 ${
                                      loadedImages.has(image.id)
                                        ? "opacity-100"
                                        : "opacity-0"
                                    }`}
                                    onLoad={() => handleImageLoad(image.id)}
                                  />
                                </motion.div>
                              </motion.div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  )}

                  {layout === "pattern" && renderPatternGrid()}

                  {layout === "single" && renderSingleColumnGrid()}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Image Carousel */}
      {selectedImageIndex !== null && (
        <ImageCarousel
          images={images}
          initialIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
        />
      )}
    </>
  );
}
