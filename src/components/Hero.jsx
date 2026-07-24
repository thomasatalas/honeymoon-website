import { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'
import { honeymoonStart } from '../data/itinerary.js'
import { getMediaCollections } from '../media/mediaLibrary.js'

const HONEYMOON_START = new Date(honeymoonStart)
const HERO_COLLECTIONS = ['hero', 'proposal', 'shanghai']
const heroImageSources = getMediaCollections(HERO_COLLECTIONS)

function getDaysUntilHoneymoon() {
  const today = new Date()
  const differenceInMs = HONEYMOON_START - today
  const differenceInDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24))

  return Math.max(differenceInDays, 0)
}

function Hero() {
  const { t } = useLanguage()
  const [daysUntilHoneymoon, setDaysUntilHoneymoon] = useState(() => getDaysUntilHoneymoon())
  const [heroImage, setHeroImage] = useState('')
  const [isImageVisible, setIsImageVisible] = useState(true)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setDaysUntilHoneymoon(getDaysUntilHoneymoon())
    }, 60000)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (heroImageSources.length === 0) {
      setHeroImage('')
      return
    }

    const nextImage = heroImageSources[Math.floor(Math.random() * heroImageSources.length)]
    setIsImageVisible(false)

    const fadeTimer = window.setTimeout(() => {
      setHeroImage(nextImage)
      setIsImageVisible(true)
    }, 180)

    return () => window.clearTimeout(fadeTimer)
  }, [])

  return (
    <section id="journey" className="hero-section" aria-label="Luxury honeymoon hero">
      <div className="animated-background" aria-hidden="true">
        <span className="bg-orb orb-left" />
        <span className="bg-orb orb-right" />
        <span className="grid-line grid-line-1" />
        <span className="grid-line grid-line-2" />
      </div>

      <div className="hero-image-shell" aria-hidden="true">
        {heroImage ? (
          <img
            className={`hero-image-manager ${isImageVisible ? 'is-visible' : ''}`}
            src={heroImage}
            alt=""
            fetchPriority="high"
            decoding="async"
            width="1600"
            height="1000"
            sizes="100vw"
          />
        ) : (
          <div className="hero-image-placeholder">Photos coming soon.</div>
        )}
      </div>

      <div className="hero-content">
        <p className="eyebrow">{t('hero.eyebrow')}</p>
        <h1>{t('hero.title')}</h1>
        <p className="countdown-pill" aria-live="polite">
          <span className="countdown-label">{t('hero.countdownLabel')}</span>
          <span className="countdown-number">{daysUntilHoneymoon}</span>
          <span className="countdown-unit">{t('hero.countdownUnit')}</span>
        </p>
        <p className="subtitle">{t('hero.subtitle')}</p>
        <p className="dates">{t('hero.dateRange')}</p>
        <button type="button" className="journey-button" onClick={() => { window.location.hash = '/journey' }}>
          {t('hero.button')}
        </button>
      </div>
    </section>
  )
}

export default Hero
