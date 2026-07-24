import { getMediaCollection } from '../media/mediaLibrary.js'
import { createGoogleMapsSearchUrl } from '../utils/maps.js'

function JournalEntry({ entry, day }) {
  const photos = getMediaCollection(entry.photoCollection)

  return (
    <article className="journal-entry">
      <div className="journal-entry__marker" aria-hidden="true">
        <span>{String(day).padStart(2, '0')}</span>
      </div>
      <div className="journal-entry__card">
        <header className="journal-entry__header">
          <div>
            <p className="section-tag">Day {String(day).padStart(2, '0')} · {entry.date}</p>
            <h2>{entry.city}</h2>
          </div>
          <span className="journal-entry__mood">{entry.mood}</span>
        </header>

        <div className="journal-entry__body">
          <section>
            <h3>Itinerary</h3>
            <ol className="journal-entry__itinerary">
              {entry.itinerary.map((item) => <li key={item}>{item}</li>)}
            </ol>
          </section>
          <section>
            <h3>Restaurants</h3>
            <ul className="journal-entry__restaurants">
              {entry.restaurants.map((restaurant) => (
                <li key={restaurant}>
                  <span>{restaurant}</span>
                  <a href={createGoogleMapsSearchUrl(restaurant, entry.city)} target="_blank" rel="noreferrer">Open in Google Maps</a>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <blockquote>{entry.notes}</blockquote>

        {photos.length > 0 ? (
          <div className="journal-entry__photos">
            {photos.map((photo, index) => (
              <img
                key={photo}
                src={photo}
                alt={`${entry.city} journal ${index + 1}`}
                loading="lazy"
                decoding="async"
                width="1200"
                height="900"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            ))}
          </div>
        ) : (
          <div className="journal-entry__photo-empty">
            <span aria-hidden="true">◇</span>
            <p>Photographs will join this entry as the story unfolds.</p>
          </div>
        )}
      </div>
    </article>
  )
}

export default JournalEntry
