import Stripe from "stripe";
import SuccessClient from "./SuccessClient";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function SuccessPage({ searchParams }) {
  const sessionId = searchParams.session_id;

  if (!sessionId) {
    return <p>No session found.</p>;
  }

  const order = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items"],
  });

  return <SuccessClient order={order} />;
}
