"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Trash2, Pencil, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
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
  aspect-ratio: 3 / 4;
`;

const InfoOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.75));
  opacity: 0;
  transition: opacity 0.2s ease;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 0.75rem;
  padding-top: 2.5rem;
  pointer-events: none;

  ${ImageWrapper}:hover & {
    opacity: 1;
  }
`;

const InfoTitle = styled.p`
  margin: 0;
  color: white;
  font-size: 0.85rem;
  font-weight: 600;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const InfoDescription = styled.p`
  margin: 0.15rem 0 0;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.75rem;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const EditModeOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DeleteBadge = styled.button`
  background: #dc2626;
  border: 3px solid white;
  border-radius: 50%;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: transform 0.15s ease, background 0.15s ease;

  &:hover {
    transform: scale(1.15);
    background: #b91c1c;
  }
`;

const FabGroup = styled.div`
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 40;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  gap: 0.75rem;
`;

const FabButton = styled.button`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: background 0.2s ease, transform 0.15s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const EditToggleButton = styled(FabButton)`
  background: ${({ $active }) => ($active ? "#dc2626" : "var(--primary)")};
`;

const UploadFab = styled(FabButton)`
  background: var(--primary);
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

const ConfirmBackdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ConfirmBox = styled(motion.div)`
  background: #1a1a1a;
  border-radius: 0.75rem;
  padding: 2rem;
  max-width: 400px;
  width: 90%;
  text-align: center;
  color: white;
`;

const ConfirmTitle = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
`;

const ConfirmText = styled.p`
  margin: 0 0 1.5rem;
  color: #9ca3af;
  font-size: 0.9rem;
`;

const ConfirmActions = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: center;
`;

const CancelBtn = styled.button`
  padding: 0.5rem 1.25rem;
  border-radius: 0.5rem;
  border: 1px solid #4b5563;
  background: transparent;
  color: white;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background: #374151;
  }
`;

const ConfirmDeleteBtn = styled.button`
  padding: 0.5rem 1.25rem;
  border-radius: 0.5rem;
  border: none;
  background: #dc2626;
  color: white;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    background: #b91c1c;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default function PhotoGallery({ photos, isAdmin }) {
  const router = useRouter();
  const [localPhotos, setLocalPhotos] = useState(photos);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setLocalPhotos(photos);
  }, [photos]);

  const filteredPhotos = activeFilter
    ? localPhotos.filter(
        (photo) => photo.locations?.country === activeFilter
      )
    : localPhotos;

  const openCarousel = (index) => {
    if (editMode) return;
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

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch("/api/admin/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photoId: deleteTarget.id }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Delete failed");
      }
      setLocalPhotos((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete photo: " + err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const filters = useMemo(() => {
    const countries = new Set();
    localPhotos.forEach((photo) => {
      const country = photo.locations?.country;
      if (country) countries.add(country);
    });
    return [...countries].sort();
  }, [localPhotos]);

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
            whileHover={editMode ? {} : { scale: 1.05 }}
            whileTap={editMode ? {} : { scale: 0.95 }}
            onClick={() => openCarousel(index)}
          >
            <StyledImage
              src={getImageUrl(photo)}
              alt={photo.title}
            />
            {!editMode && (photo.title || photo.description) && (
              <InfoOverlay>
                {photo.title && <InfoTitle>{photo.title}</InfoTitle>}
                {photo.description && (
                  <InfoDescription>{photo.description}</InfoDescription>
                )}
              </InfoOverlay>
            )}
            {editMode && (
              <EditModeOverlay>
                <DeleteBadge
                  onClick={() => setDeleteTarget(photo)}
                  aria-label="Delete photo"
                >
                  <Trash2 size={20} />
                </DeleteBadge>
              </EditModeOverlay>
            )}
          </ImageWrapper>
        ))}
      </Grid>

      {isAdmin && (
        <FabGroup>
          <EditToggleButton
            $active={editMode}
            onClick={() => setEditMode((prev) => !prev)}
            aria-label={editMode ? "Exit edit mode" : "Enter edit mode"}
          >
            {editMode ? <X size={22} /> : <Pencil size={20} />}
          </EditToggleButton>
          {editMode && (
            <UploadFab
              onClick={() => router.push("/admin")}
              aria-label="Upload new photo"
            >
              <Plus size={22} />
            </UploadFab>
          )}
        </FabGroup>
      )}

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
      <AnimatePresence>
        {deleteTarget && (
          <ConfirmBackdrop
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !isDeleting && setDeleteTarget(null)}
          >
            <ConfirmBox
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ConfirmTitle>Delete this photo?</ConfirmTitle>
              <ConfirmText>
                This will permanently remove the photo from the gallery.
              </ConfirmText>
              <ConfirmActions>
                <CancelBtn
                  onClick={() => setDeleteTarget(null)}
                  disabled={isDeleting}
                >
                  Cancel
                </CancelBtn>
                <ConfirmDeleteBtn
                  onClick={handleConfirmDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </ConfirmDeleteBtn>
              </ConfirmActions>
            </ConfirmBox>
          </ConfirmBackdrop>
        )}
      </AnimatePresence>
    </>
  );
}
