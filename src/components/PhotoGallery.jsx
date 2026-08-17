import { useEffect, useState } from 'react'
import { getMediaCollection } from '../media/mediaLibrary.js'

function PhotoGallery({ folderKey, title, subtitle, id, showHeader = true }) {
  const images = getMediaCollection(folderKey)
  const [selectedIndex, setSelectedIndex] = useState(null)

  useEffect(() => {
    if (selectedIndex === null) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedIndex(null)
      if (event.key === 'ArrowRight') {
        setSelectedIndex((current) => (current + 1) % images.length)
      }
      if (event.key === 'ArrowLeft') {
        setSelectedIndex((current) => (current - 1 + images.length) % images.length)
      }
    }

    document.body.classList.add('lightbox-open')
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.classList.remove('lightbox-open')
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [images.length, selectedIndex])

  return (
    <section id={id} className="gallery-section" aria-label={title}>
      {showHeader && (
        <div className="timeline-header">
          <p className="section-tag">{subtitle}</p>
          <h2>{title}</h2>
        </div>
      )}

      {images.length === 0 ? (
        <div className="gallery-placeholder-card">
          <span>Photos coming soon.</span>
        </div>
      ) : (
        <div className="gallery-grid">
          {images.map((imageSource, index) => (
            <figure key={`${folderKey}-${index}`} className="gallery-card">
              <button type="button" onClick={() => setSelectedIndex(index)}>
                <img
                  src={imageSource}
                  alt={`${title} ${index + 1}`}
                  loading="lazy"
                  decoding="async"
                  width="1200"
                  height="900"
                  sizes="(max-width: 640px) 100vw, (max-width: 820px) 50vw, 33vw"
                />
                <span>View photograph</span>
              </button>
            </figure>
          ))}
        </div>
      )}

      {selectedIndex !== null && (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={`${title} photograph`}>
          <button className="gallery-lightbox__backdrop" type="button" onClick={() => setSelectedIndex(null)} aria-label="Close gallery" />
          <div className="gallery-lightbox__content">
            <img src={images[selectedIndex]} alt={`${title} ${selectedIndex + 1}`} decoding="async" />
            <p>{title} · {selectedIndex + 1} / {images.length}</p>
            <button className="gallery-lightbox__close" type="button" onClick={() => setSelectedIndex(null)} aria-label="Close gallery" autoFocus>×</button>
            <button
              className="gallery-lightbox__previous"
              type="button"
              onClick={() => setSelectedIndex((selectedIndex - 1 + images.length) % images.length)}
              aria-label="Previous photograph"
            >
              ‹
            </button>
            <button
              className="gallery-lightbox__next"
              type="button"
              onClick={() => setSelectedIndex((selectedIndex + 1) % images.length)}
              aria-label="Next photograph"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default PhotoGallery
