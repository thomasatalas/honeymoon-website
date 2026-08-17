import DestinationConcierge from '../components/DestinationConcierge.jsx'
import PageLayout from '../components/PageLayout.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import { destinations, getDestination } from '../data/destinations.js'

function Destination({ destinationId }) {
  const { t } = useLanguage()
  const destination = getDestination(destinationId) || destinations[0]

  return (
    <PageLayout
      className={`destination-theme destination-theme--${destination.id}`}
      eyebrow={`${destination.country} · ${t('concierge.privateConcierge')}`}
      title={destination.city}
      intro={`${t('concierge.pageIntro')} ${destination.city}.`}
    >
      <nav className="destination-switcher" aria-label={t('concierge.destinationNavigation')}>
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
