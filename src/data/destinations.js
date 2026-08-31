import { getConnection, getTripDestination, trip } from './trip.js'

function connectionSummary(connection, direction) {
  if (!connection) return 'Details are contained in the daily itinerary'
  const endpoint = direction === 'arrival' ? connection.arrival : connection.departure
  return `${connection.carrier} ${connection.number} · ${connection.route} · ${endpoint.time}`
}

function destinationStays(destination) {
  return destination.stays || [destination.hotel]
}

function totalNights(destination) {
  return destinationStays(destination).reduce((sum, stay) => sum + stay.nights, 0)
}

export const destinations = trip.destinations.map((destination) => {
  const arrival = getConnection(destination.arrivalConnectionId)
  const departure = getConnection(destination.departureConnectionId)

  return {
    ...destination,
    tripDates: { arrival: destination.dateRange.start, departure: destination.dateRange.end },
    weatherPlaceholder: { condition: 'Live weather pending', temperature: '—', icon: 'pending', sunrise: '—', sunset: '—' },
    travel: {
      hotel: destinationStays(destination).map((stay) => stay.name).join(' → '),
      checkIn: destinationStays(destination)[0].checkIn,
      checkOut: destinationStays(destination).at(-1).checkOut,
      nights: totalNights(destination),
      arriving: destination.arrivalSummary || connectionSummary(arrival, 'arrival'),
      departing: connectionSummary(departure, 'departure'),
    },
  }
})

export function getDestination(destinationId) {
  return destinations.find((destination) => destination.id === destinationId)
    || getTripDestination(destinationId)
}
