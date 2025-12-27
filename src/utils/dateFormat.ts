/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

export const DATE_FORMAT_MM_DD_YYYY = 'MM/DD/YYYY';

const slashPositions: number[] = DATE_FORMAT_MM_DD_YYYY.split('').reduce(
  (acc: number[], char: string, i: number) => {
    if (char === '/') {
      acc.push(i - acc.length);
    }
    return acc;
  },
  []
);

export const toBirthDateTextField = (input: string): string => {
  let formattedDate = '';
  let inputIndex = 0;

  for (const element of input) {
    const char = element;

    if (char === '/') {
      continue;
    }

    if (slashPositions.includes(inputIndex)) {
      formattedDate += '/';
    }

    formattedDate += char;
    inputIndex++;
  }

  return formattedDate;
};

export const isValidMMDDYYYY = (dateString: string): boolean => {
  try {
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    if (!regex.test(dateString)) {
      return false;
    }
    const [month, day, year] = dateString.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  } catch (_) {
    return false;
  }
};

export const getCurrentMonthShort = (): string => {
  return new Date().toLocaleString('en-US', { month: 'short' });
};

export const getCurrentWeekDays = () => {
  const today = new Date();
  const todayDate = today.toDateString();
  const dayOfWeek = today.getDay();

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - dayOfWeek);

  const days = [];

  for (let i = 0; i <= dayOfWeek; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);

    days.push({
      label: date.toLocaleString('en-US', { month: 'short' }),
      day: date.getDate(),
      full: date,
      isToday: date.toDateString() === todayDate,
      hasEvents: i === 3 || i === 4
    });
  }

  return days;
};

export const getCurrentWeekRangeLabel = () => {
  const today = new Date();
  const dayOfWeek = today.getDay();

  const start = new Date(today);
  start.setDate(today.getDate() - dayOfWeek);

  const month = start.toLocaleString('en-US', { month: 'short' });

  return `${month} ${start.getDate()} - ${today.getDate()}`;
};
