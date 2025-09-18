export function convertHeightToCm(height: number, unit: 'cm' | 'm' | 'inches'): number {
  switch (unit) {
    case 'm':
      return height * 100;
    case 'inches':
      return height * 2.54;
    case 'cm':
    default:
      return height;
  }
}

export function convertWeightToKg(weight: number, unit: 'kg' | 'lbs'): number {
  switch (unit) {
    case 'lbs':
      return weight * 0.453592;
    case 'kg':
    default:
      return weight;
  }
}
