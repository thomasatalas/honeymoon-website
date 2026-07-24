import HotelCard from '../components/HotelCard.jsx'
import PageLayout from '../components/PageLayout.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import { hotels } from '../data/hotels.js'

function Hotels() {
  const { t } = useLanguage()

  return (
    <PageLayout
      eyebrow={t('pages.hotels.eyebrow')}
      title={t('pages.hotels.title')}
      intro={t('pages.hotels.intro')}
    >
      <section className="hotels-page" aria-label="Honeymoon hotels">
        {hotels.map((hotel) => (
          <HotelCard key={hotel.name} hotel={hotel} />
        ))}
      </section>
    </PageLayout>
  )
}

export default Hotels
