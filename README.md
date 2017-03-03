# Time Between

Time between is a simple utility to measure the number of work hours between two dates.

## Installation

```
npm install time-between
```

or

```
yarn add time-between
```

Import with:

```
var timeBetween = require('time-between')
```

or

```
import timeBetween from 'time-between'
```

## Usage

By default it assumes the work day is 10-6 and weekends are satuday and sunday.

```
let hoursBetween = timeBetween(dateOne, dateTwo)
```

### Options

You can override the work hours and the weekend dates. Here's a call with all the default values:

```
timeBetween(dateOne, dateTwo, {
  dailyStart: 10,  // hour of the day that work starts
  dailyEnd: 6,     // hour of the day work ends
  voidDays: [6,0], // weekend days of the week (0-6 starting sunday)
})
```
