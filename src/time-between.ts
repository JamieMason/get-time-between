export type Sunday = 0;
export type Monday = 1;
export type Tuesday = 2;
export type Wednesday = 3;
export type Thursday = 4;
export type Friday = 5;
export type Saturday = 6;

export type Day =
  | Sunday
  | Monday
  | Tuesday
  | Wednesday
  | Thursday
  | Friday
  | Saturday;

export type Hour =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 23;

interface AllOptions {
  dailyStart: number;
  dailyEnd: number;
  voidDays: number[];
}

const defaults: AllOptions = {
  dailyEnd: 18,
  dailyStart: 10,
  voidDays: [6, 0]
};

export type GetTimeBetween = (
  start: Date,
  end: Date,
  options?: {
    /** Hour of the day that work starts */
    dailyStart?: Hour;
    /** Hour of the day that work ends */
    dailyEnd?: Hour;
    /** Zero-Indexed non-working days */
    voidDays?: Day[];
  }
) => number;

/**
 * Calculate the number of millseconds during working hours between two dates.
 */
export const getTimeBetween: GetTimeBetween = (start, end, options) => {
  const { dailyEnd, dailyStart, voidDays } = {
    ...defaults,
    ...options
  } as AllOptions;
  const [startDate, endDate] =
    start.getTime() > end.getTime() ? [end, start] : [start, end];

  const isSameDate = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const isVoidDay = (date: Date) => voidDays.includes(date.getDay());
  const isOnStartDate = (date: Date) => isSameDate(startDate, date);
  const isOnEndDate = (date: Date) => isSameDate(endDate, date);

  const isBeforeStartOfWorkingHours = (date: Date) =>
    date.getHours() < dailyStart;
  const isAfterEndOfWorkingHours = (date: Date) => date.getHours() > dailyEnd;

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
    withTime(date, dailyStart, 0, 0, 0);
  const withTimeAtEndOfWorkingHours = (date: Date) =>
    withTime(date, dailyEnd, 0, 0, 0);

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

/**
 * Calculate the number of working hours between two dates.
 *
 * Incomplete hours are rounded down – if two dates which are 1hr 45mins apart
 * are given, the result will be 1.
 */
export const getHoursBetween: GetTimeBetween = (start, end, options) => {
  const msecsPerHour = 3600000;
  const msecsBetween = getTimeBetween(start, end, options);
  return Math.floor(msecsBetween / msecsPerHour);
};

export default getHoursBetween;
