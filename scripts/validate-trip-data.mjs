import { trip } from '../src/data/trip.js'

const expectedRoute = ['sfo-dxb', 'dxb-ams', 'ams-muc', 'muc-nce', 'nce-doh', 'doh-sin', 'sin-hkg', 'hkg-ngb']
const expectedStays = { amsterdam: 4, munich: 4, nice: 4, singapore: 3 }
const allowedStatuses = new Set(trip.statusLabels)
const errors = []

const connectionIds = trip.transportation.map(({ id }) => id)
if (connectionIds.join('|') !== expectedRoute.join('|')) errors.push('Transportation does not match the expected SFO–NGB route order.')

for (const [destinationId, nights] of Object.entries(expectedStays)) {
  const destination = trip.destinations.find(({ id }) => id === destinationId)
  if (!destination) {
    errors.push(`Missing destination: ${destinationId}`)
    continue
  }
  const stays = destination.stays || [destination.hotel]
  const totalNights = stays.reduce((sum, stay) => sum + stay.nights, 0)
  if (totalNights !== nights) errors.push(`${destinationId} must have ${nights} hotel nights.`)
  for (const stay of stays) {
    if (!stay.checkInDate || !stay.checkOutDate) errors.push(`${destinationId} is missing semantic hotel dates.`)
  }
  for (const reservation of destination.reservations) {
    if (!allowedStatuses.has(reservation.status)) errors.push(`${destinationId} uses invalid reservation status: ${reservation.status}`)
  }
  for (const day of destination.days) {
    for (const period of ['morning', 'afternoon', 'evening']) {
      for (const item of day[period]) {
        if (!allowedStatuses.has(item.status)) errors.push(`${day.date} uses invalid activity status: ${item.status}`)
      }
    }
  }
}

const serialized = JSON.stringify(trip).toLowerCase()
for (const sensitiveTerm of ['booking reference', 'confirmation number', 'passport number', 'ticket number', 'frequent-flyer']) {
  if (serialized.includes(sensitiveTerm)) errors.push(`Potential sensitive field found: ${sensitiveTerm}`)
}

if (errors.length) {
  console.error(errors.map((error) => `• ${error}`).join('\n'))
  process.exit(1)
}

console.log(`Trip data valid: ${trip.destinations.length} city chapters, ${Object.values(expectedStays).reduce((sum, nights) => sum + nights, 0)} hotel nights, ${trip.transportation.length} flight segments, ${trip.transitLocations.length + trip.destinations.length} route points.`)
