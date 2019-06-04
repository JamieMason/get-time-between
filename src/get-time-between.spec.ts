import { getTimeBetween } from './get-time-between';

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveTimeBetween(expectedMsecs: number): R;
    }
  }
}

expect.extend({
  toHaveTimeBetween([start, end], expectedMsecs: number) {
    const result = getTimeBetween(new Date(start), new Date(end));
    const reverseResult = getTimeBetween(new Date(end), new Date(start));
    const pass = result === expectedMsecs && reverseResult === expectedMsecs;
    return {
      message: () => {
        let msg = '';
        msg += pass ? 'did not expect ' : 'expected ';
        msg += `${expectedMsecs} working milliseconds between "${start}" and "${end}" `;
        msg += `but instead received ${result}`;
        return msg;
      },
      pass
    };
  }
});

const hoursToMs = (n: number) => n * 3600000;
const minsToMs = (n: number) => n * 60000;
const secsToMs = (n: number) => n * 1000;

const getInvalidTimeOptions = (dailyStartOrEnd: string) => [
  { [dailyStartOrEnd]: null },
  { [dailyStartOrEnd]: [] },
  { [dailyStartOrEnd]: [11] },
  { [dailyStartOrEnd]: [11, 0] },
  { [dailyStartOrEnd]: ['11', '00', '00'] },
  { [dailyStartOrEnd]: ['11:00:00'] },
  { [dailyStartOrEnd]: [11, 0, 0, 0] },
  { [dailyStartOrEnd]: [24, 0, 0] },
  { [dailyStartOrEnd]: [0, 60, 0] },
  { [dailyStartOrEnd]: [0, 0, 60] },
  { [dailyStartOrEnd]: [-1, 0, 0] },
  { [dailyStartOrEnd]: [0, -1, 0] },
  { [dailyStartOrEnd]: [0, 0, -1] }
];

[
  ...getInvalidTimeOptions('dailyEnd'),
  ...getInvalidTimeOptions('dailyStart'),
  { excludedDays: null },
  { excludedDays: [null] },
  { excludedDays: ['4'] },
  { excludedDays: [-1] },
  { excludedDays: [7] }
].forEach((opts: any) => {
  it(`should throw when invalid options ${JSON.stringify(
    opts
  )} are provided`, () => {
    expect(() => {
      getTimeBetween(new Date(), new Date(), opts);
    }).toThrow();
  });
});

describe('during week', () => {
  it('should work for single day, overnight', () => {
    const start = 'March 1 2017 12:00:00';
    const end = 'March 2 2017 12:00:00';
    expect([start, end]).toHaveTimeBetween(hoursToMs(8));
  });

  it('should work regardless of order', () => {
    const start = 'March 1 2017 12:00:00';
    const end = 'March 2 2017 12:00:00';
    expect([start, end]).toHaveTimeBetween(hoursToMs(8));
  });

  it('should work for single day', () => {
    const start = 'March 2 2017 00:00:00';
    const end = 'March 2 2017 23:59:59';
    expect([start, end]).toHaveTimeBetween(hoursToMs(8));
  });
});

describe('over weekend', () => {
  it('should work for single day', () => {
    const start = 'March 3 2017 12:00:00';
    const end = 'March 6 2017 12:00:00';
    expect([start, end]).toHaveTimeBetween(hoursToMs(8));
  });

  it('should work for half way into weekend', () => {
    const start = 'March 3 2017 12:00:00';
    const end = 'March 5 2017 12:00:00';
    expect([start, end]).toHaveTimeBetween(hoursToMs(6));
  });

  it('should work for a week', () => {
    const start = 'March 3 2017 12:00:00';
    const end = 'March 10 2017 12:00:00';
    expect([start, end]).toHaveTimeBetween(hoursToMs(40));
  });

  it('should work for second weekend', () => {
    const start = 'March 3 2017 12:00:00';
    const end = 'March 11 2017 12:00:00';
    expect([start, end]).toHaveTimeBetween(hoursToMs(46));
  });

  it('should work for two weekends', () => {
    const start = 'March 3 2017 12:00:00';
    const end = 'March 13 2017 12:00:00';
    expect([start, end]).toHaveTimeBetween(hoursToMs(48));
  });
});

describe('specific bugs', () => {
  it('should work for this odd error case was getting -4', () => {
    const start = '2017-02-18T03:30:00.000Z';
    const end = '2017-02-18T03:30:00.000Z';
    expect([start, end]).toHaveTimeBetween(0);
  });

  it('should work for this odd error case was getting -1', () => {
    const start = '2017-02-13T22:23:19.000Z';
    const end = '2017-02-14T13:51:48.000Z';
    expect([start, end]).toHaveTimeBetween(
      hoursToMs(3) + minsToMs(51) + secsToMs(48)
    );
  });

  it('should work for this odd error case was getting -2', () => {
    const start = '2017-02-14T13:51:48.000Z';
    const end = '2017-02-14T13:51:48.000Z';
    expect([start, end]).toHaveTimeBetween(0);
  });
});
