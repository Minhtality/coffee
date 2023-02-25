import "@/styles/globals.css";
import { createClient, Provider } from "urql";
import Nav from "@/components/nav";
import { ContextState } from "../context/index";

const client = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API });

export default function App({ Component, pageProps }) {
  return (
    <ContextState>
      <Provider value={client}>
        <Nav />
        <Component {...pageProps} />
      </Provider>
    </ContextState>
  );
}
