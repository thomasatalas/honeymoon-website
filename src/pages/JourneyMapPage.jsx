import JourneyMap from '../components/JourneyMap.jsx'
import Navbar from '../components/Navbar.jsx'
import { journeyMapSegments, journeyMapStops } from '../data/journeyMap.js'

function JourneyMapPage() {
  return (
    <div className="page-shell journey-map-page">
      <Navbar />
      <main id="main-content" tabIndex="-1">
        <JourneyMap stops={journeyMapStops} segments={journeyMapSegments} />
      </main>
    </div>
  )
}

export default JourneyMapPage
