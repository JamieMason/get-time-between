# get-time-between

> Measure the amount of time during work hours between two dates.

[![NPM version](http://img.shields.io/npm/v/get-time-between.svg?style=flat-square)](https://www.npmjs.com/package/get-time-between)
[![NPM downloads](http://img.shields.io/npm/dm/get-time-between.svg?style=flat-square)](https://www.npmjs.com/package/get-time-between)
[![Build Status](http://img.shields.io/travis/JamieMason/get-time-between/master.svg?style=flat-square)](https://travis-ci.org/JamieMason/get-time-between)
[![Maintainability](https://api.codeclimate.com/v1/badges/80461b911c6c624194a2/maintainability)](https://codeclimate.com/github/JamieMason/get-time-between/maintainability)
[![Gitter Chat](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/JamieMason/get-time-between)
[![Donate via PayPal](https://img.shields.io/badge/donate-paypal-blue.svg)](https://www.paypal.me/foldleft)
[![Backers](https://opencollective.com/fold_left/backers/badge.svg)](https://opencollective.com/fold_left#backer)
[![Sponsors](https://opencollective.com/fold_left/sponsors/badge.svg)](https://opencollective.com/fold_left#sponsors)
[![Analytics](https://ga-beacon.appspot.com/UA-45466560-5/get-time-between?flat&useReferer)](https://github.com/igrigorik/ga-beacon)
[![Follow JamieMason on GitHub](https://img.shields.io/github/followers/JamieMason.svg?style=social&label=Follow)](https://github.com/JamieMason)
[![Follow fold_left on Twitter](https://img.shields.io/twitter/follow/fold_left.svg?style=social&label=Follow)](https://twitter.com/fold_left)

## ☁️ Installation

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

## 🙋🏿‍♂️ Get Help

There are a few ways to get help:

1.  For bug reports and feature requests, open issues :bug:
1.  For direct and quick help, you can use Gitter :rocket:

## 👏🏻 Credits

This project is a fork of https://github.com/tal/time-between by
[Tal Atlas](https://github.com/tal).
