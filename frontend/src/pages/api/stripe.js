import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { cartItems } = req.body;

      const session = await stripe.checkout.sessions.create({
        submit_type: "pay",
        payment_method_types: ["card"],
        mode: "payment",
        shipping_address_collection: {
          allowed_countries: ["US"],
        },
        line_items: cartItems.map((item) => ({
          quantity: item.quantity,
          price_data: {
            currency: "usd",
            product_data: {
              name: item.title,
              images: [item.image.data.attributes.formats.thumbnail.url],
            },
            unit_amount: item.price * 100,
          },
        })),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/cancel`,
      });

      res.status(200).json(session);
    } catch (error) {
      res.status(error.statusCode || 500).json(error.message);
    }
  }
};

export default handler;
