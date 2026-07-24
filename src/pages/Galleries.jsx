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
    </PageLayout>
  )
}

export default Galleries
