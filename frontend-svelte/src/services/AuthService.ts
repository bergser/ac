import type { IAuthService, IUserCredentials, IUser } from "../interfaces";
import axios from 'axios';
import Logger from  'js-logger';
const LOG_SOURCE: string = 'PostService';

export class AuthService implements IAuthService {
  
  public constructor(
    private url: string
    ) {}

  public getToken(): string {
    return window.localStorage.getItem('jwt');
  }

  public logout(): void {
    Logger.trace(`[${LOG_SOURCE}] logout()`);
    window.localStorage.removeItem('jwt');
  }

  public async authenticate(): Promise<IUser> {
    Logger.trace(`[${LOG_SOURCE}] authenticate()`);
    try {
      const jwt = this.getToken();
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
    Logger.debug(`[${LOG_SOURCE}] login()`);
    const { data } = await axios.post(`${this.url}/auth/local`, userCredentials);
    const {user, jwt} = data as {
      jwt: string,
      user: IUser
    };
    window.localStorage.setItem('jwt', jwt);
    return user;
  }
}
