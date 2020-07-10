import React    from "react"
import Exercise from "../exercise/Exercise"

import useService from './hooks/useService'
import ExampleService, { Status } from "./services/ExampleService"
import './ProgressBar.scss'

const ProgressBar = () => {
  return (
    <div className="parser">
      <Exercise
        solution = {<Solution />}
        specsUrl = "https://github.com/CommissionAI/spiff_react_exercises/issues/1"
        title    = "Progress Bar Exercise"
      />
    </div>
  )
}

export default ProgressBar

// ----------------------------------------------------------------------------------

const service = new ExampleService()

const Solution = () => {

  const statusService = useService(service)
  const { status, percentageComplete } = statusService

  return (
    <div className="progressBar">
      <div>{`${Math.round(percentageComplete * 100)}%`}</div>
      <div className="bar" style={{ width: `${100 * percentageComplete}%` }}></div>
      {
        status === Status.IDLE && <button onClick={() => service.start()}>Start Request</button>
      }
      {
        (status === Status.WORKING || status === Status.COMPLETING) && <button disabled >Loading...</button>
      }
      {
        status === Status.WORKING && <button className="finish-request" onClick={() => service.stop()}>Finish Request</button>
      }
    </div>
  )
}
