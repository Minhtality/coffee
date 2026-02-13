"use client";

import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ContextState } from "@/context";
import Nav from "@/components/Nav";
import { Toaster } from "react-hot-toast";

export default function Providers({ children }) {
  return (
    <UserProvider>
      <ContextState>
        <Toaster />
        <Nav />
        {children}
      </ContextState>
    </UserProvider>
  );
}
