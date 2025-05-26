/**
 * Format a date string into a human-readable format
 * @param dateString - Date string to format
 * @param options - Intl.DateTimeFormat options
 * @returns Formatted date string
 */
export const formatDate = (
  dateString: string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
): string => {
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) {
    console.error(`Invalid date string: ${dateString}`);
    return 'Invalid date';
  }
  
  try {
    return new Intl.DateTimeFormat('en-GB', options).format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return date.toLocaleDateString();
  }
};

/**
 * Get a relative time string (e.g., "2 days ago")
 * @param dateString - Date string to format
 * @returns Relative time string
 */
export const getRelativeTimeString = (dateString: string): string => {
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) {
    console.error(`Invalid date string: ${dateString}`);
    return 'Invalid date';
  }
  
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  
  // Convert to appropriate time unit
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);
  
  // Return the appropriate relative time string
  if (diffYear > 0) {
    return `${diffYear} ${diffYear === 1 ? 'year' : 'years'} ago`;
  } else if (diffMonth > 0) {
    return `${diffMonth} ${diffMonth === 1 ? 'month' : 'months'} ago`;
  } else if (diffDay > 0) {
    return `${diffDay} ${diffDay === 1 ? 'day' : 'days'} ago`;
  } else if (diffHour > 0) {
    return `${diffHour} ${diffHour === 1 ? 'hour' : 'hours'} ago`;
  } else if (diffMin > 0) {
    return `${diffMin} ${diffMin === 1 ? 'minute' : 'minutes'} ago`;
  } else {
    return 'Just now';
  }
}; 