import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/router";
import * as Styled from "./index.styled";

const User = () => {
  const router = useRouter();
  return (
    <Styled.Profile
      onClick={() => {
        router.push("/api/auth/login");
      }}
    >
      <FaUserCircle />
      <h3>Profile</h3>
    </Styled.Profile>
  );
};

export default User;
