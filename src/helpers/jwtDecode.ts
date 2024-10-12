import { jwtDecode } from "jwt-decode";

export const decode = (token: string) => {
  const decoded = jwtDecode(token) as JwtPayload;

  return decoded;
};
