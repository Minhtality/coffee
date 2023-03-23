/* eslint-disable @next/next/no-img-element */
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/router";
import * as Styled from "./index.styled";
import { useUser } from "@auth0/nextjs-auth0/client";

const User = () => {
  const router = useRouter();
  const { user } = useUser();

  if (!user) {
    return (
      <Styled.Profile
        onClick={() => {
          router.push("/api/auth/login");
        }}
      >
        <FaUserCircle />
        <h3>Login</h3>
      </Styled.Profile>
    );
  }
  return (
    <Styled.Profile
      onClick={() => {
        router.push("/profile");
      }}
    >
      <img src={user?.picture} alt={user.name} />
      <h3>{user.given_name}</h3>
    </Styled.Profile>
  );
};

export default User;
