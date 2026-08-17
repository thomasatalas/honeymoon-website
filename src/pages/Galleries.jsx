import PageLayout from '../components/PageLayout.jsx'
import PhotoGallery from '../components/PhotoGallery.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'
import ProposalGallery from './ProposalGallery.jsx'
import ShanghaiGallery from './ShanghaiGallery.jsx'

function Galleries() {
  const { t } = useLanguage()

  return (
    <PageLayout
      eyebrow={t('pages.gallery.eyebrow')}
      title={t('pages.gallery.title')}
      intro={t('pages.gallery.intro')}
    >
      <PhotoGallery
        folderKey="hero"
        title="Featured Moments"
        subtitle="Thomas & Maggie"
        id="featured-gallery"
      />
      <ProposalGallery />
      <ShanghaiGallery />
      <PhotoGallery
        folderKey="napa"
        title="Napa Wedding Gallery"
        subtitle="Our Celebrations"
        id="napa-wedding-gallery"
      />
      <PhotoGallery
        folderKey="hangzhou"
        title="Hangzhou Family Banquet Gallery"
        subtitle="Future Gallery"
        id="hangzhou-family-banquet-gallery"
      />
    </PageLayout>
  )
}

export default Galleries
