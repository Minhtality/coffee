import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useQuery } from 'urql';
import { PHOTO_QUERY_BY_CATEGORY } from 'queries/query';
import useEmblaCarousel from 'embla-carousel-react';
import * as Styled from '@/styles/home.styled';

export default function Home() {
	const [category, setCategory] = useState('street');
	const [photo, setPhoto] = useState({});
	const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
	const [showModal, setShowModal] = useState(false);

	const [results] = useQuery({
		query: PHOTO_QUERY_BY_CATEGORY,
		variables: { category },
	});
	const { data, fetching, error } = results;

	if (fetching) return <p>Loading...</p>;
	if (error) return <p>Oh no... {error.message}</p>;

	const photos = data.photos.data;
	const handleCategory = (category) => {
		setCategory(category);
	};

	const handleClick = (selectedPhoto) => {
		setPhoto(selectedPhoto);
		setShowModal(true);
	};

	const handleClose = () => {
		setShowModal(false);
		setPhoto({});
	};

	if (showModal) {
		document.body.style.overflow = 'hidden';
	} else {
		document.body.style.overflow = 'auto';
	}

	return (
		<>
			<Head>
				<title>Minhtality</title>
				<meta name="Minhtality" content="Minh's passion projects." />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				{/* <button onClick={() => handleCategory('street')}>Street</button>
				<button onClick={() => handleCategory('pets')}>Pets</button> */}
				{/* <div ref={emblaRef} className="embla">
					<div className="embla__container">
						{photos.map((photo) => (
							<div
								key={photo.attributes.slug}
								className="embla__slide"
								style={{ position: 'relative', width: '100%' }}
							>
								<img
									src={photo.attributes.image.data[0].attributes.formats.large.url}
									alt={photo.attributes.title}
									className="embla__slide__img"
									style={{ height: '100vh' }}
								/>
							</div>
						))}
					</div>
				</div> */}
				<Styled.HomeContainer>
					{photos.map((photo) => (
						<Styled.Photo key={photo.attributes.slug} onClick={() => handleClick(photo)}>
							<img
								src={photo.attributes.image.data[0].attributes.formats.medium.url}
								alt={photo.attributes.title}
							/>
						</Styled.Photo>
					))}
				</Styled.HomeContainer>
				{showModal && (
					<Styled.Modal onClick={handleClose}>
						<Styled.ModalContent>
							<Styled.Close onClick={handleClose}>X</Styled.Close>
							<img
								src={photo?.attributes?.image.data[0].attributes.formats.large.url}
								alt={photo?.attributes?.title}
							/>
						</Styled.ModalContent>
					</Styled.Modal>
				)}
			</main>
		</>
	);
}
