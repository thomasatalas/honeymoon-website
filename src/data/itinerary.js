import { getConnection, trip } from './trip.js'

const fullDate = new Intl.DateTimeFormat('en-US', {
  weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC',
})

const monthDay = new Intl.DateTimeFormat('en-US', {
  month: 'long', day: 'numeric', timeZone: 'UTC',
})

const parseDate = (date) => new Date(`${date}T12:00:00Z`)

function stayRange(hotel) {
  const start = parseDate(hotel.checkInDate)
  const end = parseDate(hotel.checkOutDate)
  const sameMonth = start.getUTCFullYear() === end.getUTCFullYear() && start.getUTCMonth() === end.getUTCMonth()
  const endLabel = sameMonth ? end.getUTCDate() : monthDay.format(end)
  return `${monthDay.format(start)}–${endLabel}, ${end.getUTCFullYear()}`
}

function timeLabel(point) {
  if (!point?.time) return 'Time pending'
  const [hour, minute] = point.time.split(':').map(Number)
  const suffix = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  return `${point.timeQualifier === 'around' ? 'Around ' : ''}${displayHour}:${String(minute).padStart(2, '0')} ${suffix}`
}

function endpointSummary(connection, endpoint) {
  const point = connection?.[endpoint]
  if (!connection || !point) return { when: 'Details pending', context: 'Public-safe details have not been supplied' }
  const direction = endpoint === 'arrival' ? 'from' : 'to'
  const routeParts = connection.route.split(' → ')
  const place = endpoint === 'arrival' ? routeParts.at(-2) : routeParts.at(-1)
  const date = point.date || connection.date
  return {
    when: date ? `${fullDate.format(parseDate(date))} · ${timeLabel(point)}` : 'Date and time pending',
    context: `${connection.number || connection.carrier} ${direction} ${place}`,
  }
}

export const honeymoonStart = `${trip.startDate}T00:00:00`

export const journeyStops = trip.destinations.map((destination) => {
  const arrival = getConnection(destination.arrivalConnectionId)
  const departure = getConnection(destination.departureConnectionId)

  return {
    city: destination.city,
    country: destination.country,
    dates: stayRange(destination.hotel),
    hotel: destination.hotel.name,
    nights: `${destination.hotel.nights} nights`,
    logistics: {
      arrival: endpointSummary(arrival, 'arrival'),
      departure: endpointSummary(departure, 'departure'),
      arrivalTransfer: destination.journey.arrivalTransfer,
      departurePlan: destination.journey.departurePlan,
      reservationStatus: `${destination.hotel.status} · ${destination.hotel.nights}-night hotel stay`,
    },
    side: destination.appearance.side,
    variant: destination.appearance.variant,
  }
})

export const progressMilestones = ['Planning', 'Packing', 'Europe', 'Singapore', 'Home']
