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
