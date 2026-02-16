"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Trash2,
  Pencil,
  Plus,
  Heart,
  MessageCircle,
  Send,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import styled from "styled-components";
import toast from "react-hot-toast";
import { getFingerprint } from "@/lib/fingerprint";

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
  transition: filter 0.3s ease;
  filter: ${({ $dimmed }) => ($dimmed ? "grayscale(100%)" : "none")};
`;

const StyledImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
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
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const GridLikeButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 2;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  width: 2.25rem;
  height: 2.25rem;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  font-size: 0.75rem;
  opacity: 0;
  transition: opacity 0.2s ease, transform 0.15s ease;

  ${ImageWrapper}:hover & {
    opacity: 1;
  }

  &:hover {
    transform: scale(1.15);
    background: rgba(0, 0, 0, 0.7);
  }
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
  z-index: 2;
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
  z-index: 2;
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

const CarouselContent = styled(motion.div)`
  max-width: 90vw;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 95vh;
  overflow-y: auto;
`;

const CarouselImage = styled.img`
  object-fit: contain;
  width: 100%;
  height: auto;
  max-height: 85vh;
`;

const CarouselInfoBar = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  width: 100%;
  justify-content: center;
`;

const LikeButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.9rem;
  padding: 0.4rem 0.6rem;
  border-radius: 0.5rem;
  transition: background 0.15s ease, transform 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: scale(1.05);
  }
`;

const CommentsToggle = styled(LikeButton)``;

const CommentsPanel = styled.div`
  width: 100%;
  max-width: 600px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.75rem;
  padding: 1rem;
  margin-top: 0.5rem;
  max-height: 300px;
  overflow-y: auto;
`;

const CommentItem = styled.div`
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
  }
`;

const CommentAuthor = styled.span`
  font-weight: 600;
  color: white;
  font-size: 0.85rem;
`;

const CommentTime = styled.span`
  color: #9ca3af;
  font-size: 0.75rem;
  margin-left: 0.5rem;
`;

const CommentBody = styled.p`
  margin: 0.25rem 0 0;
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.85rem;
  line-height: 1.4;
`;

const CommentForm = styled.form`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
`;

const CommentInput = styled.input`
  flex: 1;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 0.85rem;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const SendButton = styled.button`
  background: var(--primary);
  border: none;
  border-radius: 0.5rem;
  color: white;
  cursor: pointer;
  padding: 0.5rem 0.75rem;
  display: flex;
  align-items: center;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.85;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const LoginPrompt = styled.p`
  color: #9ca3af;
  font-size: 0.85rem;
  text-align: center;
  margin-top: 0.75rem;

  a {
    color: var(--primary);
    text-decoration: underline;
    cursor: pointer;
  }
`;

const NoComments = styled.p`
  color: #9ca3af;
  font-size: 0.85rem;
  text-align: center;
  padding: 0.5rem 0;
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

function timeAgo(dateString) {
  const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function seededShuffle(arr) {
  const shuffled = [...arr];
  // Seed from sum of IDs for stable but random-looking order
  let seed = shuffled.reduce((sum, p) => sum + (p.id || 0), 0);
  const random = () => {
    seed = (seed * 16807 + 0) % 2147483647;
    return seed / 2147483647;
  };
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function PhotoGallery({ photos, isAdmin }) {
  const router = useRouter();
  const { user } = useUser();
  const [localPhotos, setLocalPhotos] = useState(() => seededShuffle(photos));
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeFilter, setActiveFilter] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hoveredPhoto, setHoveredPhoto] = useState(null);

  // Likes state
  const [likeCounts, setLikeCounts] = useState({});
  const [userLikes, setUserLikes] = useState(new Set());

  // Comments state
  const [comments, setComments] = useState({});
  const [commentText, setCommentText] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    setLocalPhotos(seededShuffle(photos));
  }, [photos]);

  // Fetch like counts on mount
  useEffect(() => {
    const fingerprint = getFingerprint();
    if (!fingerprint) return;

    fetch(`/api/likes/counts?fingerprint=${encodeURIComponent(fingerprint)}`)
      .then((res) => res.json())
      .then((data) => {
        setLikeCounts(data.counts || {});
        setUserLikes(new Set(data.userLikes || []));
      })
      .catch(console.error);
  }, []);

  // Fetch comments when carousel opens
  useEffect(() => {
    if (!selectedImage) {
      setShowComments(false);
      return;
    }

    const photoId = selectedImage.id;

    fetch(`/api/comments/${photoId}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        setComments((prev) => ({ ...prev, [photoId]: data.comments || [] }));
      })
      .catch(console.error);
  }, [selectedImage]);

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

  const handleLike = async (e, photoId) => {
    e.stopPropagation();
    const fingerprint = getFingerprint();
    if (!fingerprint) return;

    const wasLiked = userLikes.has(photoId);

    // Optimistic update
    setUserLikes((prev) => {
      const next = new Set(prev);
      if (wasLiked) next.delete(photoId);
      else next.add(photoId);
      return next;
    });
    setLikeCounts((prev) => ({
      ...prev,
      [photoId]: (prev[photoId] || 0) + (wasLiked ? -1 : 1),
    }));

    try {
      const res = await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photoId, fingerprint }),
      });
      const data = await res.json();
      if (res.ok) {
        setLikeCounts((prev) => ({ ...prev, [photoId]: data.likeCount }));
      }
    } catch (err) {
      // Revert on error
      setUserLikes((prev) => {
        const next = new Set(prev);
        if (wasLiked) next.add(photoId);
        else next.delete(photoId);
        return next;
      });
      setLikeCounts((prev) => ({
        ...prev,
        [photoId]: (prev[photoId] || 0) + (wasLiked ? 1 : -1),
      }));
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!commentText.trim() || !selectedImage) return;

    setSubmittingComment(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ photoId: selectedImage.id, body: commentText }),
      });

      if (!res.ok) throw new Error();

      setCommentText("");
      toast.success("Comment submitted for approval");
    } catch {
      toast.error("Failed to submit comment");
    } finally {
      setSubmittingComment(false);
    }
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

  const currentComments = selectedImage ? comments[selectedImage.id] || [] : [];

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
            $dimmed={hoveredPhoto !== null && hoveredPhoto !== photo.id}
            whileHover={editMode ? {} : { scale: 1.05 }}
            onMouseEnter={() => setHoveredPhoto(photo.id)}
            onMouseLeave={() => setHoveredPhoto(null)}
            onClick={() => openCarousel(index)}
          >
            <StyledImage
              src={getImageUrl(photo)}
              alt={photo.title}
            />
            {!editMode && (
              <>
                <GridLikeButton
                  onClick={(e) => handleLike(e, photo.id)}
                  aria-label={userLikes.has(photo.id) ? "Unlike" : "Like"}
                >
                  <Heart
                    size={14}
                    fill={userLikes.has(photo.id) ? "#ef4444" : "none"}
                    color={userLikes.has(photo.id) ? "#ef4444" : "white"}
                  />
                </GridLikeButton>
                {(photo.title || photo.description) && (
                  <InfoOverlay>
                    {photo.title && <InfoTitle>{photo.title}</InfoTitle>}
                    {photo.description && (
                      <InfoDescription>{photo.description}</InfoDescription>
                    )}
                  </InfoOverlay>
                )}
              </>
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
            <>
              <UploadFab
                onClick={() => router.push("/admin")}
                aria-label="Upload new photo"
              >
                <Plus size={22} />
              </UploadFab>
              <UploadFab
                onClick={() => router.push("/admin/comments")}
                aria-label="Moderate comments"
              >
                <MessageCircle size={20} />
              </UploadFab>
            </>
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

            <CarouselContent
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CarouselImage
                src={getImageUrl(selectedImage)}
                alt={selectedImage.title}
              />

              <CarouselInfoBar>
                <LikeButton
                  onClick={(e) => handleLike(e, selectedImage.id)}
                  aria-label={userLikes.has(selectedImage.id) ? "Unlike" : "Like"}
                >
                  <Heart
                    size={20}
                    fill={userLikes.has(selectedImage.id) ? "#ef4444" : "none"}
                    color={userLikes.has(selectedImage.id) ? "#ef4444" : "white"}
                  />
                  <span>{likeCounts[selectedImage.id] || 0}</span>
                </LikeButton>

                <CommentsToggle
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowComments((prev) => !prev);
                  }}
                >
                  <MessageCircle size={20} />
                  <span>{currentComments.length}</span>
                </CommentsToggle>
              </CarouselInfoBar>

              {showComments && (
                <CommentsPanel onClick={(e) => e.stopPropagation()}>
                  {currentComments.length === 0 ? (
                    <NoComments>No comments yet</NoComments>
                  ) : (
                    currentComments.map((comment) => (
                      <CommentItem key={comment.id}>
                        <div>
                          <CommentAuthor>{comment.user_name}</CommentAuthor>
                          <CommentTime>{timeAgo(comment.created_at)}</CommentTime>
                        </div>
                        <CommentBody>{comment.body}</CommentBody>
                      </CommentItem>
                    ))
                  )}

                  {user ? (
                    <CommentForm onSubmit={handleSubmitComment}>
                      <CommentInput
                        type="text"
                        placeholder="Add a comment..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <SendButton
                        type="submit"
                        disabled={!commentText.trim() || submittingComment}
                      >
                        <Send size={16} />
                      </SendButton>
                    </CommentForm>
                  ) : (
                    <LoginPrompt>
                      <a href="/api/auth/login">Log in</a> to leave a comment
                    </LoginPrompt>
                  )}
                </CommentsPanel>
              )}
            </CarouselContent>

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
