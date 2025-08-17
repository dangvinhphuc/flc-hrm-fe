import { RoleEnum } from "../enums/role.enum";

export interface User {}

export interface UserRegistration {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: RoleEnum;
}
