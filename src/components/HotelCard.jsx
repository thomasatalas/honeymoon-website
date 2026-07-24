import { useLanguage } from '../context/LanguageContext.jsx'
import { createGoogleMapsSearchUrl } from '../utils/maps.js'

function HotelCard({ hotel }) {
  const { t } = useLanguage()

  return (
    <article className={`hotel-card ${hotel.variant}`}>
      <div className="hotel-visual" aria-hidden="true">
        <span>{hotel.city}</span>
        <strong>{hotel.city.slice(0, 2)}</strong>
        <small>{hotel.nights}</small>
      </div>

      <div className="hotel-content">
        <div className="card-meta-row">
          <span className="five-star-badge">{t('cards.fiveStar')}</span>
          <span className="suite-badge">{hotel.suite}</span>
        </div>
        <p className="city-name">{hotel.city}</p>
        <p className="hotel-name">{hotel.name}</p>
        <p className="hotel-description">{hotel.description}</p>
        <div className="stay-details">
          <p>{hotel.checkIn}</p>
          <p>{hotel.checkOut}</p>
        </div>
        <ul className="hotel-highlights" aria-label={`${hotel.name} highlights`}>
          {hotel.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
        </ul>
        <a className="hotel-concierge-link" href={`#/destination/${hotel.variant}`}>Destination concierge <span aria-hidden="true">→</span></a>
        <a className="hotel-map-link" href={createGoogleMapsSearchUrl(hotel.name, hotel.city)} target="_blank" rel="noreferrer">Open in Google Maps <span aria-hidden="true">↗</span></a>
      </div>
    </article>
  )
}

export default HotelCard
