var timeBetween = require('./time-between')

describe('timeBetween', () => {
  describe('simple, durring week', () => {
    var start = new Date('March 1 2017 12:00:00')
    var end = new Date('March 2 2017 12:00:00')

    it('should work for single day, overnight', () => {
      var hours = timeBetween(start, end)
      expect(hours).toEqual(8)
    })

    it('should work regardless of order', () => {
      var hours = timeBetween(end, start)
      expect(hours).toEqual(8)
    })

    it('should work for single day', () => {
      var start = new Date('March 2 2017 00:00:00')
      var end = new Date('March 2 2017 23:59:59')

      var hours = timeBetween(start, end)
      expect(hours).toEqual(8)
    })
  })

  describe('over weekend', () => {
    it('should work for single day', () => {
      var start = new Date('March 3 2017 12:00:00')
      var end = new Date('March 6 2017 12:00:00')

      var hours = timeBetween(start, end)
      expect(hours).toEqual(8)
    })

    it('should work for half way into weekend', () => {
      var start = new Date('March 3 2017 12:00:00')
      var end = new Date('March 5 2017 12:00:00')

      var hours = timeBetween(start, end)
      expect(hours).toEqual(6)
    })

    it('should work for a week', () => {
      var start = new Date('March 3 2017 12:00:00')
      var end = new Date('March 10 2017 12:00:00')

      var hours = timeBetween(start, end)
      expect(hours).toEqual(40)
    })

    it('should work for second weekend', () => {
      var start = new Date('March 3 2017 12:00:00')
      var end = new Date('March 11 2017 12:00:00')

      var hours = timeBetween(start, end)
      expect(hours).toEqual(46)
    })

    it('should work for two weekends', () => {
      var start = new Date('March 3 2017 12:00:00')
      var end = new Date('March 13 2017 12:00:00')

      var hours = timeBetween(start, end)
      expect(hours).toEqual(48)
    })
  })

  describe('specific bugs', () => {
    it('should work for this odd error case was getting -4', () => {
      var start = new Date('2017-02-18T03:30:00.000Z')
      var end = new Date('2017-02-18T03:30:00.000Z')

      var hours = timeBetween(start, end)
      expect(hours).toEqual(0)
    })

    it('should work for this odd error case was getting -1', () => {
      var start = new Date('2017-02-13T22:23:19.000Z')
      var end = new Date('2017-02-14T13:51:48.000Z')

      var hours = timeBetween(start, end)
      expect(hours).toEqual(1)
    })

    it('should work for this odd error case was getting -2', () => {
      var start = new Date('2017-02-14T13:51:48.000Z')
      var end = new Date('2017-02-14T13:51:48.000Z')

      var hours = timeBetween(start, end)
      expect(hours).toEqual(0)
    })
  })
})
