export const Status = {
  IDLE: 'IDLE',
  WORKING: 'WORKING',
}

export const PERCENTAGE_STEP = 0.1
export const INTERVAL_TIME = 15000 / 9

const intialStatus = {
  status: Status.IDLE,
  percentageComplete: 0,
}

class ExampleService {
  status = intialStatus
  timerId = null
  listener = () => null

  getStatus = () => this.status

  updateStatus = (update) => {
    this.status = {
      ...this.status,
      ...update,
    }
    this.listener(this.status)
  }

  incrementPercentage = () => {
    // Math.round, the multiplication and division is done to avoid floating point errors
    const newPercentage = Math.round((this.status.percentageComplete + PERCENTAGE_STEP) * 10) / 10

    this.updateStatus({
      status: Status.WORKING,
      // clamp the percentage at 0.9
      percentageComplete: newPercentage > 0.9 ? 0.9 : newPercentage,
    })
  }

  handleTimeout = () => {
    if (this.status.percentageComplete < 0.9) {
      this.timerId = setTimeout(() => {
        this.incrementPercentage()
        this.handleTimeout()
      }, INTERVAL_TIME)
    }
  }

  start = () => {
    this.updateStatus(intialStatus)
    this.handleTimeout()
  }

  stop = () => {
    this.updateStatus({
      status: Status.IDLE,
      percentageComplete: 1,
    })
  }

  subscribe = (listener) => {
    this.listener = listener
  }
}

export default ExampleService