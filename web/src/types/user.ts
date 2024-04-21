export type User = {
  name: string;
  email: string;
};

export type SignUser = User & { password: string };
