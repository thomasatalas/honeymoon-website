const FORECAST_ENDPOINT = 'https://api.open-meteo.com/v1/forecast'

const weatherCodes = {
  0: { condition: 'Clear sky', icon: 'clear' },
  1: { condition: 'Mainly clear', icon: 'partly-cloudy' },
  2: { condition: 'Partly cloudy', icon: 'partly-cloudy' },
  3: { condition: 'Overcast', icon: 'cloudy' },
  45: { condition: 'Fog', icon: 'cloudy' },
  48: { condition: 'Rime fog', icon: 'cloudy' },
  51: { condition: 'Light drizzle', icon: 'rain' },
  53: { condition: 'Drizzle', icon: 'rain' },
  55: { condition: 'Heavy drizzle', icon: 'rain' },
  56: { condition: 'Freezing drizzle', icon: 'rain' },
  57: { condition: 'Heavy freezing drizzle', icon: 'rain' },
  61: { condition: 'Light rain', icon: 'rain' },
  63: { condition: 'Rain', icon: 'rain' },
  65: { condition: 'Heavy rain', icon: 'rain' },
  66: { condition: 'Freezing rain', icon: 'rain' },
  67: { condition: 'Heavy freezing rain', icon: 'rain' },
  71: { condition: 'Light snow', icon: 'cloudy' },
  73: { condition: 'Snow', icon: 'cloudy' },
  75: { condition: 'Heavy snow', icon: 'cloudy' },
  77: { condition: 'Snow grains', icon: 'cloudy' },
  80: { condition: 'Rain showers', icon: 'rain' },
  81: { condition: 'Rain showers', icon: 'rain' },
  82: { condition: 'Heavy showers', icon: 'rain' },
  85: { condition: 'Snow showers', icon: 'cloudy' },
  86: { condition: 'Heavy snow showers', icon: 'cloudy' },
  95: { condition: 'Thunderstorm', icon: 'rain' },
  96: { condition: 'Thunderstorm with hail', icon: 'rain' },
  99: { condition: 'Severe thunderstorm', icon: 'rain' },
}

function getWeatherDescription(code) {
  return weatherCodes[code] || { condition: 'Conditions unavailable', icon: 'pending' }
}

function formatLocalTime(value) {
  const time = value?.split('T')[1]
  if (!time) return '—'

  const [hourValue, minute] = time.split(':')
  const hour = Number(hourValue)
  const period = hour >= 12 ? 'PM' : 'AM'
  return `${hour % 12 || 12}:${minute} ${period}`
}

function getHourlyForecast(response) {
  const { hourly, current } = response
  if (!hourly?.time?.length) return []

  const currentIndex = Math.max(0, hourly.time.findIndex((time) => time >= current.time))
  return hourly.time.slice(currentIndex, currentIndex + 6).map((time, offset) => {
    const index = currentIndex + offset
    const description = getWeatherDescription(hourly.weather_code[index])

    return {
      time: formatLocalTime(time),
      temperature: Math.round(hourly.temperature_2m[index]),
      precipitationProbability: hourly.precipitation_probability[index] ?? 0,
      ...description,
    }
  })
}

export const openMeteoProvider = {
  async getCurrentConditions(destination, { signal } = {}) {
    const { latitude, longitude } = destination.coordinates
    const parameters = new URLSearchParams({
      latitude: String(latitude),
      longitude: String(longitude),
      current: 'temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m',
      hourly: 'temperature_2m,precipitation_probability,weather_code',
      daily: 'sunrise,sunset',
      timezone: 'auto',
      forecast_days: '2',
    })

    const response = await fetch(`${FORECAST_ENDPOINT}?${parameters}`, { signal })
    if (!response.ok) throw new Error(`Weather request failed with status ${response.status}`)

    const data = await response.json()
    if (!data.current) throw new Error('Weather response did not include current conditions')

    const description = getWeatherDescription(data.current.weather_code)

    return {
      ...description,
      temperature: Math.round(data.current.temperature_2m),
      temperatureUnit: data.current_units?.temperature_2m?.replace('°', '') || 'C',
      precipitation: `${data.current.precipitation ?? 0} ${data.current_units?.precipitation || 'mm'}`,
      humidity: `${data.current.relative_humidity_2m ?? '—'}${data.current_units?.relative_humidity_2m || '%'}`,
      wind: `${Math.round(data.current.wind_speed_10m ?? 0)} ${data.current_units?.wind_speed_10m || 'km/h'}`,
      sunrise: formatLocalTime(data.daily?.sunrise?.[0]),
      sunset: formatLocalTime(data.daily?.sunset?.[0]),
      hourly: getHourlyForecast(data),
      updatedAt: formatLocalTime(data.current.time),
    }
  },
}
