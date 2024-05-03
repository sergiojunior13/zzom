export type User = {
  username: string;
};

export type SignUser = User & { password: string };
export type LoginUser = SignUser;
