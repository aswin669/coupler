import { User } from '@domain/entities';
import { IUserRepository } from '@domain/repositories';
import { IUserService, UserListParams, UserListResult } from '@domain/services';
import { ApprovalStatus } from '@prisma/client';
import { getReferralCode, getReferralPrefix } from '@utils';

import { CreateUserInput, UpdateUserInput } from './dto';

export class UserService implements IUserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async getUsers(params: UserListParams): Promise<UserListResult> {
    const { page = 1, limit = 20, search } = params;
    const skip = (page - 1) * limit;

    // Build search condition if search parameter is provided
    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { email: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : undefined;

    const { users, count } = await this.userRepository.findAll({
      skip,
      take: limit,
      where,
      orderBy: { createdAt: 'desc' },
    });

    return {
      users,
      total: count,
      page,
      limit,
    };
  }

  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }

    return user;
  }

  async createUser(data: CreateUserInput): Promise<{ id: string }> {
    // Check if user with email already exists
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new Error(`User with email ${data.email} already exists`);
    }

    const referralPrefix = getReferralPrefix(data.fullName);
    const referralCode = `${referralPrefix}-${await getReferralCode()}`;

    const newUser = new User({
      email: data.email,
      emailVerified: false,
      fullName: data.fullName,
      role: data.role,
      password: data.password,
      mobileNumber: data.mobileNumber,
      mobileNumberVerified: false,
      dob: new Date(data.dob),
      gender: data.gender,
      profileStatus: data.profileStatus,
      approvalStatus: ApprovalStatus.PENDING,
      referralCode: referralCode,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const createdUser = await this.userRepository.create(newUser);
    return { id: createdUser.id };
  }

  async updateUser(id: string, data: UpdateUserInput): Promise<{ id: string }> {
    // Check if user exists
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }

    // Check if email is being updated and is not already taken
    if (data.email && data.email !== user.email) {
      const existingUser = await this.userRepository.findByEmail(data.email);

      if (existingUser) {
        throw new Error(`User with email ${data.email} already exists`);
      }
    }

    const updatedUser = await this.userRepository.update(id, data);

    return { id: updatedUser.id };
  }

  async deleteUser(id: string): Promise<boolean> {
    // Check if user exists
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }

    return this.userRepository.delete(id);
  }
}
