import { useEffect } from 'react'
import DestinationCard from './DestinationCard.jsx'

function Timeline({ stops }) {
  useEffect(() => {
    const cards = document.querySelectorAll('.timeline-card')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -5% 0px',
      },
    )

    cards.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="hotels" className="journey-timeline" aria-label="Honeymoon journey timeline">
      <div className="timeline-header">
        <p className="section-tag">Our Route</p>
        <h2>Four unforgettable chapters</h2>
      </div>

      <div className="timeline-track">
        {stops.map((stop) => (
          <DestinationCard key={stop.city} stop={stop} />
        ))}
      </div>
    </section>
  )
}

export default Timeline
