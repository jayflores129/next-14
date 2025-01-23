import { AccessTokenContext } from "@/context/AccessTokenContext";
import { useContext } from "react";

export default function useAccessToken() {
  const accessToken = useContext(AccessTokenContext);

  return accessToken;
}
