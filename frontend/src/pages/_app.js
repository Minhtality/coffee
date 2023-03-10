import "@/styles/globals.css";
import { createClient, Provider } from "urql";
import Nav from "@/components/Nav";
import { ContextState } from "../context/index";
import React from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { Toaster } from "react-hot-toast";

const client = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API });

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <ContextState>
        <Provider value={client}>
          <Toaster />
          <Nav />
          <Component {...pageProps} />
        </Provider>
      </ContextState>
    </UserProvider>
  );
}
