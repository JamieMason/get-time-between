import getHoursBetween, { getTimeBetween } from './time-between';

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveHoursBetween(expectedHours: number): R;
      toHaveTimeBetween(expectedMsecs: number): R;
    }
  }
}

expect.extend({
  toHaveHoursBetween([start, end], expectedHours: number) {
    const result = getHoursBetween(new Date(start), new Date(end));
    const reverseResult = getHoursBetween(new Date(end), new Date(start));
    const pass = result === expectedHours && reverseResult === expectedHours;
    return {
      message: () => {
        let msg = '';
        msg += pass ? 'did not expect ' : 'expected ';
        msg += `${expectedHours} working hours between "${start}" and "${end}" `;
        msg += `but instead received ${result}`;
        return msg;
      },
      pass
    };
  },
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

describe('during week', () => {
  it('should work for single day, overnight', () => {
    const start = 'March 1 2017 12:00:00';
    const end = 'March 2 2017 12:00:00';
    expect([start, end]).toHaveHoursBetween(8);
    expect([start, end]).toHaveTimeBetween(28800000);
  });

  it('should work regardless of order', () => {
    const start = 'March 1 2017 12:00:00';
    const end = 'March 2 2017 12:00:00';
    expect([start, end]).toHaveHoursBetween(8);
    expect([start, end]).toHaveTimeBetween(28800000);
  });

  it('should work for single day', () => {
    const start = 'March 2 2017 00:00:00';
    const end = 'March 2 2017 23:59:59';
    expect([start, end]).toHaveHoursBetween(8);
    expect([start, end]).toHaveTimeBetween(28800000);
  });
});

describe('over weekend', () => {
  it('should work for single day', () => {
    const start = 'March 3 2017 12:00:00';
    const end = 'March 6 2017 12:00:00';
    expect([start, end]).toHaveHoursBetween(8);
    expect([start, end]).toHaveTimeBetween(28800000);
  });

  it('should work for half way into weekend', () => {
    const start = 'March 3 2017 12:00:00';
    const end = 'March 5 2017 12:00:00';
    expect([start, end]).toHaveHoursBetween(6);
    expect([start, end]).toHaveTimeBetween(21600000);
  });

  it('should work for a week', () => {
    const start = 'March 3 2017 12:00:00';
    const end = 'March 10 2017 12:00:00';
    expect([start, end]).toHaveHoursBetween(40);
    expect([start, end]).toHaveTimeBetween(144000000);
  });

  it('should work for second weekend', () => {
    const start = 'March 3 2017 12:00:00';
    const end = 'March 11 2017 12:00:00';
    expect([start, end]).toHaveHoursBetween(46);
    expect([start, end]).toHaveTimeBetween(165600000);
  });

  it('should work for two weekends', () => {
    const start = 'March 3 2017 12:00:00';
    const end = 'March 13 2017 12:00:00';
    expect([start, end]).toHaveHoursBetween(48);
    expect([start, end]).toHaveTimeBetween(172800000);
  });
});

describe('specific bugs', () => {
  it('should work for this odd error case was getting -4', () => {
    const start = '2017-02-18T03:30:00.000Z';
    const end = '2017-02-18T03:30:00.000Z';
    expect([start, end]).toHaveHoursBetween(0);
    expect([start, end]).toHaveTimeBetween(0);
  });

  it('should work for this odd error case was getting -1', () => {
    const start = '2017-02-13T22:23:19.000Z';
    const end = '2017-02-14T13:51:48.000Z';
    expect([start, end]).toHaveHoursBetween(3);
    expect([start, end]).toHaveTimeBetween(
      3 * 3600000 + 51 * 60000 + 48 * 1000
    );
  });

  it('should work for this odd error case was getting -2', () => {
    const start = '2017-02-14T13:51:48.000Z';
    const end = '2017-02-14T13:51:48.000Z';
    expect([start, end]).toHaveHoursBetween(0);
    expect([start, end]).toHaveTimeBetween(0);
  });
});
