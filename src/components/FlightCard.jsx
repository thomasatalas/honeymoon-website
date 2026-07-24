import { getMediaCollection } from '../media/mediaLibrary.js'

function FlightCard({ flight, index }) {
  const [image] = getMediaCollection(flight.assetCollection)

  return (
    <article className={`flight-card flight-card--${flight.id}`}>
      <div className="flight-card__visual">
        {image ? (
          <img
            src={image}
            alt={`${flight.airline} cabin`}
            loading="lazy"
            decoding="async"
            width="1200"
            height="800"
            sizes="(max-width: 760px) 100vw, 50vw"
          />
        ) : (
          <div className="flight-card__monogram" aria-hidden="true">
            <span>{flight.monogram}</span>
          </div>
        )}
        <span className="flight-card__sequence">Flight {String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="flight-card__content">
        <p className="section-tag">{flight.chapter}</p>
        <h2>{flight.airline}</h2>
        <p className="flight-card__route">{flight.route}</p>
        <dl className="flight-card__details">
          <div><dt>Departure</dt><dd>{flight.departure}</dd></div>
          <div><dt>Cabin</dt><dd>{flight.cabin}</dd></div>
          <div><dt>Experience</dt><dd>{flight.lounge}</dd></div>
        </dl>
        <p className="flight-card__status"><span />{flight.status}</p>
      </div>
    </article>
  )
}

export default FlightCard
