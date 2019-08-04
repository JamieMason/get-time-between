# get-time-between

> Measure the amount of time during work hours between two dates.

[![NPM version](http://img.shields.io/npm/v/get-time-between.svg?style=flat-square)](https://www.npmjs.com/package/get-time-between)
[![NPM downloads](http://img.shields.io/npm/dm/get-time-between.svg?style=flat-square)](https://www.npmjs.com/package/get-time-between)
[![Build Status](http://img.shields.io/travis/JamieMason/get-time-between/master.svg?style=flat-square)](https://travis-ci.org/JamieMason/get-time-between)
[![Maintainability](https://api.codeclimate.com/v1/badges/80461b911c6c624194a2/maintainability)](https://codeclimate.com/github/JamieMason/get-time-between/maintainability)
[![Follow JamieMason on GitHub](https://img.shields.io/github/followers/JamieMason.svg?style=social&label=Follow)](https://github.com/JamieMason)
[![Follow fold_left on Twitter](https://img.shields.io/twitter/follow/fold_left.svg?style=social&label=Follow)](https://twitter.com/fold_left)

## 🌩 Installation

```
npm install --save get-time-between
```

## 📝 API

Calculate the number of millseconds during working hours between two dates. The
result of this can be formatted as you wish, with libraries such as
[`pretty-ms`](https://github.com/sindresorhus/pretty-ms) for example.

All methods take an optional 3rd argument containing the following options,
shown here with their default values:

```js
import { getTimeBetween } from 'get-time-between';

const fridayFivePm = new Date('May 17 2019 17:00:00');
const mondayElevenAm = new Date('May 20 2017 11:00:00');

const timeBetween = getTimeBetween(fridayFivePm, mondayElevenAm, {
  dailyEnd: [18, 0, 0], // [hour, minute, second] of the end of included days
  dailyStart: [10, 0, 0], // [hour, minute, second] of the start of included days
  excludedDays: [6, 0] // excluded days of the week (0-6 starting Sunday)
});

console.log(timeBetween);
// => 7200000
```

## 👏🏻 Credits

This project is a fork of https://github.com/tal/time-between by
[Tal Atlas](https://github.com/tal).

## 🙋🏾‍♀️ Getting Help

- Get help with issues by creating a
  [Bug Report](https://github.com/JamieMason/get-time-between/issues/new?template=bug_report.md).
- Discuss ideas by opening a
  [Feature Request](https://github.com/JamieMason/get-time-between/issues/new?template=feature_request.md).
