import { useRouter } from "next/router";
import * as Styled from "@/styles/Profile.styled";
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";
import { formatPrice } from "@/packages/utils";
import Button from "@/components/button";

const stripe = require("stripe")(
  `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const session = await getSession(ctx.req, ctx.res);
    const stripeId = session.user[`${process.env.BASE_URL}/stripe_customer_id`];
    const paymentIntent = await stripe.paymentIntents.list({
      customer: stripeId,
    });
    return { props: { orders: paymentIntent.data } };
  },
});

export default function Profile({ user, orders }) {
  const route = useRouter();

  return (
    user && (
      <div>
        <Styled.Greeting>Hello, {user.name}</Styled.Greeting>
        <>
          {orders.map((order) => (
            <Styled.Orders key={order.id}>
              <h1>Order Number: {order.id}</h1>
              <h2>Amount: {formatPrice(order.amount / 100)}</h2>
              <h2>Receipt Email: {user.email}</h2>
            </Styled.Orders>
          ))}
        </>
        <Button onClick={() => route.push("/api/auth/logout")}>Log Out</Button>
      </div>
    )
  );
}
