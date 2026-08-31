import { trip } from './trip.js'

export const hotels = trip.destinations.flatMap((destination) => {
  const stays = destination.stays || [destination.hotel]

  return stays.map((stay) => ({
    city: destination.city,
    name: stay.name,
    checkIn: stay.checkIn,
    checkOut: stay.checkOut,
    nights: `${stay.nights} ${stay.nights === 1 ? 'night' : 'nights'}`,
    description: stay.description,
    highlights: stay.highlights,
    variant: stay.variant || destination.id,
    destinationId: stay.destinationId || destination.id,
    googleMapsQuery: stay.googleMapsQuery || stay.name,
  }))
})
