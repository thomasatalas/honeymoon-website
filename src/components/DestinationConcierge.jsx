import WeatherCard from './WeatherCard.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import { getConnection } from '../data/trip.js'

function ConciergeSection({ number, eyebrow, title, children, className = '' }) {
  return (
    <section className={`concierge-section ${className}`}>
      <header className="concierge-section__header">
        <span>{number}</span>
        <div><p>{eyebrow}</p><h2>{title}</h2></div>
      </header>
      {children}
    </section>
  )
}

function DefinitionGrid({ items }) {
  return (
    <dl className="concierge-definition-grid">
      {items.map(({ label, value }) => (
        <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
      ))}
    </dl>
  )
}

function statusKey(status) {
  return status.toLowerCase().replaceAll(' ', '')
}

function StatusBadge({ status, t }) {
  return <span className={`itinerary-status itinerary-status--${statusKey(status)}`}>{t(`status.${statusKey(status)}`)}</span>
}

function Activity({ item, t }) {
  return (
    <article className="day-activity">
      <div className="day-activity__heading">
        <div>
          {item.displayTime && <time>{item.displayTime}</time>}
          <h4>{item.title}</h4>
        </div>
        <StatusBadge status={item.status} t={t} />
      </div>
      <p className="day-activity__location">{item.location}</p>
      {item.transportation && <p><strong>{t('concierge.transportation')}:</strong> {item.transportation}</p>}
      {item.note && <p><strong>{t('concierge.practicalNote')}:</strong> {item.note}</p>}
      <a href={item.mapUrl} target="_blank" rel="noreferrer">{t('concierge.openGoogleMaps')} <span aria-hidden="true">↗</span></a>
    </article>
  )
}

function DayPeriod({ label, items, t }) {
  return (
    <section className="day-period">
      <h3>{label}</h3>
      {items.length > 0
        ? items.map((item) => <Activity key={`${item.title}-${item.displayTime || ''}`} item={item} t={t} />)
        : <p className="day-period__empty">{t('concierge.noFixedPlan')}</p>}
    </section>
  )
}

const linkDefinitions = [
  { key: 'googleMaps', translationKey: 'concierge.googleMaps', icon: 'G' },
  { key: 'appleMaps', translationKey: 'concierge.appleMaps', icon: 'A' },
  { key: 'hotelWebsite', translationKey: 'concierge.hotelWebsite', icon: 'H' },
  { key: 'weatherDetails', translationKey: 'concierge.weatherDetails', icon: '☼' },
]

function describeConnection(connection) {
  if (!connection) return null
  const identity = `${connection.carrier}${connection.number ? ` ${connection.number}` : ''}`
  const schedule = [connection.departure.time, connection.arrival.time].filter(Boolean).join('–')
  return `${identity} · ${connection.route}${schedule ? ` · ${schedule}` : ' · schedule pending'}`
}

function formatDayDate(date, language) {
  const [year, month, day] = date.split('-').map(Number)
  return new Intl.DateTimeFormat(language === 'zh' ? 'zh-CN' : 'en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date(year, month - 1, day))
}

function DestinationConcierge({ destination }) {
  const { language, t } = useLanguage()
  const arrival = getConnection(destination.arrivalConnectionId)
  const departure = getConnection(destination.departureConnectionId)
  const { hotel, helpful, links } = destination

  return (
    <div className="destination-concierge">
      {destination.planningNote && (
        <div className="destination-planning-banner" role="status">
          <span className="destination-planning-label">{destination.planningLabel || t('status.tentative')}</span>
          <strong>{destination.planningNote}</strong>
        </div>
      )}

      <ConciergeSection number="01" eyebrow={t('concierge.currentConditions')} title={`${t('concierge.weatherIn')} ${destination.city}`} className="concierge-section--weather">
        <WeatherCard destination={destination} />
      </ConciergeSection>

      <ConciergeSection number="02" eyebrow={t('concierge.travel')} title={t('concierge.stayConnections')} className="concierge-section--travel">
        <div className="concierge-hotel-callout">
          <p>{t('concierge.yourHotel')}</p>
          <h3>{hotel.name}</h3>
          <span>{hotel.suite ? `${hotel.suite} · ` : ''}{hotel.nights} {t('concierge.nights')}</span>
          <a href={links.googleMaps} target="_blank" rel="noreferrer">{t('concierge.openGoogleMaps')} <span aria-hidden="true">↗</span></a>
        </div>
        <DefinitionGrid items={[
          { label: t('concierge.checkIn'), value: hotel.checkIn },
          { label: t('concierge.checkOut'), value: hotel.checkOut },
          { label: t('concierge.arriving'), value: destination.arrivalSummary || describeConnection(arrival) || t('concierge.seeDailyPlan') },
          { label: t('concierge.departing'), value: describeConnection(departure) || t('concierge.seeDailyPlan') },
        ]} />
      </ConciergeSection>

      <ConciergeSection number="03" eyebrow={t('concierge.dayByDay')} title={t('concierge.realItinerary')} className="concierge-section--itinerary">
        <div className="destination-days">
          {destination.days.map((day) => (
            <article className="destination-day" key={day.date}>
              <header className="destination-day__header">
                <div><time dateTime={day.date}>{formatDayDate(day.date, language)}</time><h2>{day.title}</h2></div>
                <p>{day.note}</p>
              </header>
              <div className="destination-day__periods">
                <DayPeriod label={t('concierge.morning')} items={day.morning} t={t} />
                <DayPeriod label={t('concierge.afternoon')} items={day.afternoon} t={t} />
                <DayPeriod label={t('concierge.evening')} items={day.evening} t={t} />
              </div>
              {day.alternatives?.length > 0 && (
                <div className="destination-day__alternatives">
                  <strong>{t('concierge.alternatives')}</strong>
                  <ul>{day.alternatives.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
              )}
            </article>
          ))}
        </div>
      </ConciergeSection>

      <ConciergeSection number="04" eyebrow={t('concierge.planning')} title={t('concierge.reservationsDecisions')} className="concierge-section--reservations">
        <div className="reservation-decision-list">
          {destination.reservations.map((reservation) => (
            <article key={reservation.item}>
              <StatusBadge status={reservation.status} t={t} />
              <div><h3>{reservation.item}</h3><p>{reservation.note}</p></div>
            </article>
          ))}
        </div>
        {destination.reserveOptions?.length > 0 && (
          <div className="concierge-reserve-options">
            <h3>{t('concierge.placesInReserve')}</h3>
            <div>
              {destination.reserveOptions.map((option) => (
                <article key={option.area}><strong>{option.area}</strong><span>{option.places}</span></article>
              ))}
            </div>
          </div>
        )}
        {destination.exclusions?.length > 0 && (
          <p className="concierge-exclusions"><strong>{t('concierge.notPlanned')}:</strong> {destination.exclusions.join(' · ')}</p>
        )}
      </ConciergeSection>

      <ConciergeSection number="05" eyebrow={t('concierge.helpfulInfo')} title={t('concierge.knowBeforeYouGo')} className="concierge-section--helpful">
        <DefinitionGrid items={[
          { label: t('concierge.currency'), value: helpful.currency },
          { label: t('concierge.emergency'), value: helpful.emergency },
          { label: t('concierge.timeZone'), value: helpful.timeZone },
          { label: t('concierge.plugType'), value: helpful.plugType },
          { label: t('concierge.language'), value: helpful.language },
          ...(helpful.practical ? [{ label: t('concierge.practicalNote'), value: helpful.practical }] : []),
        ]} />
      </ConciergeSection>

      <ConciergeSection number="06" eyebrow={t('concierge.links')} title={t('concierge.everythingOneTap')} className="concierge-section--links">
        <div className="concierge-link-grid">
          {linkDefinitions.map(({ key, translationKey, icon }) => links[key] && (
            <a key={key} href={links[key]} target="_blank" rel="noreferrer">
              <span>{icon}</span><strong>{t(translationKey)}</strong><i aria-hidden="true">↗</i>
            </a>
          ))}
        </div>
      </ConciergeSection>
    </div>
  )
}

export default DestinationConcierge
