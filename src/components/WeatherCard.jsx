import { useEffect, useState } from 'react'
import { useWeather } from '../weather/weatherContext.js'

function WeatherIcon({ type }) {
  if (type === 'clear') {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <circle cx="32" cy="32" r="10" />
        <path d="M32 5v9M32 50v9M5 32h9M50 32h9M13 13l7 7M44 44l7 7M51 13l-7 7M20 44l-7 7" />
      </svg>
    )
  }

  if (type === 'rain') {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M18 42h29a11 11 0 0 0 1-22 17 17 0 0 0-31-3 13 13 0 0 0 1 25Z" />
        <path d="m23 49-3 7M34 49l-3 7M45 49l-3 7" />
      </svg>
    )
  }

  if (type === 'cloudy' || type === 'partly-cloudy') {
    return (
      <svg viewBox="0 0 64 64" aria-hidden="true">
        <path d="M18 45h29a11 11 0 0 0 1-22 17 17 0 0 0-31-3 13 13 0 0 0 1 25Z" />
        <path d="M21 14a11 11 0 0 1 18-4" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="17" />
      <path d="M32 23v12M32 42h.01" />
    </svg>
  )
}

function formatTemperature(weather) {
  if (weather.temperature === '—' || weather.temperature === null || weather.temperature === undefined) return '—'
  return `${weather.temperature}°${weather.temperatureUnit || ''}`
}

function WeatherCard({ destination, compact = false }) {
  const { getCurrentConditions, hasLiveProvider } = useWeather()
  const [weather, setWeather] = useState(destination.weatherPlaceholder)
  const [status, setStatus] = useState(hasLiveProvider ? 'loading' : 'placeholder')

  useEffect(() => {
    const controller = new AbortController()
    let isActive = true

    setWeather(destination.weatherPlaceholder)

    if (!hasLiveProvider) {
      setStatus('placeholder')
      return () => controller.abort()
    }

    setStatus('loading')
    getCurrentConditions(destination, { signal: controller.signal })
      .then((conditions) => {
        if (!isActive) return
        setWeather(conditions || destination.weatherPlaceholder)
        setStatus(conditions ? 'live' : 'unavailable')
      })
      .catch((error) => {
        if (!isActive || error?.name === 'AbortError') return
        setWeather(destination.weatherPlaceholder)
        setStatus('unavailable')
      })

    return () => {
      isActive = false
      controller.abort()
    }
  }, [destination, getCurrentConditions, hasLiveProvider])

  const statusLabel = {
    live: 'Live conditions',
    loading: 'Updating weather',
    unavailable: 'Weather unavailable',
    placeholder: 'Weather provider ready',
  }[status]

  return (
    <article
      className={`weather-card weather-card--${status} ${compact ? 'weather-card--compact' : ''}`}
      aria-busy={status === 'loading'}
    >
      <div className="weather-card__main">
        <div className="weather-card__icon"><WeatherIcon type={weather.icon} /></div>
        <div>
          <p>{weather.condition}</p>
          <strong>{formatTemperature(weather)}</strong>
        </div>
      </div>
      <div className="weather-card__status" role="status"><span className={status === 'live' ? 'is-live' : ''} />{statusLabel}</div>
      <dl className="weather-card__metrics">
        <div><dt>Precipitation</dt><dd>{weather.precipitation || '—'}</dd></div>
        <div><dt>Wind</dt><dd>{weather.wind || '—'}</dd></div>
        <div><dt>Humidity</dt><dd>{weather.humidity || '—'}</dd></div>
      </dl>
      <dl className="weather-card__sun">
        <div><dt>Sunrise</dt><dd>{weather.sunrise}</dd></div>
        <div><dt>Sunset</dt><dd>{weather.sunset}</dd></div>
      </dl>
      {!compact && weather.hourly?.length > 0 && (
        <div className="weather-card__hourly">
          <h3>Hourly forecast</h3>
          <div>
            {weather.hourly.map((hour) => (
              <article key={hour.time}>
                <time>{hour.time}</time>
                <WeatherIcon type={hour.icon} />
                <strong>{hour.temperature}°</strong>
                <span>{hour.precipitationProbability}% rain</span>
              </article>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}

export default WeatherCard
