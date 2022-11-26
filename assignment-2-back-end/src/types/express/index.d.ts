import { UserFromToken } from "./custom";

export {}

declare global {
  namespace Express {
    export interface Request {
      user?: UserFromToken;
    }
  }
}