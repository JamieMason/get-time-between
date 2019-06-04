import { Day, Hour, Minute, Second } from './options';

interface Options {
  dailyEnd: [number, number, number];
  dailyStart: [number, number, number];
  excludedDays: number[];
}

export type GetTimeBetween = (
  start: Date,
  end: Date,
  options?: {
    /** Hour of the day that work ends */
    dailyEnd?: [Hour, Minute, Second];
    /** Hour of the day that work starts */
    dailyStart?: [Hour, Minute, Second];
    /** Zero-Indexed non-working days */
    excludedDays?: Day[];
  }
) => number;

/**
 * Calculate the number of millseconds during working hours between two dates.
 */
export const getTimeBetween: GetTimeBetween = (start, end, options) => {
  const isNumber = (n: any) =>
    typeof n === 'number' && !isNaN(n) && isFinite(n);
  const isArrayOfNumbers = (a: any) => Array.isArray(a) && a.every(isNumber);
  const isWithinRange = (floor: number, ceiling: number, n: number) =>
    n >= floor && n <= ceiling;
  const isValidDay = (v: any) => isNumber(v) && isWithinRange(0, 6, v);
  const isArrayOfDays = (a: any) => Array.isArray(a) && a.every(isValidDay);
  const isValidTime = (v: any) =>
    isArrayOfNumbers(v) &&
    v.length === 3 &&
    isWithinRange(0, 23, v[0]) &&
    isWithinRange(0, 59, v[1]) &&
    isWithinRange(0, 59, v[2]);

  const defaults: Options = {
    dailyEnd: [18, 0, 0],
    dailyStart: [10, 0, 0],
    excludedDays: [6, 0]
  };
  const opts = { ...defaults, ...options } as Options;

  if (!isValidTime(opts.dailyStart)) {
    throw new TypeError(
      'dailyStart should be undefined or an Array of 3 Numbers'
    );
  }

  if (!isValidTime(opts.dailyEnd)) {
    throw new TypeError(
      'dailyEnd should be undefined or an Array of 3 Numbers'
    );
  }

  if (!isArrayOfDays(opts.excludedDays)) {
    throw new TypeError(
      'excludedDays should be undefined or an Array of Numbers between 0 (Sunday) and 6 (Saturday)'
    );
  }

  const { dailyEnd, dailyStart, excludedDays } = opts;
  const [startDate, endDate] =
    start.getTime() > end.getTime() ? [end, start] : [start, end];

  const isSameDate = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const isVoidDay = (date: Date) => excludedDays.includes(date.getDay());
  const isOnStartDate = (date: Date) => isSameDate(startDate, date);
  const isOnEndDate = (date: Date) => isSameDate(endDate, date);

  const isBeforeStartOfWorkingHours = (date: Date) =>
    date.getHours() < dailyStart[0];
  const isAfterEndOfWorkingHours = (date: Date) =>
    date.getHours() > dailyEnd[0];

  const withTime = (
    date: Date,
    hours: number,
    mins: number,
    secs: number,
    msecs: number
  ) => {
    const nextDate = new Date(date.getTime());
    nextDate.setHours(hours, mins, secs, msecs);
    return nextDate;
  };

  const withTimeAtStartOfDay = (date: Date) => withTime(date, 0, 0, 0, 0);
  const withTimeAtEndOfDay = (date: Date) => withTime(date, 23, 0, 0, 0);
  const withTimeAtStartOfWorkingHours = (date: Date) =>
    withTime(date, dailyStart[0], dailyStart[1], dailyStart[2], 0);
  const withTimeAtEndOfWorkingHours = (date: Date) =>
    withTime(date, dailyEnd[0], dailyEnd[1], dailyEnd[2], 0);

  const withTimeDuringWorkingHours = (date: Date) => {
    if (isBeforeStartOfWorkingHours(date)) {
      return withTimeAtStartOfWorkingHours(date);
    }
    if (isAfterEndOfWorkingHours(date)) {
      return withTimeAtEndOfWorkingHours(date);
    }
    return date;
  };

  const getStartOfDay = (date: Date) =>
    withTimeDuringWorkingHours(
      isOnStartDate(date) ? startDate : withTimeAtStartOfDay(date)
    );

  const getEndOfDay = (date: Date) =>
    withTimeDuringWorkingHours(
      isOnEndDate(date) ? endDate : withTimeAtEndOfDay(date)
    );

  const nextDay = (date: Date) => {
    const nextDate = new Date(date.getTime());
    nextDate.setDate(date.getDate() + 1);
    return nextDate;
  };

  const startDay = withTimeAtStartOfWorkingHours(startDate);
  const endDay = withTimeAtEndOfWorkingHours(endDate);
  const endTime = endDay.getTime();

  let thisDay = startDay;
  let totalMsecs = 0;

  while (thisDay.getTime() < endTime) {
    if (!isVoidDay(thisDay)) {
      totalMsecs +=
        getEndOfDay(thisDay).getTime() - getStartOfDay(thisDay).getTime();
    }
    thisDay = nextDay(thisDay);
  }

  return totalMsecs;
};
