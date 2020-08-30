import type { IAuthService, IUserCredentials, IUser } from "../interfaces";

export class AuthService implements IAuthService {
  
  public async login(userCredentials: IUserCredentials): Promise<IUser> {
    return {
      id: 1,
      name: 'Test'
    }
  }

}