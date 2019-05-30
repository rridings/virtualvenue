import { Role } from '../model/role';

export class User {
  id: string;
  email: string;
  name: string;
  picture: string;
  last_login: number;
  role: Role;
}
