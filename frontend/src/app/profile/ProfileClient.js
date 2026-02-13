"use client";

import { useRouter } from "next/navigation";
import * as Styled from "@/styles/Profile.styled";
import { formatPrice } from "@/packages/utils";
import Button from "@/components/button";

export default function ProfileClient({ user, orders }) {
  const router = useRouter();

  return (
    user && (
      <div>
        <Styled.Greeting>Hello, {user.name}</Styled.Greeting>
        <>
          {orders.map((order) => (
            <Styled.Orders key={order.id}>
              <h1>Order Number: {order.id}</h1>
              <h2>Amount: {formatPrice(order.amount / 100)}</h2>
              <h2>Receipt Email: {user.email}</h2>
            </Styled.Orders>
          ))}
        </>
        <Button onClick={() => router.push("/api/auth/logout")}>
          Log Out
        </Button>
      </div>
    )
  );
}
