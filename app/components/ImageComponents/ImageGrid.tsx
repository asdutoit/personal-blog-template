"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { ImageGallery } from "./ImageGallery";
import { ImageCarousel } from "./ImageCarousel";

export interface ImageData {
  id: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
  category?: string;
  isVirtualTour?: boolean;
  isFloorplan?: boolean;
}

interface ImageGridProps {
  images: ImageData[];
  onImageClick?: (imageId: string) => void;
  showCategoryBadges?: boolean;
  showImageOverlay?: boolean;
  galleryPatternLayout?: "masonry" | "pattern" | "single";
  galleryGridPattern?: number[];
  masonryColumns?: number;
}

export function ImageGrid({
  images,
  showCategoryBadges = false,
  showImageOverlay = false,
  galleryPatternLayout = "masonry",
  galleryGridPattern = [1, 2, 3, 2, 1],
  masonryColumns = 4,
}: ImageGridProps) {
  const [showGallery, setShowGallery] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  if (!images || images.length === 0) {
    return <div className="text-center text-gray-500">No images available</div>;
  }

  const sortedImages = images;
  const mainImage = sortedImages[0];
  const remainingImages = sortedImages.slice(1);
  const maxDisplayImages = 5;
  const displayImages = remainingImages.slice(0, maxDisplayImages - 1);
  const mobileDisplayImages = remainingImages.slice(0, 2); // 2 images on mobile
  const remainingCount = sortedImages.length - maxDisplayImages;

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleImageLoad = (imageId: string) => {
    setLoadedImages((prev) => new Set([...prev, imageId]));
  };

  return (
    <>
      <div className="relative w-full max-w-4xl mx-auto shadow-lg">
        <motion.div
          className="grid gap-2 h-[400px] md:h-[500px]"
          style={{
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "repeat(2, 1fr)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Main large image */}
          <motion.div
            className="relative row-span-2 overflow-hidden rounded-lg cursor-pointer"
            onClick={() => handleImageClick(0)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-full h-full"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src={mainImage.src}
                alt={mainImage.alt}
                fill
                className={`object-cover transition-opacity duration-300 ${
                  loadedImages.has(mainImage.id) ? "opacity-100" : "opacity-0"
                }`}
                priority
                onLoad={() => handleImageLoad(mainImage.id)}
              />
            </motion.div>

            {/* Category Badge */}
            {showCategoryBadges && mainImage.category && (
              <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
                {mainImage.category}
              </div>
            )}

            {/* Hover Info Overlay */}
            {showImageOverlay && (
              <motion.div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  {showCategoryBadges && mainImage.category && (
                    <div className="text-white text-xs font-medium mb-1">
                      {mainImage.category}
                    </div>
                  )}
                  <div className="text-white text-base font-medium line-clamp-2">
                    {mainImage.alt}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Small images grid - 1 on mobile, 2x2 on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-1 md:grid-rows-2 gap-2 row-span-2">
            {/* Mobile: show 2 images stacked vertically */}
            <div className="md:hidden grid grid-rows-2 gap-2 h-full">
              {mobileDisplayImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  className="relative overflow-hidden rounded-lg cursor-pointer"
                  onClick={() => handleImageClick(index + 1)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 + 0.1, duration: 0.3 }}
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

                  {/* Category Badge */}
                  {showCategoryBadges &&
                    image.category &&
                    !(
                      index === mobileDisplayImages.length - 1 &&
                      sortedImages.length > 3
                    ) && (
                      <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium backdrop-blur-sm">
                        {image.category}
                      </div>
                    )}

                  {/* Show more overlay */}
                  {index === mobileDisplayImages.length - 1 &&
                    sortedImages.length > 3 && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="text-white text-xl font-semibold">
                          +{sortedImages.length - 3}
                        </span>
                      </div>
                    )}
                </motion.div>
              ))}
            </div>

            {/* Desktop: show 4 images in 2x2 grid */}
            <div className="hidden md:contents">
              {displayImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  className="relative overflow-hidden rounded-lg cursor-pointer"
                  onClick={() => handleImageClick(index + 1)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 + 0.1, duration: 0.3 }}
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

                  {/* Category Badge */}
                  {showCategoryBadges &&
                    image.category &&
                    !(
                      index === displayImages.length - 1 && remainingCount > 0
                    ) && (
                      <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium backdrop-blur-sm">
                        {image.category}
                      </div>
                    )}

                  {/* Show more overlay */}
                  {index === displayImages.length - 1 && remainingCount > 0 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white text-xl font-semibold">
                        +{remainingCount}
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* View Gallery Button */}
        <motion.button
          className="absolute bottom-4 right-4 bg-white/30 text-white px-4 py-2 rounded-full font-medium backdrop-blur-sm hover:bg-white/40 transition-colors cursor-pointer"
          onClick={() => setShowGallery(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          View Gallery ({images.length})
        </motion.button>
      </div>

      {/* Gallery Modal */}
      {showGallery && (
        <ImageGallery
          images={sortedImages}
          onClose={() => setShowGallery(false)}
          layout={galleryPatternLayout}
          gridPattern={galleryGridPattern}
          masonryColumns={masonryColumns}
        />
      )}

      {/* Image Carousel */}
      {selectedImageIndex !== null && (
        <ImageCarousel
          images={sortedImages}
          initialIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
        />
      )}
    </>
  );
}
