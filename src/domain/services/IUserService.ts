import { User } from '@domain/entities';
import { CreateUserInput, UpdateUserInput } from '@routes/v1/admin/users/dto';

export interface UserListParams {
  page?: number;
  limit?: number;
  search?: string;
}

export interface UserListResult {
  users: User[];
  total: number;
  page: number;
  limit: number;
}

export interface IUserService {
  getUsers(params: UserListParams): Promise<UserListResult>;
  getUserById(id: string): Promise<User>;
  createUser(data: CreateUserInput): Promise<{ id: string }>;
  updateUser(id: string, data: UpdateUserInput): Promise<{ id: string }>;
  deleteUser(id: string): Promise<boolean>;
}
