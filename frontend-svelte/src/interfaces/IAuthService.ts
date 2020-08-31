import type { IUserCredentials } from "./IUserCredentials";
import type { IUser } from "./IUser";

export interface IAuthService {
  login(userCredentials: IUserCredentials): Promise<IUser>;
  authorize(): Promise<IUser>;
  logout(): void;
  getToken(): string;
}