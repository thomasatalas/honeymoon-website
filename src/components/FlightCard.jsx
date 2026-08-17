import { officialFlightMedia } from '../data/officialMedia.js'
import { flightEditorialCopy, openingJourney } from '../data/flightPresentation.js'
import { EditorialMedia } from './EditorialMedia.jsx'

const hasValue = (value) => value && !/pending|unavailable/i.test(value)

function OpeningJourney() {
  return (
    <section className="airline-segment airline-segment--opening">
      <h3>{openingJourney.route}</h3>
      <dl className="airline-segment__details airline-segment__details--opening">
        <div><dt>Cabin</dt><dd>{openingJourney.cabin}</dd></div>
        <div><dt>Amsterdam arrival</dt><dd>{openingJourney.arrival}</dd></div>
      </dl>
    </section>
  )
}

function SchedulePoint({ label, point }) {
  const date = hasValue(point.date) ? point.date : null
  const detail = [hasValue(point.time) ? point.time : null, hasValue(point.airport) ? point.airport : null].filter(Boolean).join(' · ')
  if (!date && !detail) return null

  return (
    <div>
      <small>{label}</small>
      {date && <strong>{date}</strong>}
      {detail && <span>{detail}</span>}
    </div>
  )
}

function ConfirmedSegment({ segment }) {
  const details = [
    hasValue(segment.cabin) && ['Cabin', segment.cabin],
    hasValue(segment.aircraft) && ['Aircraft', segment.aircraft],
    hasValue(segment.duration) && ['Flight duration', segment.duration],
  ].filter(Boolean)

  return (
    <section className="airline-segment">
      <header>
        {hasValue(segment.flightNumber) && <strong>{segment.flightNumber}</strong>}
        <h3>{segment.route}</h3>
      </header>

      <div className="airline-segment__schedule">
        <SchedulePoint label="Departure" point={segment.departure} />
        <SchedulePoint label="Arrival" point={segment.arrival} />
      </div>

      {details.length > 0 && (
        <dl className="airline-segment__details">
          {details.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
        </dl>
      )}
    </section>
  )
}

function FlightCard({ flight, index }) {
  const media = officialFlightMedia[flight.id]

  return (
    <article className={`airline-chapter airline-chapter--${flight.id}`}>
      <header className="airline-chapter__header">
        <div className="airline-chapter__number">{String(index + 1).padStart(2, '0')}</div>
        <div className="airline-chapter__identity">
          <p>{flight.chapter}</p>
          <h2>{flight.airline}</h2>
        </div>
        <dl className="airline-chapter__overview">
          <div><dt>Route</dt><dd>{flight.overallRoute}</dd></div>
          <div><dt>Cabin</dt><dd>{flight.cabin}</dd></div>
        </dl>
      </header>

      {media && (
        <EditorialMedia
          media={media}
          fallbackEyebrow={flight.chapter}
          fallbackTitle={flight.airline}
          className="airline-chapter__media"
        />
      )}

      <div className="airline-chapter__content">
        <div className="airline-chapter__segments">
          {flight.id === 'emirates'
            ? <OpeningJourney />
            : flight.segments.filter((segment) => !segment.isPending).map((segment) => <ConfirmedSegment key={segment.id} segment={segment} />)}
        </div>
        <p className="airline-chapter__note">{flightEditorialCopy[flight.id]}</p>
        {flight.connectionNote && <p className="airline-chapter__connection">{flight.connectionNote}</p>}
      </div>
    </article>
  )
}

export default FlightCard
