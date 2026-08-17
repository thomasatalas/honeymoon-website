import PhotoGallery from '../components/PhotoGallery.jsx'

function ShanghaiGallery({ showHeader = true }) {
  return (
    <PhotoGallery
      folderKey="shanghai"
      title="Shanghai Wedding Gallery"
      subtitle="Wedding Chapter"
      id="shanghai-gallery"
      showHeader={showHeader}
    />
  )
}

export default ShanghaiGallery
