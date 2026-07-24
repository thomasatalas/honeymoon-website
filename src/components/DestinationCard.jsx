import { createGoogleMapsSearchUrl } from '../utils/maps.js'

function DestinationCard({ stop }) {
  return (
    <article className={`timeline-card ${stop.side} ${stop.variant}`} data-city={stop.city}>
      <div className="destination-visual" aria-hidden="true">
        <span className="destination-visual__chapter">{stop.country}</span>
        <strong>{stop.city.slice(0, 2)}</strong>
        <span>{stop.dates}</span>
      </div>

      <div className="destination-copy">
        <div className="card-meta-row">
          <span className="five-star-badge">{stop.country}</span>
          <span className="suite-badge">{stop.nights}</span>
        </div>

        <p className="city-name">{stop.city}</p>
        <p className="country-name">{stop.country}</p>
        <p className="trip-dates">{stop.dates}</p>
        <p className="hotel-name">{stop.hotel}</p>
        <p className="nights-count">{stop.nights}</p>
        <a className="explore-button" href={`#/destination/${stop.variant}`}>Open concierge</a>
        <a className="destination-map-link" href={createGoogleMapsSearchUrl(stop.hotel, stop.city)} target="_blank" rel="noreferrer">Open in Google Maps</a>
      </div>
    </article>
  )
}

export default DestinationCard
