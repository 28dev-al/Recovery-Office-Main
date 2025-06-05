/**
 * German Formatting Utilities
 * Professional formatting for the DACH market (Germany, Austria, Switzerland)
 */

/**
 * Format currency for German market
 * Supports EUR (primary), GBP, and USD
 */
export const formatCurrencyGerman = (
  amount: number, 
  currency: 'EUR' | 'GBP' | 'USD' = 'EUR'
): string => {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Format currency ranges for loss amounts
 */
export const formatCurrencyRangeGerman = (
  min: number, 
  max?: number, 
  currency: 'EUR' | 'GBP' | 'USD' = 'EUR'
): string => {
  const formatAmount = (amount: number) => formatCurrencyGerman(amount, currency);
  
  if (!max) {
    return `${formatAmount(min)}+`;
  }
  
  return `${formatAmount(min)} - ${formatAmount(max)}`;
};

/**
 * Format numbers with German thousand separators
 */
export const formatNumberGerman = (number: number): string => {
  return new Intl.NumberFormat('de-DE').format(number);
};

/**
 * Format percentages for German market
 */
export const formatPercentageGerman = (value: number): string => {
  return new Intl.NumberFormat('de-DE', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1
  }).format(value / 100);
};

/**
 * Format dates for German market
 */
export const formatDateGerman = (date: Date | string, format: 'short' | 'long' | 'time' = 'long'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  switch (format) {
    case 'short':
      return new Intl.DateTimeFormat('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(dateObj);
      
    case 'time':
      return new Intl.DateTimeFormat('de-DE', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }).format(dateObj);
      
    case 'long':
    default:
      return new Intl.DateTimeFormat('de-DE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(dateObj);
  }
};

/**
 * Format date and time together
 */
export const formatDateTimeGerman = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  return new Intl.DateTimeFormat('de-DE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(dateObj);
};

/**
 * Format duration in German (e.g., "90 Minuten", "2 Stunden")
 */
export const formatDurationGerman = (minutes: number): string => {
  if (minutes < 60) {
    return `${minutes} Minute${minutes !== 1 ? 'n' : ''}`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours} Stunde${hours !== 1 ? 'n' : ''}`;
  }
  
  return `${hours} Stunde${hours !== 1 ? 'n' : ''} ${remainingMinutes} Minute${remainingMinutes !== 1 ? 'n' : ''}`;
};

/**
 * Validate German phone numbers
 * Supports German, Austrian, and Swiss numbers
 */
export const validateGermanPhone = (phone: string): boolean => {
  // Remove all spaces, dashes, and parentheses
  const cleanPhone = phone.replace(/[\s()-]/g, '');
  
  // German phone number patterns
  const germanPatterns = [
    /^\+49[1-9][0-9]{1,14}$/, // Germany with country code
    /^0[1-9][0-9]{1,14}$/, // Germany without country code
    /^\+43[1-9][0-9]{1,13}$/, // Austria
    /^\+41[1-9][0-9]{1,12}$/, // Switzerland
  ];
  
  return germanPatterns.some(pattern => pattern.test(cleanPhone));
};

/**
 * Format phone number for German display
 */
export const formatPhoneGerman = (phone: string): string => {
  const cleanPhone = phone.replace(/[\s()-]/g, '');
  
  // German mobile format: +49 XXX XXXXXXX
  if (cleanPhone.startsWith('+49')) {
    const number = cleanPhone.substring(3);
    if (number.length >= 10) {
      return `+49 ${number.substring(0, 3)} ${number.substring(3)}`;
    }
    return `+49 ${number}`;
  }
  
  // Austrian format: +43 XXX XXXXXXX
  if (cleanPhone.startsWith('+43')) {
    const number = cleanPhone.substring(3);
    if (number.length >= 9) {
      return `+43 ${number.substring(0, 3)} ${number.substring(3)}`;
    }
    return `+43 ${number}`;
  }
  
  // Swiss format: +41 XX XXX XX XX
  if (cleanPhone.startsWith('+41')) {
    const number = cleanPhone.substring(3);
    if (number.length >= 9) {
      return `+41 ${number.substring(0, 2)} ${number.substring(2, 5)} ${number.substring(5, 7)} ${number.substring(7)}`;
    }
    return `+41 ${number}`;
  }
  
  // German domestic format: 0XXX XXXXXXX
  if (cleanPhone.startsWith('0')) {
    if (cleanPhone.length >= 10) {
      return `${cleanPhone.substring(0, 4)} ${cleanPhone.substring(4)}`;
    }
  }
  
  return phone; // Return original if no pattern matches
};

/**
 * Validate German postal codes
 */
export const validateGermanPostalCode = (postalCode: string): boolean => {
  const clean = postalCode.replace(/\s/g, '');
  
  // German postal codes: 5 digits
  if (/^[0-9]{5}$/.test(clean)) return true;
  
  // Austrian postal codes: 4 digits
  if (/^[0-9]{4}$/.test(clean)) return true;
  
  // Swiss postal codes: 4 digits
  if (/^[0-9]{4}$/.test(clean)) return true;
  
  return false;
};

/**
 * Format address for German market
 */
export const formatAddressGerman = (address: {
  street: string;
  number: string;
  postalCode: string;
  city: string;
  country?: string;
}): string => {
  const { street, number, postalCode, city, country } = address;
  
  let formatted = `${street} ${number}\n${postalCode} ${city}`;
  
  if (country && country !== 'Deutschland') {
    formatted += `\n${country}`;
  }
  
  return formatted;
};

/**
 * Format business hours for German market
 */
export const formatBusinessHoursGerman = (
  hours: { start: string; end: string }[],
  timezone = 'MEZ'
): string => {
  const dayNames = [
    'Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 
    'Donnerstag', 'Freitag', 'Samstag'
  ];
  
  return hours.map((hour, index) => {
    if (index === 0 || index === 6) return null; // Skip Sunday and Saturday for business hours
    return `${dayNames[index]}: ${hour.start}-${hour.end} ${timezone}`;
  }).filter(Boolean).join('\n');
};

/**
 * Get appropriate greeting based on time of day in German
 */
export const getGermanGreeting = (): string => {
  const hour = new Date().getHours();
  
  if (hour < 12) {
    return 'Guten Morgen';
  } else if (hour < 18) {
    return 'Guten Tag';
  } else {
    return 'Guten Abend';
  }
};

/**
 * Format file sizes in German
 */
export const formatFileSizeGerman = (bytes: number): string => {
  const units = ['Byte', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;
  
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  
  return `${size.toFixed(unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`;
};

/**
 * Validate German VAT number (USt-IdNr.)
 */
export const validateGermanVAT = (vatNumber: string): boolean => {
  const clean = vatNumber.replace(/[\s-]/g, '').toUpperCase();
  
  // German VAT: DE + 9 digits
  if (/^DE[0-9]{9}$/.test(clean)) return true;
  
  // Austrian VAT: ATU + 8 digits
  if (/^ATU[0-9]{8}$/.test(clean)) return true;
  
  // Swiss VAT: CHE + 9 digits + MWST
  if (/^CHE[0-9]{9}(MWST)?$/.test(clean)) return true;
  
  return false;
};

/**
 * Format case reference numbers for German market
 */
export const formatCaseReferenceGerman = (
  caseNumber: string,
  year?: number
): string => {
  const currentYear = year || new Date().getFullYear();
  return `RO-${currentYear}-${caseNumber.padStart(6, '0')}`;
};

export default {
  formatCurrencyGerman,
  formatCurrencyRangeGerman,
  formatNumberGerman,
  formatPercentageGerman,
  formatDateGerman,
  formatDateTimeGerman,
  formatDurationGerman,
  validateGermanPhone,
  formatPhoneGerman,
  validateGermanPostalCode,
  formatAddressGerman,
  formatBusinessHoursGerman,
  getGermanGreeting,
  formatFileSizeGerman,
  validateGermanVAT,
  formatCaseReferenceGerman
}; 