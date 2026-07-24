function DestinationCard({ stop }) {
  return (
    <article className={`timeline-card ${stop.side} ${stop.variant}`}>
      <div className="destination-visual" aria-hidden="true">
        <span>Luxury Photo Placeholder</span>
      </div>

      <div className="destination-copy">
        <div className="card-meta-row">
          <span className="five-star-badge">Five-Star</span>
          <span className="suite-badge">{stop.suite}</span>
        </div>
        <p className="city-name">{stop.city}</p>
        <p className="hotel-name">{stop.hotel}</p>
        <div className="stay-details">
          <p>{stop.checkIn}</p>
          <p>{stop.checkOut}</p>
        </div>
        <button type="button" className="explore-button">
          Explore
        </button>
      </div>
    </article>
  )
}

export default DestinationCard
