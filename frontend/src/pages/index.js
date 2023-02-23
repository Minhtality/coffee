import Head from "next/head";
import { useQuery } from "urql";
import { PRODUCT_QUERY } from "queries/query";
import Product from "@/components/Product";

export default function Home() {
  const [results] = useQuery({ query: PRODUCT_QUERY });
  const { data, fetching, error } = results;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const products = data.products.data;
  return (
    <>
      <Head>
        <title>Good Soup.</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Good Soup.</h1>
        {products.map((product) => (
          <Product key={product.attributes.slug} product={product} />
        ))}
      </main>
    </>
  );
}
