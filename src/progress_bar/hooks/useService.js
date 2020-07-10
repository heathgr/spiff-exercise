import { useEffect, useState} from 'react'

const useService = (service) => {
  const [state, setState] = useState(service.getStatus())

  useEffect(() => {
    service.subscribe((newStatus) => {
      setState(newStatus)
    })
  }, [])

  return state
}

export default useService