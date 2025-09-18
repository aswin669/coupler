import { User } from '@domain/entities';
import { Prisma, Role } from '@prisma/client';

export interface UserFromRepo {
  id: string;
  full_name: string;
  gender: string;
  city: string;
  education_qualifications: string[];
  latitude?: number | null;
  longitude?: number | null;
  created_at: Date;
}

export interface IUserRepository {
  findAll(params: {
    skip?: number;
    take?: number;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<{ users: User[]; count: number }>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findByMobileNumber(mobileNumber: string): Promise<User | null>;
  findIdByReferralCode(code: string): Promise<{ id: string } | null>;
  findByEmailOrMobileNumber(email: string, mobileNumber: string): Promise<User | null>;
  create(data: User): Promise<{ id: string }>;
  update(id: string, data: Prisma.UserUpdateInput | Prisma.UserUncheckedUpdateInput): Promise<{ id: string }>;
  delete(id: string): Promise<boolean>;
  findUsers(params: {
    skip: number;
    take: number;
    filter: 'ALL' | 'NEW' | 'APPROVED';
    role?: Role;
    location?: string;
    gender?: string;
    qualifications?: string | string[];
    search?: string;
  }): Promise<{ users: UserFromRepo[]; count: number }>;
  findByEmailOrMobileNumberWithId(email: string, mobileNumber: string, userId: string): Promise<User | null>;
}
