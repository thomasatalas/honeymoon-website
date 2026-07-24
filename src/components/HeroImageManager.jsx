import { useEffect, useState } from 'react'

const heroImageImports = import.meta.glob('../assets/photos/hero/*', {
  eager: false,
  import: 'default',
})

function HeroImageManager() {
  const [imageSrc, setImageSrc] = useState(null)
  const [hasImages, setHasImages] = useState(false)

  useEffect(() => {
    let isMounted = true

    const loadRandomImage = async () => {
      const imageEntries = Object.entries(heroImageImports)

      if (imageEntries.length === 0) {
        if (isMounted) {
          setHasImages(false)
          setImageSrc(null)
        }

        return
      }

      const randomIndex = Math.floor(Math.random() * imageEntries.length)
      const imageModule = imageEntries[randomIndex][1]
      const resolvedSrc = await imageModule()

      if (isMounted) {
        setHasImages(true)
        setImageSrc(resolvedSrc)
      }
    }

    loadRandomImage()

    return () => {
      isMounted = false
    }
  }, [])

  if (!hasImages || !imageSrc) {
    return <div className="hero-image-placeholder" aria-hidden="true">Luxury Photo Placeholder</div>
  }

  return <img className="hero-image-manager" src={imageSrc} alt="Hero travel moment" />
}

export default HeroImageManager
