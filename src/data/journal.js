import { getAllTripDays } from './trip.js'

function formatDate(date) {
  const [year, month, day] = date.split('-').map(Number)
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    .format(new Date(year, month - 1, day))
}

export const journalEntries = getAllTripDays({ includeDeparture: false }).map(({ destination, day }) => ({
  date: formatDate(day.date),
  city: destination.city,
  mood: day.journal?.mood || day.title,
  itinerary: [...day.morning, ...day.afternoon, ...day.evening].map((item) => item.title),
  restaurants: day.journal?.restaurants || [],
  notes: day.journal?.notes || day.note,
  photoCollection: `journals/${day.date}`,
}))
