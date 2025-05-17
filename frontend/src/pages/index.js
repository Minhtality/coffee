import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useQuery } from 'urql';
import { PHOTO_QUERY_BY_CATEGORY } from 'queries/query';
import useEmblaCarousel from 'embla-carousel-react';
import * as Styled from '@/styles/home.styled';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

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

export default function Home() {
	const [category, setCategory] = useState('street');
	const [photo, setPhoto] = useState({});
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
	const [showModal, setShowModal] = useState(false);

	const [selectedImage, setSelectedImage] = useState(null);
 	const [currentIndex, setCurrentIndex] = useState(0);
	// Test here
		const [results] = useQuery({
		query: PHOTO_QUERY_BY_CATEGORY,
		variables: { category },
	});
	const { data, fetching, error } = results;

	if (fetching) return <p>Loading...</p>;
	if (error) return <p>Oh no... {error.message}</p>;

	const photos = data.photos.data;



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


	// const handleCategory = (category) => {
	// 	setCategory(category);
	// };

	// const handleClick = (selectedPhoto) => {
	// 	setPhoto(selectedPhoto);
	// 	setShowModal(true);
	// };

	// const handleClose = () => {
	// 	setShowModal(false);
	// 	setPhoto({});
	// };

	// if (showModal) {
	// 	document.body.style.overflow = 'hidden';
	// } else {
	// 	document.body.style.overflow = 'auto';
	// }

	return (
		<>
			<Head>
				<title>Minhtality</title>
				<meta name="Minhtality" content="Minh's passion projects." />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				 <Grid>
					{photos.map((photo, index) => (
					<ImageWrapper
						key={index}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={() => openCarousel(index)}
					>
						<StyledImage
						src={photo?.attributes?.image.data[0].attributes.formats.large.url}
						alt={photo?.attributes?.title}
						fill
						sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
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
              	src={selectedImage.attributes?.image.data[0].attributes.formats.large.url}
				alt={selectedImage.attributes?.title}
                width={1200}
                height={800}
              />
            </CarouselImageWrapper>

            <NextButton onClick={nextImage}>
              <ChevronRight size={48} />
            </NextButton>
          </Overlay>
        )}
      </AnimatePresence>
			</main>
		</>
	);
}
