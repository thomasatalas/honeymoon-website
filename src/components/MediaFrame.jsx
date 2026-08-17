import { useState } from 'react'

export function MediaFrame({ image, fallbackEyebrow, fallbackTitle, className = '', eager = false }) {
  const [failed, setFailed] = useState(false)
  const showImage = image && !failed
  const accessibleName = image?.alt || `${fallbackTitle} visual`

  return (
    <div className={`media-frame ${className} ${showImage ? 'media-frame--loaded' : 'media-frame--fallback'}`.trim()}>
      {showImage ? (
        <img
          src={image.src}
          alt={image.alt}
          style={{ objectPosition: image.objectPosition || 'center' }}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={(event) => {
            event.currentTarget.hidden = true
            setFailed(true)
          }}
        />
      ) : (
        <div className="media-frame__fallback" role="img" aria-label={accessibleName}>
          <small>{fallbackEyebrow}</small>
          <strong>{fallbackTitle}</strong>
        </div>
      )}
    </div>
  )
}
