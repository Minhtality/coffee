import { useRouter } from 'next/router';
import { formatPrice } from '@/packages/utils';
import Image from 'next/image';
import * as Styled from './index.styled';

const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export async function getServerSideProps(params) {
	const order = await stripe.checkout.sessions.retrieve(
		params.query.session_id,
		{
			expand: ['line_items'],
		}
	);

	return { props: { order } };
}

export default function Success({ order }) {
	const route = useRouter();
	console.log(order);
	return (
		<Styled.SuccessContainer
			initial={{ opacity: 0, scale: 0.7 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.5 }}
		>
			<h2>Thank you for your order, {order.customer_details.name}</h2>
			{/* <h3>A confirmation email has been sent to: </h3>
			<h3>{order.customer_details.email}</h3> */}
			<Styled.OrderInformation>
				{/* <Styled.Card>
          <h4>Address</h4>
          {Object.entries(order.customer_details.address).map(
            ([key, value]) =>
              value && (
                <p key={key}>
                  {key} : {value}
                </p>
              )
          )}
        </Styled.Card> */}
				<Styled.Card>
					<h4>Your drinks will be made soon!</h4>
					{/* {order.line_items.data.map((item) => (
						<Styled.LineItem key={item.id}>
							<p>{item.description}</p>
						</Styled.LineItem>
					))} */}
				</Styled.Card>
			</Styled.OrderInformation>
			<Styled.Back onClick={() => route.push('/')}>
				Continue Shopping
			</Styled.Back>
			<Image
				src="/images/goodsoup.gif"
				alt="Good Soup"
				width={400}
				height={300}
			/>
		</Styled.SuccessContainer>
	);
}
