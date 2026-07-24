import FlightCard from '../components/FlightCard.jsx'
import PageLayout from '../components/PageLayout.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import { flights } from '../data/flights.js'

function Flights() {
  const { t } = useLanguage()

  return (
    <PageLayout
      eyebrow={t('pages.flights.eyebrow')}
      title={t('pages.flights.title')}
      intro={t('pages.flights.intro')}
    >
      <section className="flights-page" aria-label="Honeymoon flights">
        {flights.map((flight, index) => (
          <FlightCard key={flight.id} flight={flight} index={index} />
        ))}
      </section>
    </PageLayout>
  )
}

export default Flights
