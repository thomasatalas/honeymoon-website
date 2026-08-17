import { useEffect, useState } from 'react'
import { honeymoonStart } from '../data/itinerary.js'
import { useLanguage } from '../context/LanguageContext.jsx'

const HONEYMOON_START = new Date(honeymoonStart)

function getDaysUntilHoneymoon() {
  return Math.max(Math.ceil((HONEYMOON_START - new Date()) / 86400000), 0)
}

function CountdownSection() {
  const { t } = useLanguage()
  const [days, setDays] = useState(getDaysUntilHoneymoon)

  useEffect(() => {
    const timer = window.setInterval(() => setDays(getDaysUntilHoneymoon()), 60000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <section className="story-countdown" aria-labelledby="countdown-title">
      <div className="story-countdown__number" aria-live="polite">{days}</div>
      <div className="story-countdown__copy">
        <p className="section-tag">{t('story.countdown.eyebrow')}</p>
        <h2 id="countdown-title">{t('story.countdown.title')}</h2>
        <p>{t('hero.dateRange')} · {t('hero.subtitle')}</p>
      </div>
    </section>
  )
}

export default CountdownSection
