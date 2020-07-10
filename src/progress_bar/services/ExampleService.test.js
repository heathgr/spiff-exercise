import ExampleService, { Status, INTERVAL_TIME } from './exampleService'

jest.useFakeTimers()

describe('Example Service', () => {
  it('Should have a getStatus function that returns the status of the service.', () => {
    const subject = new ExampleService()

    expect(subject.getStatus()).toEqual({
      status: Status.IDLE,
      percentageComplete: 0,
    })
  })

  it('Should have an incrementPercentage function', () => {
    const subject = new ExampleService()

    const expectedPercentageValues = [
      0.1,
      0.2,
      0.3,
      0.4,
      0.5,
      0.6,
      0.7,
      0.8,
      0.9,
      0.9, // the percentage should hang at 0.9
    ]

    expectedPercentageValues.forEach((expectedPercentage) => {
      subject.incrementPercentage()

      const actual = subject.getStatus()
      const expected = {
        status: Status.WORKING,
        percentageComplete: expectedPercentage,
      }

      expect(actual).toEqual(expected)
    })
  })

  it('Should have a start function the emulates a long running process.', () => {
    const subject = new ExampleService()
    const incrementSpy = jest.spyOn(subject, "incrementPercentage")
    const expectedCallCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 9]

    subject.start()

    expectedCallCount.forEach((expected, i) => {
      jest.runOnlyPendingTimers()

      expect(incrementSpy).toHaveBeenCalledTimes(expected)
    })
  })

  it('Should have a stop function.', () => {
    const subject = new ExampleService()
    
    subject.stop()

    expect(subject.getStatus()).toEqual({
      status: Status.COMPLETING,
      percentageComplete: 0,
    })

    jest.runOnlyPendingTimers()

    expect(subject.getStatus()).toEqual({
      status: Status.IDLE,
      percentageComplete: 1,
    })
  })

  it('Should have a subscribe function that lets a listener subscribe to status updates.', () => {
    const subject = new ExampleService()
    const testListener = jest.fn()

    subject.subscribe(testListener)

    subject.start()

    expect(testListener).toHaveBeenLastCalledWith({
      status: Status.WORKING,
      percentageComplete: 0,
    })
  })
})