import Timeline from '../components/Timeline.jsx'
import { journeyStops } from '../data/itinerary.js'

function Journey() {
  return <Timeline stops={journeyStops} />
}

export default Journey
