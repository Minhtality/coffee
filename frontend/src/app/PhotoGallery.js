"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ImageWrapper = styled(motion.div)`
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 0.5rem;
  cursor: pointer;
`;

const StyledImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
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

export default function PhotoGallery({ photos }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openCarousel = (index) => {
    setCurrentIndex(index);
    setSelectedImage(photos[index]);
  };

  const closeCarousel = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const newIndex = (currentIndex + 1) % photos.length;
    setCurrentIndex(newIndex);
    setSelectedImage(photos[newIndex]);
  };

  const prevImage = () => {
    const newIndex = (currentIndex - 1 + photos.length) % photos.length;
    setCurrentIndex(newIndex);
    setSelectedImage(photos[newIndex]);
  };

  const getImageUrl = (photo) => {
    return photo.photo_images?.[0]?.url;
  };

  return (
    <>
      <Grid>
        {photos.map((photo, index) => (
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
