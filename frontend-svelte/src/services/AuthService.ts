import type { IAuthService, IUserCredentials, IUser } from "../interfaces";
import axios from 'axios';

export class AuthService implements IAuthService {
  
  public constructor(private url: string) {}

  public logout(): void {
    window.localStorage.removeItem('jwt');
  }

  public async authorize(): Promise<IUser> {
    try {
      const jwt = window.localStorage.getItem('jwt');
      const { data } = await axios.get(`${this.url}/users/me`, {
        headers: {
          Authorization:
            `Bearer ${jwt}`,
        },
      });
      return data as IUser;
    } catch (error) {
      return null; 
    }
  }
  
  public async login(userCredentials: IUserCredentials): Promise<IUser> {
    const { data } = await axios.post(`${this.url}/auth/local`, userCredentials);
    const {user, jwt} = data as {
      jwt: string,
      user: IUser
    };
    window.localStorage.setItem('jwt', jwt);
    return user;
  }
}
