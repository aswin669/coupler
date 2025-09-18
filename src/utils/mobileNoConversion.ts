// When working with only Indian Mobile Numbers
export function getMobileNoConversion(mobileNo: string): string {
  if (mobileNo.startsWith('0')) {
    return mobileNo.substring(1);
  }
  if (mobileNo.startsWith('+91')) {
    return mobileNo.substring(3);
  }
  if (mobileNo.startsWith('91')) {
    return mobileNo.substring(2);
  }
  return mobileNo;
}
