import PhotoGallery from '../components/PhotoGallery.jsx'

function ProposalGallery({ showHeader = true }) {
  return (
    <PhotoGallery
      folderKey="proposal"
      title="Proposal Gallery"
      subtitle="Our Story"
      id="proposal-gallery"
      showHeader={showHeader}
    />
  )
}

export default ProposalGallery
