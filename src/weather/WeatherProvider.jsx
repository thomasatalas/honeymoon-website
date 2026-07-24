import { useMemo } from 'react'
import { WeatherContext } from './weatherContext.js'

function WeatherProvider({ children, provider = null }) {
  const value = useMemo(() => ({
    hasLiveProvider: Boolean(provider),
    async getCurrentConditions(destination, options = {}) {
      if (!provider?.getCurrentConditions) return null
      return provider.getCurrentConditions(destination, options)
    },
  }), [provider])

  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
}

export default WeatherProvider
