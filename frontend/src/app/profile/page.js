import { getSession } from "@auth0/nextjs-auth0";
import Stripe from "stripe";
import ProfileClient from "./ProfileClient";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function ProfilePage() {
  const session = await getSession();

  if (!session) {
    return null;
  }

  const user = session.user;
  const stripeId = user[`${process.env.BASE_URL}/stripe_customer_id`];

  let orders = [];
  if (stripeId) {
    const paymentIntent = await stripe.paymentIntents.list({
      customer: stripeId,
    });
    orders = paymentIntent.data;
  }

  return <ProfileClient user={user} orders={orders} />;
}
