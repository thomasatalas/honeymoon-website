import { getConnection } from './trip.js'

const chapterDefinitions = [
  {
    id: 'emirates', airline: 'Emirates', chapter: 'Opening journey', connectionIds: ['sfo-dxb', 'dxb-ams'],
    summary: 'First Class from San Francisco through Dubai to Amsterdam. Aircraft and product-specific features remain unpublished until confirmed.',
    image: null,
  },
  {
    id: 'lufthansa', airline: 'Lufthansa', chapter: 'European connections', connectionIds: ['ams-muc', 'muc-nce'],
    summary: 'Two short Economy connections carrying the journey from the canals to Bavaria and then the Riviera.',
  },
  {
    id: 'qatar', airline: 'Qatar Airways', chapter: 'Europe to Singapore', connectionIds: ['nce-doh', 'doh-sin'],
    summary: 'Business Class via Doha on confirmed Airbus A350-900 and A350-1000 aircraft. The onboard product is not labeled Qsuite without route-specific confirmation.',
    connectionNote: 'Nice to Singapore · 17 hr 50 min total itinerary',
  },
  {
    id: 'cathay', airline: 'Cathay Pacific', chapter: 'Singapore to Ningbo', connectionIds: ['sin-hkg', 'hkg-ngb'],
    summary: 'Business Class from Singapore to Ningbo, with a measured morning connection in Hong Kong. Aircraft types remain unpublished.',
    image: null,
    connectionNote: 'Hong Kong connection · 5 hr 10 min',
  },
]

const fullDate = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
const time = (value) => {
  if (!value) return 'Time pending'
  const [hour, minute] = value.split(':').map(Number)
  return `${hour % 12 || 12}:${String(minute).padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`
}
const date = (value) => value ? fullDate.format(new Date(`${value}T12:00:00Z`)) : 'Date pending'
const airport = (point) => `${point.airport}${point.terminal ? ` · ${point.terminal}` : ''}`
const compactRoutes = {
  'sfo-dxb': 'SFO → Dubai',
  'dxb-ams': 'Dubai → Amsterdam',
}

function pendingSummary(connection) {
  if (connection.id === 'dxb-ams') {
    return 'Arrives Sunday, September 27, 2026 at approximately 9:00 AM · remaining schedule details pending'
  }
  return `Schedule details pending · ${connection.cabin}`
}

export const flights = chapterDefinitions.map((chapter) => ({
  ...chapter,
  overallRoute: chapter.connectionIds.map(getConnection).filter(Boolean).map((connection, index) => index === 0 ? connection.route : connection.route.split(' → ').at(-1)).join(' → '),
  cabin: chapter.id === 'lufthansa' ? 'Economy' : chapter.connectionIds.map(getConnection).find(Boolean)?.cabin,
  segments: chapter.connectionIds.map(getConnection).filter(Boolean).map((connection) => {
    const isPending = !connection.number
    return {
      id: connection.id,
      isPending,
      flightNumber: connection.number,
      route: compactRoutes[connection.id] || connection.route,
      compactSummary: isPending ? pendingSummary(connection) : null,
      departure: { date: date(connection.departure.date || connection.date), time: time(connection.departure.time), airport: airport(connection.departure) },
      arrival: { date: date(connection.arrival.date || connection.arrivalDate), time: time(connection.arrival.time), airport: airport(connection.arrival) },
      cabin: connection.cabin,
      aircraft: connection.aircraft,
      duration: connection.duration,
      status: connection.status,
    }
  }),
}))
