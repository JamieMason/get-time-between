# time-between

> Measure the amount of time during work hours between two dates.

[![NPM version](http://img.shields.io/npm/v/time-between.svg?style=flat-square)](https://www.npmjs.com/package/time-between)
[![NPM downloads](http://img.shields.io/npm/dm/time-between.svg?style=flat-square)](https://www.npmjs.com/package/time-between)

## ☁️ Installation

```
npm install --save time-between
```

## 📝 API

### getTimeBetween

Calculate the number of millseconds during working hours between two dates. The
result of this can be formatted as you wish, with libraries such as
[`pretty-ms`](https://github.com/sindresorhus/pretty-ms) for example.

```js
import { getTimeBetween } from 'time-between';

const fridayFivePm = 'May 17 2019 17:00:00';
const mondayElevenAm = 'May 20 2017 11:00:00';

const timeBetween = getTimeBetween(fridayFivePm, mondayElevenAm);
console.log(timeBetween);
// => 7200000
```

### getHoursBetween

Calculate the number of working hours between two dates. Incomplete hours are
rounded down, so if two dates which are 1hr 45mins apart are given for example,
the result will be `1`.

```js
import { getHoursBetween } from 'time-between';

const fridayFivePm = 'May 17 2019 17:00:00';
const mondayElevenAm = 'May 20 2017 11:00:00';

const hoursBetween = getHoursBetween(fridayFivePm, mondayElevenAm);
console.log(hoursBetween);
// => 2
```

## ⚖️ Options

All methods take an optional 3rd argument containing the following options,
shown here with their default values:

```js
const hoursBetween = getHoursBetween(dateOne, dateTwo, {
  dailyStart: 10, // hour of the day that work starts
  dailyEnd: 18, // hour of the day work ends
  voidDays: [6, 0] // non-working days of the week (0-6 starting Sunday)
});
```
