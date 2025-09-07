"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

interface HeroImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  subtitle?: string;
}

interface HeroCarouselProps {
  images?: HeroImage[];
  autoPlayInterval?: number;
  height?: string;
}

const defaultImages: HeroImage[] = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&h=800&fit=crop",
    alt: "Modern luxury home exterior",
    title: "Modern Luxury Living",
    subtitle: "Exceptional homes for exceptional people",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=800&fit=crop",
    alt: "Beautiful mansion with pool",
    title: "Waterfront Paradise",
    subtitle: "Where dreams meet reality",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&h=800&fit=crop",
    alt: "Contemporary house design",
    title: "Contemporary Elegance",
    subtitle: "Designed for modern living",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1920&h=800&fit=crop",
    alt: "Stunning architectural home",
    title: "Architectural Marvel",
    subtitle: "Where art meets home",
  },
];

export function HeroCarousel({
  images = defaultImages,
  autoPlayInterval = 5000,
  height = "h-[50vh]",
}: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      // Temporarily pause auto-play when user manually selects
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(true), autoPlayInterval * 2);
    },
    [autoPlayInterval]
  );

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, autoPlayInterval]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), autoPlayInterval * 2);
      } else if (e.key === "ArrowRight") {
        nextSlide();
        setIsAutoPlaying(false);
        setTimeout(() => setIsAutoPlaying(true), autoPlayInterval * 2);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevSlide, nextSlide, autoPlayInterval]);

  const currentImage = images[currentIndex];

  return (
    <div
      className={`relative w-full ${height} overflow-hidden bg-gray-900 rounded-lg shadow-lg`}
    >
      {/* Image Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          {/* Image with Ken Burns effect */}

          <motion.div
            className="absolute inset-0 w-full h-full"
            initial={{ scale: 1 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: autoPlayInterval / 1000, ease: "linear" }}
          >
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              className="object-cover object-center"
              priority={currentIndex === 0}
              quality={90}
              sizes="100vw"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Title and Subtitle - Bottom Left */}
      <AnimatePresence mode="wait">
        {/* Gradient Overlay */}
        <div className="bg-linear-to-t from-black/60 from-10% to-transparent to-70% absolute inset-0"></div>
        <motion.div
          key={currentImage.id}
          className="absolute bottom-0 left-0 p-8 md:p-12 lg:p-16 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {currentImage.title}
          </motion.div>
          {currentImage.subtitle && (
            <motion.p
              className="text-lg md:text-xl text-white/90"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {currentImage.subtitle}
            </motion.p>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Pills - Bottom Center */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className="group relative p-1"
            aria-label={`Go to slide ${index + 1}`}
          >
            <div
              className={`h-1 transition-all duration-300 rounded-full ${
                index === currentIndex
                  ? "w-10 bg-white"
                  : "w-5 bg-white/50 hover:bg-white/70"
              }`}
            />
            {/* Progress indicator for active slide */}
            {index === currentIndex && isAutoPlaying && (
              <motion.div
                className="absolute inset-0 p-1"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: autoPlayInterval / 1000,
                  ease: "linear",
                }}
                style={{ transformOrigin: "left" }}
              >
                <div className="h-1 bg-white/30 rounded-full" />
              </motion.div>
            )}
          </button>
        ))}
      </div>

      {/* Optional Manual Navigation Arrows */}
      <button
        onClick={() => {
          prevSlide();
          setIsAutoPlaying(false);
          setTimeout(() => setIsAutoPlaying(true), autoPlayInterval * 2);
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-colors opacity-0 hover:opacity-100 focus:opacity-100"
        aria-label="Previous slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={() => {
          nextSlide();
          setIsAutoPlaying(false);
          setTimeout(() => setIsAutoPlaying(true), autoPlayInterval * 2);
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-colors opacity-0 hover:opacity-100 focus:opacity-100"
        aria-label="Next slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}
