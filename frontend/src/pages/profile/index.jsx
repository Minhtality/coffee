import { useRouter } from "next/router";
import * as Styled from "./index.styled";
import Link from "next/link";
import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";

const stripe = require("stripe")(
  `${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`
);

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const session = await getSession(ctx.req, ctx.res);
    const stripeId = session.user[`${process.env.BASE_URL}/stripe_customer_id`];
    const paymentIntent = await stripe.paymentIntents.list({
      customer: stripeId,
      // limit: 100,
    });
    return { props: { orders: paymentIntent.data } };
  },
});

export default function Profile({ user, orders }) {
  const router = useRouter();

  return (
    <div>
      <pre>{JSON.stringify(orders)}</pre>
    </div>
  );
}
