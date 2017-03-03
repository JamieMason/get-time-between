function isSameDate(a, b) {
  return a.getFullYear() === b.getFullYear()
    && a.getMonth() === b.getMonth()
    && a.getDate() === b.getDate()
}

module.exports = function hoursBetween(start, end, opts) {
  if (start.getTime() > end.getTime()) {
    var _end = end
    end = start
    start = _end
  }

  opts || (opts = {})

  var dailyStart = opts.dailyStart || 10
  var dailyEnd = opts.dailyEnd || 18
  var voidDays = opts.voidDays || [0, 6]

  function handleDate(currentDate, start, end) {
    if (voidDays.includes(currentDate.getDay())) {
      return 0
    }

    var isStart = isSameDate(start, currentDate)
    var isEnd = isSameDate(end, currentDate)

    var startHour = isStart ? start.getHours() : 0
    var endHour = isEnd ? end.getHours() : 24

    // console.log({
    //   startHour, dailyStart,
    //   endHour, dailyEnd,
    // })

    startHour = Math.min(Math.max(startHour, dailyStart), dailyEnd)
    endHour = Math.max(Math.min(endHour, dailyEnd), dailyStart)

    // console.log({
    //   start, end,
    //   isStart, isEnd,
    //   startHour, endHour,
    // })

    return endHour - startHour
  }

  var currentDate = new Date(start.getTime())
  currentDate.setHours(0, 0, 0, 0)

  var lastDate = new Date(end.getTime())
  lastDate.setHours(23, 59, 59, 999)
  var endTime = lastDate.getTime()

  var timeElapsed = 0

  while (currentDate.getTime() < endTime) {
    timeElapsed += handleDate(currentDate, start, end)

    currentDate.setDate(currentDate.getDate() + 1)
  }

  return timeElapsed
}
