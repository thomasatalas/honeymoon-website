import Hero from '../components/Hero.jsx'
import Navbar from '../components/Navbar.jsx'
import Timeline from '../components/Timeline.jsx'
import Footer from '../components/Footer.jsx'
import TodayCard from '../components/TodayCard.jsx'
import CountdownSection from '../components/CountdownSection.jsx'
import ProposalGallery from './ProposalGallery.jsx'
import ShanghaiGallery from './ShanghaiGallery.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import { journeyStops } from '../data/itinerary.js'
import { flights } from '../data/flights.js'
import { journalEntries } from '../data/journal.js'

function StoryHeader({ chapter, align = 'left', t }) {
  return (
    <header className={`story-header story-header--${align}`}>
      <p className="section-tag">{t(`story.${chapter}.eyebrow`)}</p>
      <h2>{t(`story.${chapter}.title`)}</h2>
      <p>{t(`story.${chapter}.intro`)}</p>
    </header>
  )
}

function Home() {
  const { t } = useLanguage()

  return (
    <main id="main-content" className="page-shell" tabIndex="-1">
      <Navbar />
      <Hero />

      <div className="story-chapter story-chapter--proposal">
        <StoryHeader chapter="proposal" t={t} />
        <ProposalGallery showHeader={false} />
      </div>

      <div className="story-chapter story-chapter--celebrations">
        <StoryHeader chapter="celebrations" align="right" t={t} />
        <ShanghaiGallery showHeader={false} />
      </div>

      <div className="story-chapter story-chapter--route">
        <StoryHeader chapter="route" t={t} />
        <section id="destinations" className="progress-section" aria-label="Honeymoon destination progress">
          <div className="progress-track" aria-label="Journey destinations">
            <div className="progress-line">
              <span className="progress-line-fill" />
            </div>

            <div className="progress-steps">
              {journeyStops.map((stop, index) => (
                <div key={stop.city} className={`progress-step ${index === 0 ? 'is-active' : ''}`} data-city={stop.city}>
                  <span className="progress-dot" />
                  <span className="progress-label">{stop.city}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Timeline stops={journeyStops} showHeader={false} />
      </div>

      <CountdownSection />

      <div className="story-chapter story-chapter--today">
        <StoryHeader chapter="today" align="center" t={t} />
        <TodayCard />
      </div>

      <section id="flights" className="micro-section" aria-label="Honeymoon flights preview">
        <div className="micro-copy">
          <p className="section-tag">{t('flights.tag')}</p>
          <h2>{t('flights.title')}</h2>
          <div className="home-flight-list">
            {flights.map((flight) => (
              <span key={flight.id}>{flight.airline}</span>
            ))}
          </div>
          <a className="section-link" href="#/flights">View flight collection <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <section id="journal" className="micro-section micro-section--journal" aria-label="Honeymoon journal preview">
        <div className="micro-copy">
          <p className="section-tag">{t('journal.tag')}</p>
          <h2>{t('journal.title')}</h2>
          <p className="journal-preview-copy">{journalEntries.length} days · {journeyStops.map((stop) => stop.city).join(' · ')}</p>
          <a className="section-link" href="#/journal">Open our journal <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default Home
