"use client";

import { useState } from "react";
import styled from "styled-components";
import toast from "react-hot-toast";

const Container = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 0.25rem;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.625rem 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  transition: border-color 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.625rem 0.75rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.2s;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: var(--primary);
  }
`;

const Preview = styled.img`
  max-width: 100%;
  max-height: 300px;
  border-radius: 0.5rem;
  margin-top: 0.5rem;
  object-fit: contain;
`;

const SubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: var(--primary);
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const FieldGroup = styled.div`
  display: flex;
  gap: 1rem;

  & > div {
    flex: 1;
  }
`;

export default function AdminUpload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCity("");
    setCountry("");
    setImageFile(null);
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      toast.error("Please select an image");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("city", city);
      formData.append("country", country);
      formData.append("image", imageFile);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      toast.success("Photo uploaded successfully!");
      resetForm();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Title>Upload Photo</Title>
      <Form onSubmit={handleSubmit}>
        <div>
          <Label>Title *</Label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <Label>Description</Label>
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <FieldGroup>
          <div>
            <Label>City *</Label>
            <Input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Country *</Label>
            <Input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
        </FieldGroup>

        <div>
          <Label>Image *</Label>
          <Input type="file" accept="image/*" onChange={handleImageChange} />
          {preview && <Preview src={preview} alt="Preview" />}
        </div>

        <SubmitButton type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload Photo"}
        </SubmitButton>
      </Form>
    </Container>
  );
}
