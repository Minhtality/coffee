"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import styled from "styled-components";

const Grid = styled.div`
  column-count: 1;
  column-gap: 0.75rem;

  @media (min-width: 640px) {
    column-count: 2;
  }

  @media (min-width: 768px) {
    column-count: 3;
  }
`;

const ImageWrapper = styled(motion.div)`
  position: relative;
  overflow: hidden;
  border-radius: 0.5rem;
  cursor: pointer;
  break-inside: avoid;
  margin-bottom: 0.75rem;
`;

const StyledImage = styled.img`
  display: block;
  object-fit: cover;
  width: 100%;
  height: auto;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  &:hover {
    color: #d1d5db;
  }
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  &:hover {
    color: #d1d5db;
  }
`;

const PrevButton = styled(NavButton)`
  left: 1rem;
`;

const NextButton = styled(NavButton)`
  right: 1rem;
`;

const CarouselImageWrapper = styled(motion.div)`
  max-width: 1024px;
  width: 100%;
`;

const CarouselImage = styled.img`
  object-fit: contain;
  width: 100%;
  height: auto;
`;

const FilterBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  padding: 0 1rem;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1.25rem;
  border-radius: 2rem;
  border: 2px solid var(--primary);
  background: ${({ $active }) => ($active ? "var(--primary)" : "transparent")};
  color: ${({ $active }) => ($active ? "#fff" : "var(--primary)")};
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--primary);
    color: #fff;
  }
`;

export default function PhotoGallery({ photos }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState(null);

  const filteredPhotos = activeFilter
    ? photos.filter(
        (photo) => photo.locations?.country === activeFilter
      )
    : photos;

  const openCarousel = (index) => {
    setCurrentIndex(index);
    setSelectedImage(filteredPhotos[index]);
  };

  const closeCarousel = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % filteredPhotos.length;
    setCurrentIndex(newIndex);
    setSelectedImage(filteredPhotos[newIndex]);
  };

  const prevImage = () => {
    const newIndex =
      (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setCurrentIndex(newIndex);
    setSelectedImage(filteredPhotos[newIndex]);
  };

  useEffect(() => {
    if (!selectedImage) return;
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextImage();
      else if (e.key === "ArrowLeft") prevImage();
      else if (e.key === "Escape") closeCarousel();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, currentIndex, filteredPhotos]);

  const getImageUrl = (photo) => {
    return photo.photo_images?.[0]?.url;
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) closeCarousel();
  };

  const filters = ["Japan", "Korea", "US"];

  return (
    <>
      <FilterBar>
        <FilterButton
          $active={activeFilter === null}
          onClick={() => setActiveFilter(null)}
        >
          All
        </FilterButton>
        {filters.map((country) => (
          <FilterButton
            key={country}
            $active={activeFilter === country}
            onClick={() => setActiveFilter(country)}
          >
            {country}
          </FilterButton>
        ))}
      </FilterBar>
      <Grid>
        {filteredPhotos.map((photo, index) => (
          <ImageWrapper
            key={photo.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => openCarousel(index)}
          >
            <StyledImage
              src={getImageUrl(photo)}
              alt={photo.title}
            />
          </ImageWrapper>
        ))}
      </Grid>
      <AnimatePresence>
        {selectedImage && (
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleOverlayClick}
          >
            <CloseButton onClick={closeCarousel}>
              <X size={32} />
            </CloseButton>

            <PrevButton onClick={prevImage}>
              <ChevronLeft size={48} />
            </PrevButton>

            <CarouselImageWrapper
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <CarouselImage
                src={getImageUrl(selectedImage)}
                alt={selectedImage.title}
              />
            </CarouselImageWrapper>

            <NextButton onClick={nextImage}>
              <ChevronRight size={48} />
            </NextButton>
          </Overlay>
        )}
      </AnimatePresence>
    </>
  );
}
