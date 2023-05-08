import { Role } from './role.enum';

export interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  roles: Role[];
}
