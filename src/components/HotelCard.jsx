import { createGoogleMapsSearchUrl } from '../utils/maps.js'
import { officialHotelMedia } from '../data/officialMedia.js'
import { EditorialMedia } from './EditorialMedia.jsx'

function HotelCard({ hotel }) {
  const media = officialHotelMedia[hotel.variant]
  const destinationId = hotel.destinationId || hotel.variant

  return (
    <article className={`hotel-collection-card hotel-collection-card--${hotel.variant}`}>
      <EditorialMedia
        media={media}
        fallbackEyebrow={hotel.city}
        fallbackTitle={hotel.name}
        className="hotel-collection-card__media"
      />

      <div className="hotel-collection-card__content">
        <p className="hotel-collection-card__city">{hotel.city}</p>
        <h2>{hotel.name}</h2>
        <p className="hotel-collection-card__description">{hotel.description}</p>

        <dl className="hotel-collection-card__stay">
          <div><dt>Check-in</dt><dd>{hotel.checkIn}</dd></div>
          <div><dt>Checkout</dt><dd>{hotel.checkOut}</dd></div>
          <div><dt>Stay</dt><dd>{hotel.nights}</dd></div>
        </dl>

        <ul className="hotel-collection-card__highlights" aria-label={`${hotel.name} highlights`}>
          {hotel.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
        </ul>

        <div className="hotel-collection-card__links">
          <a href={`#/destination/${destinationId}`}>Destination concierge <span aria-hidden="true">→</span></a>
          <a href={createGoogleMapsSearchUrl(hotel.googleMapsQuery || hotel.name, hotel.city)} target="_blank" rel="noreferrer">Google Maps <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </article>
  )
}

export default HotelCard
