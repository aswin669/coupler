const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

let generateReferralCode: (size?: number) => string;

export async function getReferralCode() {
  if (!generateReferralCode) {
    const { customAlphabet } = await import('nanoid');
    generateReferralCode = customAlphabet(alphabet, 5);
  }
  return generateReferralCode();
}

const sanitize = (str: string) => str.replace(/[^a-zA-Z0-9]/g, '');

export const getReferralPrefix = (name: string) => sanitize(name).slice(0, 3).toUpperCase();
