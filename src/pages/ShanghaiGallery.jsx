import PhotoGallery from '../components/PhotoGallery.jsx'

function ShanghaiGallery({ showHeader = true }) {
  return (
    <PhotoGallery
      folderKey="shanghai"
      title="Shanghai Family Banquet Gallery"
      subtitle="Our Celebrations"
      id="shanghai-gallery"
      showHeader={showHeader}
    />
  )
}

export default ShanghaiGallery
