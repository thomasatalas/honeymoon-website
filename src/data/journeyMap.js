import { getConnection, trip } from './trip.js'

const shortDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
const formatDate = (date) => date ? shortDate.format(new Date(`${date}T12:00:00Z`)) : 'Schedule pending'
const connectionLabel = (connection) => `${connection.carrier}${connection.number ? ` ${connection.number}` : ''}`

function destinationStays(destination) {
  return destination.stays || [destination.hotel]
}

function totalNights(destination) {
  return destinationStays(destination).reduce((sum, stay) => sum + stay.nights, 0)
}

function destinationStop(destination) {
  const arrival = getConnection(destination.arrivalConnectionId)
  const departure = getConnection(destination.departureConnectionId)
  return {
    id: destination.id, city: destination.city, country: destination.country,
    coordinates: [destination.coordinates.latitude, destination.coordinates.longitude],
    arrival: formatDate(arrival?.arrival?.date || arrival?.date),
    departure: formatDate(departure?.departure?.date || departure?.date),
    hotel: destinationStays(destination).map((stay) => stay.name).join(' → '), nights: totalNights(destination),
    flights: [arrival, departure].filter(Boolean).map(connectionLabel), stopType: 'stay',
  }
}

const destinationStops = trip.destinations.map(destinationStop)
const routeStops = trip.transitLocations.map((location) => {
  const connections = (location.connectionIds || [location.connectionId]).map(getConnection).filter(Boolean)
  const arrival = connections.length > 1 ? connections[0] : location.stopType === 'origin' ? null : connections[0]
  const departure = connections.length > 1 ? connections.at(-1) : location.stopType === 'final' ? null : connections[0]
  return {
    ...location,
    arrival: arrival ? formatDate(arrival.arrival?.date || arrival.date) : 'Journey begins here',
    departure: departure ? formatDate(departure.departure?.date || departure.date) : 'Journey ends here',
    hotel: location.label, nights: 0, flights: connections.map(connectionLabel), stopType: location.stopType || 'transit',
  }
})

const stopById = new Map([...destinationStops, ...routeStops].map((stop) => [stop.id, stop]))
const orderedIds = ['san-francisco', 'dubai', 'amsterdam', 'munich', 'nice', 'doha', 'singapore', 'hong-kong', 'ningbo']
export const journeyMapStops = orderedIds.map((id) => stopById.get(id)).filter(Boolean)

export const journeyMapSegments = [
  ['san-francisco', 'dubai', 'sfo-dxb'],
  ['dubai', 'amsterdam', 'dxb-ams'],
  ['amsterdam', 'munich', 'ams-muc'],
  ['munich', 'nice', 'muc-nce'],
  ['nice', 'doha', 'nce-doh'],
  ['doha', 'singapore', 'doh-sin'],
  ['singapore', 'hong-kong', 'sin-hkg'],
  ['hong-kong', 'ningbo', 'hkg-ngb'],
].map(([from, to, connectionId]) => {
  const connection = getConnection(connectionId)
  return { from, to, connectionId, type: 'flight', label: connectionLabel(connection) }
})
