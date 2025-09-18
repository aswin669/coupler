import { LoginInput } from '@routes/v1/auth/dto';

export interface IAuthService {
  login(params: LoginInput): Promise<{ userId: string; accessToken: string; refreshToken: string; expiresIn: number }>;
}
