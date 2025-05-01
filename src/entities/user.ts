export type User = {
  id: number;
  email: string;
};

export type UserSensitive = User & {
  password: string;
};
