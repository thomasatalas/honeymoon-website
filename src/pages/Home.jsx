import Hero from '../components/Hero.jsx'
import Navbar from '../components/Navbar.jsx'
import Timeline from '../components/Timeline.jsx'
import Footer from '../components/Footer.jsx'
import { journeyStops, progressMilestones } from '../data/itinerary.js'

function Home() {
  return (
    <main className="page-shell">
      <Navbar />
      <Hero />

      <section id="destinations" className="progress-section" aria-label="Honeymoon progress timeline">
        <div className="timeline-header">
          <p className="section-tag">The Countdown</p>
          <h2>From planning to home</h2>
        </div>

        <div className="progress-track" aria-hidden="true">
          <div className="progress-line">
            <span className="progress-line-fill" />
          </div>

          <div className="progress-steps">
            {progressMilestones.map((step, index) => (
              <div key={step} className="progress-step">
                <span className={`progress-dot ${index === 0 ? 'is-active' : ''}`} />
                <span className="progress-label">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Timeline stops={journeyStops} />

      <section id="flights" className="micro-section" aria-label="Flight placeholder section">
        <div className="micro-copy">
          <p className="section-tag">Flights</p>
          <h2>Private departures, seamless arrivals.</h2>
        </div>
      </section>

      <section id="journal" className="micro-section micro-section--journal" aria-label="Journal placeholder section">
        <div className="micro-copy">
          <p className="section-tag">Journal</p>
          <h2>Notes, moments, and the story in between.</h2>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default Home
