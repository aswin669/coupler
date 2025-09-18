import { randomInt } from 'crypto';

export function generateOtp(length = 4) {
  const min = Math.pow(10, length - 1); // 1000 for 4 digits
  const max = Math.pow(10, length); // 10000 for 4 digits
  return randomInt(min, max).toString();
}
