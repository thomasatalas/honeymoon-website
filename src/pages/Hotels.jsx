import HotelCard from '../components/HotelCard.jsx'
import { hotels } from '../data/hotels.js'

function Hotels() {
  return (
    <section id="hotels" className="hotels-page">
      {hotels.map((hotel) => (
        <HotelCard key={hotel.name} hotel={hotel} />
      ))}
    </section>
  )
}

export default Hotels
