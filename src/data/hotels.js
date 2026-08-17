import { trip } from './trip.js'

export const hotels = trip.destinations.map((destination) => ({
  city: destination.city,
  name: destination.hotel.name,
  checkIn: destination.hotel.checkIn,
  checkOut: destination.hotel.checkOut,
  nights: `${destination.hotel.nights} nights`,
  description: destination.hotel.description,
  highlights: destination.hotel.highlights,
  variant: destination.id,
}))
