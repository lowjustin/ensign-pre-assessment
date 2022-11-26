export type UserFromDB = {
  id: number;
  username: string;
  password: string;
}

export type UserFromToken = {
  userId: number;
  username: string;
  password: string;
}

export type Cart = {
  [index: number]: number;
}