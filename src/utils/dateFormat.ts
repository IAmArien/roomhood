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
