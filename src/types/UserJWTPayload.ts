export type UserJWTPayload = {
  userId: string;
  email: string;
  iat: number;
  exp: number;
};
