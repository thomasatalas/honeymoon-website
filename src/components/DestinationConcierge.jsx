import WeatherCard from './WeatherCard.jsx'
import { createGoogleMapsSearchUrl } from '../utils/maps.js'

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

function PlanList({ title, items, destination, showMaps = false }) {
  return (
    <div className="concierge-plan-list">
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>
            <span>{item}</span>
            {showMaps && (
              <a href={createGoogleMapsSearchUrl(item, destination)} target="_blank" rel="noreferrer">Open in Google Maps</a>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

const linkDefinitions = [
  { key: 'googleMaps', label: 'Google Maps', icon: 'G' },
  { key: 'appleMaps', label: 'Apple Maps', icon: 'A' },
  { key: 'hotelWebsite', label: 'Hotel website', icon: 'H' },
  { key: 'hotelReservation', label: 'Hotel reservation', icon: 'R' },
  { key: 'airlineBooking', label: 'Airline booking', icon: '✈' },
  { key: 'weatherDetails', label: 'Weather details', icon: '☼' },
]

function DestinationConcierge({ destination }) {
  const { travel, today, helpful, links } = destination

  return (
    <div className="destination-concierge">
      <ConciergeSection number="01" eyebrow="Current Conditions" title={`Weather in ${destination.city}`} className="concierge-section--weather">
        <WeatherCard destination={destination} />
      </ConciergeSection>

      <ConciergeSection number="02" eyebrow="Travel" title="Stay & Connections" className="concierge-section--travel">
        <div className="concierge-hotel-callout">
          <p>Your hotel</p>
          <h3>{travel.hotel}</h3>
          <span>{travel.nights} nights</span>
          <a href={links.googleMaps} target="_blank" rel="noreferrer">Open in Google Maps <span aria-hidden="true">↗</span></a>
        </div>
        <DefinitionGrid items={[
          { label: 'Check-in', value: travel.checkIn },
          { label: 'Check-out', value: travel.checkOut },
          { label: 'Arriving', value: travel.arriving },
          { label: 'Departing', value: travel.departing },
        ]} />
      </ConciergeSection>

      <ConciergeSection number="03" eyebrow="Today" title="Your Day at a Glance" className="concierge-section--today">
        <div className="concierge-plan-grid">
          <PlanList title="Planned itinerary" items={today.itinerary} destination={destination.city} />
          <PlanList title="Reservations" items={today.reservations} destination={destination.city} />
          <PlanList title="Restaurants" items={today.restaurants} destination={destination.city} showMaps />
          <PlanList title="Attractions" items={today.attractions} destination={destination.city} showMaps />
        </div>
      </ConciergeSection>

      <ConciergeSection number="04" eyebrow="Helpful Info" title="Know Before You Go" className="concierge-section--helpful">
        <DefinitionGrid items={[
          { label: 'Currency', value: helpful.currency },
          { label: 'Exchange rate', value: helpful.exchangeRate },
          { label: 'Emergency', value: helpful.emergency },
          { label: 'Time zone', value: helpful.timeZone },
          { label: 'Plug type', value: helpful.plugType },
          { label: 'Language', value: helpful.language },
        ]} />
      </ConciergeSection>

      <ConciergeSection number="05" eyebrow="Links" title="Everything One Tap Away" className="concierge-section--links">
        <div className="concierge-link-grid">
          {linkDefinitions.map(({ key, label, icon }) => links[key] ? (
            <a key={key} href={links[key]} target="_blank" rel="noreferrer">
              <span>{icon}</span><strong>{label}</strong><i aria-hidden="true">↗</i>
            </a>
          ) : (
            <span key={key} className="concierge-link--disabled" aria-disabled="true">
              <span>{icon}</span><strong>{label}</strong><i>Pending</i>
            </span>
          ))}
        </div>
      </ConciergeSection>
    </div>
  )
}

export default DestinationConcierge
