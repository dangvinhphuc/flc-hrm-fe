import { RoleEnum } from '../enums/role.enum';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roleName: RoleEnum;
  isActive: boolean;
  checked?: boolean;
}

export interface UserRegistration {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roleName: RoleEnum;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  accessToken: string;
  user: User;
}

export interface UsersResponseDto {
  data: User[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface UpdateUserDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roleName: RoleEnum;
}


