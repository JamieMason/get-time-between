# time-between

> Measure the amount of time during work hours between two dates.

[![NPM version](http://img.shields.io/npm/v/time-between.svg?style=flat-square)](https://www.npmjs.com/package/time-between)
[![NPM downloads](http://img.shields.io/npm/dm/time-between.svg?style=flat-square)](https://www.npmjs.com/package/time-between)

## ☁️ Installation

```
npm install --save time-between
```

## 📝 API

Calculate the number of millseconds during working hours between two dates. The
result of this can be formatted as you wish, with libraries such as
[`pretty-ms`](https://github.com/sindresorhus/pretty-ms) for example.

All methods take an optional 3rd argument containing the following options,
shown here with their default values:

```js
import { getTimeBetween } from 'time-between';

const fridayFivePm = 'May 17 2019 17:00:00';
const mondayElevenAm = 'May 20 2017 11:00:00';

const timeBetween = getTimeBetween(fridayFivePm, mondayElevenAm, {
  dailyEnd: [18, 0, 0], // [hour, minute, second] of the end of included days
  dailyStart: [10, 0, 0], // [hour, minute, second] of the start of included days
  excludedDays: [6, 0] // excluded days of the week (0-6 starting Sunday)
});

console.log(timeBetween);
// => 7200000
```
