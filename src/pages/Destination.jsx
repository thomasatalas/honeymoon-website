import DestinationConcierge from '../components/DestinationConcierge.jsx'
import PageLayout from '../components/PageLayout.jsx'
import { destinations, getDestination } from '../data/destinations.js'

function Destination({ destinationId }) {
  const destination = getDestination(destinationId) || destinations[0]

  return (
    <PageLayout
      eyebrow={`${destination.country} · Private Concierge`}
      title={destination.city}
      intro={`Everything Thomas and Maggie need for a seamless stay in ${destination.city}, gathered in one place.`}
    >
      <nav className="destination-switcher" aria-label="Destination concierges">
        {destinations.map((item) => (
          <a
            key={item.id}
            href={`#/destination/${item.id}`}
            className={item.id === destination.id ? 'is-active' : ''}
            aria-current={item.id === destination.id ? 'page' : undefined}
          >
            <span>{item.country}</span>{item.city}
          </a>
        ))}
      </nav>
      <DestinationConcierge destination={destination} />
    </PageLayout>
  )
}

export default Destination
