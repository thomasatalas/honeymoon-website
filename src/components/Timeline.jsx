import { useEffect } from 'react'
import DestinationCard from './DestinationCard.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'

function Timeline({ stops, sectionId = 'hotels' }) {
  const { t } = useLanguage()

  useEffect(() => {
    const cards = document.querySelectorAll('.timeline-card')
    const progressSteps = document.querySelectorAll('.progress-step')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')

            const city = entry.target.dataset.city
            progressSteps.forEach((step) => {
              step.classList.toggle('is-active', step.dataset.city === city)
            })
          }
        })
      },
      {
        threshold: 0.55,
        rootMargin: '0px 0px -12% 0px',
      },
    )

    cards.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section id={sectionId} className="journey-timeline" aria-label="Honeymoon journey timeline">
      <div className="timeline-header">
        <p className="section-tag">{t('timeline.tag')}</p>
        <h2>{t('timeline.title')}</h2>
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
