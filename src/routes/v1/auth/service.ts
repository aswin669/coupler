import { ErrorType, StatusCode } from '@constants';
import { NotFoundError, UnauthorizedError } from '@domain/errors';
import { IUserRepository } from '@domain/repositories';
import { IAuthService } from '@domain/services';
import { ProfileStatus } from '@prisma/client';
import { Bcrypt, parseTimeToSeconds } from '@utils';
import { FastifyInstance } from 'fastify';

import { LoginInput } from './dto';

export class AuthService implements IAuthService {
  constructor(
    private readonly fastify: FastifyInstance,
    private readonly userRepository: IUserRepository,
  ) {}

  async login(
    params: LoginInput,
  ): Promise<{ userId: string; accessToken: string; refreshToken: string; expiresIn: number }> {
    const user = await this.userRepository.findByMobileNumber(params.mobileNumber);

    if (!user) {
      throw new NotFoundError({
        message: `User not found with mobile number`,
        additionalDetails: {
          field: 'mobileNumber',
          message: 'Mobile number not registered',
        },
      });
    }
    // User not active
    else if (user.profileStatus !== ProfileStatus.ACTIVE) {
      throw new UnauthorizedError({
        message: `User is not active`,
        code: StatusCode.UNAUTHORIZED,
        type: ErrorType.USER_NOT_ACTIVE,
        additionalDetails: {
          field: 'profileStatus',
          message: 'User is not active',
        },
      });
    } else {
      const isPasswordMatch = await Bcrypt.comparePassword(params.password, user.password!);
      if (!isPasswordMatch) {
        throw new UnauthorizedError({
          message: `Invalid credentials`,
          type: ErrorType.INVALID_CREDENTIALS,
          additionalDetails: {
            field: 'mobileNumber,password',
            message: 'Invalid credentials',
          },
        });
      }
    }

    const expiresIn = this.fastify.di.config.jwt.accessTokenExpiresIn;
    const accessToken = this.fastify.generateAccessToken({
      userId: user.id!,
      email: user.email!,
      role: user.role,
    });

    const refreshToken = this.fastify.generateRefreshToken({
      userId: user.id!,
      email: user.email!,
      role: user.role,
      refresh: true,
    });

    return {
      userId: user.id!,
      accessToken,
      refreshToken,
      expiresIn: parseTimeToSeconds(expiresIn),
    };
  }
}
