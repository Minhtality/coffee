"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 2rem;
`;

const EmptyState = styled.p`
  color: #9ca3af;
  font-size: 1rem;
  text-align: center;
  padding: 3rem 0;
`;

const CommentCard = styled.div`
  background: #1a1a1a;
  border-radius: 0.75rem;
  padding: 1.25rem;
  margin-bottom: 1rem;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
`;

const CommentMeta = styled.div`
  font-size: 0.85rem;
  color: #9ca3af;
`;

const PhotoTitle = styled.span`
  color: var(--primary);
  font-weight: 600;
`;

const CommentBody = styled.p`
  margin: 0.75rem 0;
  color: white;
  font-size: 0.95rem;
  line-height: 1.5;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`;

const ActionButton = styled.button`
  padding: 0.4rem 1rem;
  border-radius: 0.5rem;
  border: none;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.85;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ApproveButton = styled(ActionButton)`
  background: #16a34a;
  color: white;
`;

const RejectButton = styled(ActionButton)`
  background: #dc2626;
  color: white;
`;

function timeAgo(dateString) {
  const seconds = Math.floor(
    (new Date() - new Date(dateString)) / 1000
  );
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function CommentModeration() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(null);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await fetch("/api/admin/comments");
      const data = await res.json();
      if (res.ok) {
        setComments(data.comments);
      }
    } catch (err) {
      toast.error("Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (commentId, action) => {
    setProcessing(commentId);
    try {
      const res = await fetch("/api/admin/comments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentId, action }),
      });

      if (!res.ok) throw new Error();

      setComments((prev) => prev.filter((c) => c.id !== commentId));
      toast.success(action === "approve" ? "Comment approved" : "Comment rejected");
    } catch {
      toast.error("Action failed");
    } finally {
      setProcessing(null);
    }
  };

  if (loading) {
    return (
      <Container>
        <Title>Comment Moderation</Title>
        <EmptyState>Loading...</EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Comment Moderation</Title>
      {comments.length === 0 ? (
        <EmptyState>No pending comments</EmptyState>
      ) : (
        comments.map((comment) => (
          <CommentCard key={comment.id}>
            <CommentHeader>
              <CommentMeta>
                <strong>{comment.user_name}</strong> on{" "}
                <PhotoTitle>{comment.photos?.title || `Photo #${comment.photo_id}`}</PhotoTitle>
              </CommentMeta>
              <CommentMeta>{timeAgo(comment.created_at)}</CommentMeta>
            </CommentHeader>
            <CommentBody>{comment.body}</CommentBody>
            <Actions>
              <ApproveButton
                onClick={() => handleAction(comment.id, "approve")}
                disabled={processing === comment.id}
              >
                Approve
              </ApproveButton>
              <RejectButton
                onClick={() => handleAction(comment.id, "reject")}
                disabled={processing === comment.id}
              >
                Reject
              </RejectButton>
            </Actions>
          </CommentCard>
        ))
      )}
    </Container>
  );
}
