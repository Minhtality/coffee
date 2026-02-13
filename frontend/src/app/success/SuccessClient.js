"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import * as Styled from "@/styles/Success.styled";
import Button from "@/components/button";

export default function SuccessClient({ order }) {
  const router = useRouter();

  return (
    <Styled.SuccessContainer
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Thank you for your order, {order.customer_details.name}</h2>
      <Styled.OrderInformation>
        <Styled.Card>
          <h3>Your drinks will be made soon!</h3>
        </Styled.Card>
      </Styled.OrderInformation>
      <Button onClick={() => router.push("/")}>Continue Shopping</Button>
      <Image
        src="/images/goodsoup.gif"
        alt="Good Soup"
        width={400}
        height={300}
      />
    </Styled.SuccessContainer>
  );
}
