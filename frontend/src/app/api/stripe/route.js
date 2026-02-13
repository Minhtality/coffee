import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getSession } from "@auth0/nextjs-auth0";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { cartItems } = await req.json();
    const session = await getSession();
    const user = session?.user;

    const lineItems = cartItems.map((item) => ({
      quantity: item.quantity,
      adjustable_quantity: {
        enabled: true,
        minimum: 1,
        maximum: 10,
      },
      price_data: {
        currency: "usd",
        product_data: {
          name: item.title,
          images: [item.image_url],
        },
        unit_amount: Math.round(item.price * 100),
      },
    }));

    const origin = req.headers.get("origin");

    const sessionConfig = {
      success_url: `${origin}/success?&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
      submit_type: "pay",
      payment_method_types: ["card"],
      mode: "payment",
      allow_promotion_codes: true,
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      shipping_options: [
        { shipping_rate: "shr_1MimRCHj9x82W7wK5yCH2Rer" },
        { shipping_rate: "shr_1MimEwHj9x82W7wKJ5pVUZFQ" },
      ],
      line_items: lineItems,
    };

    if (user) {
      const stripeId = user["http://localhost:3000/stripe_customer_id"];
      if (stripeId) {
        sessionConfig.customer = stripeId;
      }
    }

    const checkoutSession = await stripe.checkout.sessions.create(sessionConfig);
    return NextResponse.json(checkoutSession);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode || 500 }
    );
  }
}
