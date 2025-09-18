import bcrypt from 'bcryptjs';
import crypto from 'crypto';

export class Bcrypt {
  static async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  static async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  static generateSecureToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }
}
