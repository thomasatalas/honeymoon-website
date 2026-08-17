import { getConnection, getTripDestination, trip } from './trip.js'

function connectionSummary(connection, direction) {
  if (!connection) return 'Details are contained in the daily itinerary'
  const endpoint = direction === 'arrival' ? connection.arrival : connection.departure
  return `${connection.carrier} ${connection.number} · ${connection.route} · ${endpoint.time}`
}

export const destinations = trip.destinations.map((destination) => {
  const arrival = getConnection(destination.arrivalConnectionId)
  const departure = getConnection(destination.departureConnectionId)

  return {
    ...destination,
    tripDates: { arrival: destination.dateRange.start, departure: destination.dateRange.end },
    weatherPlaceholder: { condition: 'Live weather pending', temperature: '—', icon: 'pending', sunrise: '—', sunset: '—' },
    travel: {
      hotel: destination.hotel.name,
      checkIn: destination.hotel.checkIn,
      checkOut: destination.hotel.checkOut,
      nights: destination.hotel.nights,
      arriving: destination.arrivalSummary || connectionSummary(arrival, 'arrival'),
      departing: connectionSummary(departure, 'departure'),
    },
  }
})

export function getDestination(destinationId) {
  return destinations.find((destination) => destination.id === destinationId)
    || getTripDestination(destinationId)
}
