import { useLanguage } from '../context/LanguageContext.jsx'
import { destinations } from '../data/destinations.js'
import { getTripDay } from '../data/trip.js'
import WeatherCard from './WeatherCard.jsx'

function parseTripDate(value) {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function startOfDay(value) {
  return new Date(value.getFullYear(), value.getMonth(), value.getDate())
}

function toDateKey(value) {
  const year = value.getFullYear()
  const month = String(value.getMonth() + 1).padStart(2, '0')
  const day = String(value.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function formatDate(value) {
  return new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(value)
}

function allActivities(day) {
  return day ? [...day.morning, ...day.afternoon, ...day.evening] : []
}

function getTravelState(referenceDate, destinationList) {
  const today = startOfDay(referenceDate)
  const dateKey = toDateKey(today)
  const tripDay = getTripDay(dateKey)

  if (tripDay) {
    const currentIndex = destinationList.findIndex((destination) => destination.id === tripDay.destination.id)
    return {
      destination: destinationList[currentIndex] || tripDay.destination,
      day: tripDay.day,
      labelKey: 'currentCity',
      nextDestination: destinationList[currentIndex + 1] || null,
      today,
      isBeforeTrip: false,
    }
  }

  const nextDestination = destinationList.find((destination) => today < parseTripDate(destination.tripDates.arrival))
  if (nextDestination) {
    return {
      destination: nextDestination,
      day: nextDestination.days[0],
      labelKey: 'upcomingCity',
      nextDestination,
      today,
      isBeforeTrip: true,
    }
  }

  return {
    destination: destinationList.at(-1),
    day: null,
    labelKey: 'journeyComplete',
    nextDestination: null,
    today,
    isBeforeTrip: false,
  }
}

function getCountdown(travelState, t) {
  if (!travelState.nextDestination) return t('todayCard.everyChapter')

  const arrival = parseTripDate(travelState.nextDestination.tripDates.arrival)
  const days = Math.max(0, Math.ceil((arrival - travelState.today) / 86400000))
  if (days === 0) return `${t('todayCard.todayOnward')} ${travelState.nextDestination.city}`
  return `${days} ${t(days === 1 ? 'todayCard.dayTo' : 'todayCard.daysTo')} ${travelState.nextDestination.city}`
}

function getNextActivity(day, referenceDate) {
  const now = referenceDate.getHours() * 60 + referenceDate.getMinutes()
  return allActivities(day).find((item) => {
    if (!item.time) return false
    const [hours, minutes] = item.time.split(':').map(Number)
    return (hours * 60 + minutes) >= now
  }) || null
}

function getCurrentHotel(destination, dateKey) {
  const stays = destination.stays || [destination.hotel]
  return stays.find((stay) => stay.checkInDate <= dateKey && dateKey < stay.checkOutDate) || destination.hotel
}

function TodayCard({ referenceDate = new Date(), destinationList = destinations }) {
  const { t } = useLanguage()
  const travelState = getTravelState(referenceDate, destinationList)
  const { destination, day } = travelState
  const currentHotel = getCurrentHotel(destination, day?.date || toDateKey(travelState.today))
  const itinerary = allActivities(day)
  const nextActivity = !travelState.isBeforeTrip && day ? getNextActivity(day, referenceDate) : null
  const mapLinks = [
    { label: currentHotel.name, url: currentHotel.mapUrl || destination.links.googleMaps },
    ...itinerary.map((item) => ({ label: item.location, url: item.mapUrl })),
  ].filter((item, index, list) => list.findIndex((candidate) => candidate.url === item.url) === index).slice(0, 4)

  return (
    <section className="today-card-section" aria-label={t('todayCard.ariaLabel')}>
      <article className="today-card">
        <header className="today-card__header">
          <div>
            <p className="section-tag">{t('todayCard.liveCompanion')} · {t(`todayCard.${travelState.labelKey}`)}</p>
            <h2>{destination.city}</h2>
            <span>{destination.country} · {formatDate(travelState.today)}</span>
          </div>
          <div className="today-card__countdown"><small>{t('todayCard.nextChapter')}</small><strong>{getCountdown(travelState, t)}</strong></div>
        </header>

        <div className="today-card__grid">
          <section className="today-card__stay">
            <p>{t('todayCard.travelHomeBase')}</p>
            <h3>{currentHotel.name}</h3>
            {currentHotel.suite && <span className="today-card__suite">{currentHotel.suite}</span>}
            <a href={currentHotel.mapUrl || destination.links.googleMaps} target="_blank" rel="noreferrer">{t('concierge.openGoogleMaps')} <span aria-hidden="true">↗</span></a>
          </section>

          <section className="today-card__weather">
            <WeatherCard destination={destination} compact />
          </section>

          <section className="today-card__plan">
            <h3>{t(travelState.isBeforeTrip ? 'todayCard.firstDayPreview' : 'todayCard.todayPlan')}</h3>
            {day && <p className="today-card__day-title">{day.title}</p>}
            {itinerary.length > 0 ? (
              <ol>{itinerary.map((item) => <li key={`${item.title}-${item.displayTime || ''}`}><span>{item.displayTime && <time>{item.displayTime}</time>}{item.title}</span></li>)}</ol>
            ) : <p>{t('todayCard.everyChapter')}</p>}
          </section>

          <section className="today-card__restaurants">
            <h3>{t('todayCard.nextScheduled')}</h3>
            <div className="today-card__next-activity">
              {nextActivity ? (
                <><time>{nextActivity.displayTime}</time><strong>{nextActivity.title}</strong><span>{nextActivity.location}</span></>
              ) : <p>{travelState.isBeforeTrip ? day?.note : t('todayCard.noMoreScheduled')}</p>}
            </div>
            <h3 className="today-card__maps-title">{t('todayCard.usefulMaps')}</h3>
            <ul>
              {mapLinks.map((item) => (
                <li key={item.url}><span>{item.label}</span><a href={item.url} target="_blank" rel="noreferrer">{t('todayCard.map')}</a></li>
              ))}
            </ul>
            <a className="today-card__journal" href="#/journal">{t('todayCard.openJournal')} <span aria-hidden="true">→</span></a>
          </section>
        </div>
      </article>
    </section>
  )
}

export default TodayCard
