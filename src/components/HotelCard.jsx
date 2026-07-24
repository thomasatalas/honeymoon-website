function HotelCard({ hotel }) {
  return (
    <article className={`hotel-card ${hotel.variant}`}>
      <div className="hotel-visual" aria-hidden="true">
        <span>Luxury Photo Placeholder</span>
      </div>

      <div className="hotel-content">
        <div className="card-meta-row">
          <span className="five-star-badge">Five-Star</span>
          <span className="suite-badge">{hotel.suite}</span>
        </div>
        <p className="city-name">{hotel.city}</p>
        <p className="hotel-name">{hotel.name}</p>
        <div className="stay-details">
          <p>{hotel.checkIn}</p>
          <p>{hotel.checkOut}</p>
        </div>
      </div>
    </article>
  )
}

export default HotelCard
