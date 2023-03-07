import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { cartItems } = req.body;

      const session = await stripe.checkout.sessions.create({
        success_url: `${req.headers.origin}/success?&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/cancel`,
        submit_type: "pay",
        payment_method_types: ["card"],
        mode: "payment",
        allow_promotion_codes: true,
        shipping_address_collection: {
          allowed_countries: ["US"],
        },
        shipping_options: [
          {
            shipping_rate: "shr_1MimRCHj9x82W7wK5yCH2Rer",
          },
          {
            shipping_rate: "shr_1MimEwHj9x82W7wKJ5pVUZFQ",
          },
        ],
        line_items: cartItems.map((item) => ({
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
              images: [item.image.data.attributes.formats.thumbnail.url],
            },
            unit_amount: item.price * 100,
          },
        })),
      });

      res.status(200).json(session);
    } catch (error) {
      res.status(error.statusCode || 500).json(error.message);
    }
  }
};

export default handler;
