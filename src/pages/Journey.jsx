import Timeline from '../components/Timeline.jsx'
import PageLayout from '../components/PageLayout.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import { journeyStops } from '../data/itinerary.js'

function Journey() {
  const { t } = useLanguage()

  return (
    <PageLayout
      eyebrow={t('pages.journey.eyebrow')}
      title={t('pages.journey.title')}
      intro={t('pages.journey.intro')}
    >
      <section className="journey-overview" aria-label="Journey overview">
        {journeyStops.map((stop, index) => (
          <article key={stop.city} className="journey-overview-card">
            <span className="journey-overview-card__number">{String(index + 1).padStart(2, '0')}</span>
            <div>
              <p>{stop.country}</p>
              <h2>{stop.city}</h2>
              <span>{stop.dates}</span>
              <a href={`#/destination/${stop.variant}`}>Open concierge <span aria-hidden="true">→</span></a>
            </div>
          </article>
        ))}
      </section>
      <div className="journey-map-invitation">
        <p className="section-tag">Across the World</p>
        <h2>Follow every mile of our journey</h2>
        <p>Explore flights, overland connections, hotel stays, and every city along the route.</p>
        <a className="journey-button" href="#/map">Open interactive map</a>
      </div>
      <Timeline stops={journeyStops} sectionId="journey-timeline" />
    </PageLayout>
  )
}

export default Journey
