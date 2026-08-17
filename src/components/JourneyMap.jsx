import { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { createGoogleMapsSearchUrl } from '../utils/maps.js'

const MAP_TILE_URL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'

function wrapLongitude(longitude) {
  return ((longitude + 180) % 360 + 360) % 360 - 180
}

function createArcPaths(start, end, isFlight) {
  if (!isFlight) return [[[...start], [...end]]]

  const pointCount = 48
  let longitudeDelta = end[1] - start[1]

  if (longitudeDelta > 180) longitudeDelta -= 360
  if (longitudeDelta < -180) longitudeDelta += 360

  const latitudeArc = Math.min(18, Math.max(4, Math.abs(longitudeDelta) * 0.1))
  const unwrappedPoints = Array.from({ length: pointCount + 1 }, (_, index) => {
    const progress = index / pointCount
    const latitude = start[0] + (end[0] - start[0]) * progress + Math.sin(Math.PI * progress) * latitudeArc
    const longitude = start[1] + longitudeDelta * progress
    return [Math.min(latitude, 78), longitude]
  })

  const paths = [[]]

  unwrappedPoints.forEach(([latitude, longitude], index) => {
    const wrappedLongitude = wrapLongitude(longitude)
    const activePath = paths.at(-1)
    const previousPoint = activePath.at(-1)

    if (index > 0 && previousPoint && Math.abs(previousPoint[1] - wrappedLongitude) > 180) {
      const previousBoundary = previousPoint[1] > 0 ? 180 : -180
      const nextBoundary = previousBoundary === 180 ? -180 : 180
      activePath.push([latitude, previousBoundary])
      paths.push([[latitude, nextBoundary], [latitude, wrappedLongitude]])
      return
    }

    activePath.push([latitude, wrappedLongitude])
  })

  return paths
}

function createMarkerIcon(stop, sequence) {
  return L.divIcon({
    className: 'journey-map-marker-wrapper',
    html: `
      <span class="journey-map-marker journey-map-marker--${stop.stopType}">
        <span class="journey-map-marker__pulse"></span>
        <span class="journey-map-marker__dot"></span>
        <span class="journey-map-marker__label"><small>${String(sequence).padStart(2, '0')}</small>${stop.city}</span>
      </span>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  })
}

function JourneyMap({ stops, segments }) {
  const mapElementRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const [selectedStop, setSelectedStop] = useState(null)

  useEffect(() => {
    if (!mapElementRef.current || mapInstanceRef.current) return undefined

    const map = L.map(mapElementRef.current, {
      zoomControl: false,
      minZoom: 2,
      maxZoom: 12,
      worldCopyJump: true,
      preferCanvas: false,
    })

    mapInstanceRef.current = map

    L.tileLayer(MAP_TILE_URL, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map)

    L.control.zoom({ position: 'bottomright' }).addTo(map)

    const stopById = new Map(stops.map((stop) => [stop.id, stop]))

    segments.forEach((segment) => {
      const start = stopById.get(segment.from)
      const end = stopById.get(segment.to)
      if (!start || !end) return

      createArcPaths(start.coordinates, end.coordinates, segment.type === 'flight').forEach((path) => {
        L.polyline(path, {
          className: `journey-route-line journey-route-line--${segment.type}`,
          color: segment.type === 'flight' ? '#d9b76f' : '#7ec2c8',
          weight: segment.type === 'flight' ? 2.2 : 3.2,
          opacity: 0.9,
          dashArray: segment.type === 'flight' ? '9 13' : undefined,
          lineCap: 'round',
          lineJoin: 'round',
        }).addTo(map)
      })
    })

    stops.forEach((stop, index) => {
      L.marker(stop.coordinates, {
        icon: createMarkerIcon(stop, index + 1),
        title: stop.city,
        keyboard: true,
        alt: `Open ${stop.city} journey details`,
      })
        .addTo(map)
        .on('click', () => {
          setSelectedStop(stop)
          map.flyTo(stop.coordinates, Math.max(map.getZoom(), 4), { duration: 0.9 })
        })
    })

    map.fitBounds(L.latLngBounds(stops.map((stop) => stop.coordinates)), {
      padding: [50, 50],
      maxZoom: 3,
    })

    const invalidateSize = () => map.invalidateSize({ pan: false })
    window.addEventListener('resize', invalidateSize)

    return () => {
      window.removeEventListener('resize', invalidateSize)
      map.remove()
      mapInstanceRef.current = null
    }
  }, [segments, stops])

  return (
    <section className="journey-map" aria-label="Interactive honeymoon journey map">
      <div ref={mapElementRef} className="journey-map__canvas" />

      <header className="journey-map__header">
        <p>The Grand Route</p>
        <h1>San Francisco to Ningbo</h1>
        <span>Nine route points · Four hotel stays · One complete honeymoon journey</span>
      </header>

      <div className="journey-map__legend" aria-label="Map legend">
        <span><i className="legend-flight" /> Flights</span>
        <span><i className="legend-stay" /> Hotel stays</span>
      </div>

      {selectedStop && (
        <aside className="journey-map-card" aria-live="polite">
          <button type="button" className="journey-map-card__close" onClick={() => setSelectedStop(null)} aria-label="Close city details">×</button>
          <p className="section-tag">{selectedStop.country}</p>
          <h2>{selectedStop.city}</h2>
          <div className="journey-map-card__dates">
            <div><span>Arrival</span><strong>{selectedStop.arrival}</strong></div>
            <div><span>Departure</span><strong>{selectedStop.departure}</strong></div>
          </div>
          <dl className="journey-map-card__stay">
            <div><dt>{selectedStop.nights > 0 ? 'Hotel' : 'Journey role'}</dt><dd>{selectedStop.hotel}</dd></div>
            <div><dt>Nights</dt><dd>{selectedStop.nights || 'Transit'}</dd></div>
            <div><dt>Flights & transfers</dt><dd>{selectedStop.flights.join(' · ')}</dd></div>
          </dl>
          <div className="journey-map-card__links">
            {selectedStop.nights > 0 && (
              <a href={createGoogleMapsSearchUrl(selectedStop.hotel, selectedStop.city)} target="_blank" rel="noreferrer">Hotel map <span aria-hidden="true">↗</span></a>
            )}
            <a href="#/journal">Open journal <span aria-hidden="true">→</span></a>
            <a href="#/gallery">View gallery <span aria-hidden="true">→</span></a>
          </div>
        </aside>
      )}

      {!selectedStop && <p className="journey-map__hint">Select a city to explore the chapter</p>}
    </section>
  )
}

export default JourneyMap
