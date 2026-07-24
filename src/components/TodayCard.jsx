import { destinations } from '../data/destinations.js'
import { journalEntries } from '../data/journal.js'
import { createGoogleMapsSearchUrl } from '../utils/maps.js'
import WeatherCard from './WeatherCard.jsx'

function parseTripDate(value) {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function startOfDay(value) {
  return new Date(value.getFullYear(), value.getMonth(), value.getDate())
}

function getJournalDate(value) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(value)
}

function getTravelState(referenceDate, destinationList) {
  const today = startOfDay(referenceDate)
  const activeIndex = destinationList.findIndex((destination) => (
    today >= parseTripDate(destination.tripDates.arrival)
    && today < parseTripDate(destination.tripDates.departure)
  ))

  if (activeIndex >= 0) {
    return {
      destination: destinationList[activeIndex],
      label: 'Current city',
      nextDestination: destinationList[activeIndex + 1] || null,
      today,
    }
  }

  const nextDestination = destinationList.find((destination) => today < parseTripDate(destination.tripDates.arrival))
  if (nextDestination) {
    return { destination: nextDestination, label: 'Upcoming city', nextDestination, today }
  }

  return {
    destination: destinationList.at(-1),
    label: 'Journey complete',
    nextDestination: null,
    today,
  }
}

function getCountdown(travelState) {
  if (!travelState.nextDestination) return 'Every chapter is now part of our story'

  const arrival = parseTripDate(travelState.nextDestination.tripDates.arrival)
  const days = Math.max(0, Math.ceil((arrival - travelState.today) / 86400000))
  if (days === 0) return `Today · Onward to ${travelState.nextDestination.city}`
  return `${days} ${days === 1 ? 'day' : 'days'} to ${travelState.nextDestination.city}`
}

function TodayCard({ referenceDate = new Date(), destinationList = destinations, entries = journalEntries }) {
  const travelState = getTravelState(referenceDate, destinationList)
  const { destination } = travelState
  const journalEntry = entries.find((entry) => entry.date === getJournalDate(travelState.today))
  const itinerary = journalEntry?.itinerary || destination.today.itinerary
  const restaurants = journalEntry?.restaurants || destination.today.restaurants

  return (
    <section className="today-card-section" aria-label="Today’s travel companion">
      <article className="today-card">
        <header className="today-card__header">
          <div>
            <p className="section-tag">Live Travel Companion · {travelState.label}</p>
            <h2>{destination.city}</h2>
            <span>{destination.country} · {getJournalDate(travelState.today)}</span>
          </div>
          <div className="today-card__countdown"><small>Next chapter</small><strong>{getCountdown(travelState)}</strong></div>
        </header>

        <div className="today-card__grid">
          <section className="today-card__stay">
            <p>Tonight’s hotel</p>
            <h3>{destination.travel.hotel}</h3>
            <a href={destination.links.googleMaps} target="_blank" rel="noreferrer">Open in Google Maps <span aria-hidden="true">↗</span></a>
          </section>

          <section className="today-card__weather">
            <WeatherCard destination={destination} compact />
          </section>

          <section className="today-card__plan">
            <h3>Today’s itinerary</h3>
            <ol>{itinerary.map((item) => <li key={item}>{item}</li>)}</ol>
          </section>

          <section className="today-card__restaurants">
            <h3>Restaurants</h3>
            <ul>
              {restaurants.map((restaurant) => (
                <li key={restaurant}>
                  <span>{restaurant}</span>
                  <a href={createGoogleMapsSearchUrl(restaurant, destination.city)} target="_blank" rel="noreferrer">Map</a>
                </li>
              ))}
            </ul>
            <a className="today-card__journal" href="#/journal">Open today’s journal <span aria-hidden="true">→</span></a>
          </section>
        </div>
      </article>
    </section>
  )
}

export default TodayCard
