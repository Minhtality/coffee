import * as Styled from './index.styled';
import Link from 'next/link';

export default function Index({ product, variants }) {
	const { title, price, image, slug } = product.attributes;
	const { url, name } = image.data.attributes.formats.small;
	return (
		<Styled.Product variants={variants} href={`/product/${slug}`}>
			<Styled.ProductWrapper>
				<Styled.ImageWrapper>
					<img src={url} alt={name} />
				</Styled.ImageWrapper>
				<div>
					<h2>{title}</h2>
				</div>
				<h3>{price}</h3>
			</Styled.ProductWrapper>
		</Styled.Product>
	);
}
