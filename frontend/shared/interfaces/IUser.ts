export interface IUser {
  id: number;
  username: 'sksdes'
  email: string;
  role: {
    type: 'authenticated' | 'public'
  }
}