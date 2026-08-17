import { MediaFrame } from './MediaFrame.jsx'

export function EditorialMedia({ media, fallbackEyebrow, fallbackTitle, className = '' }) {
  if (!media) return null

  return (
    <section className={`editorial-media ${className}`.trim()} aria-label={`${media.owner} photography`}>
      <MediaFrame
        image={media.hero}
        fallbackEyebrow={fallbackEyebrow}
        fallbackTitle={fallbackTitle}
        className="editorial-media__hero"
      />
      <div className="editorial-media__support">
        <MediaFrame
          image={media.supporting}
          fallbackEyebrow="Detail"
          fallbackTitle={media.supporting.subject}
          className="editorial-media__support-image"
        />
        <div className="editorial-media__support-copy">
          <p>{media.supporting.subject}</p>
        </div>
      </div>
    </section>
  )
}
