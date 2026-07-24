import mediaManifest from 'virtual:media-manifest'

const baseUrl = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`

function resolvePublicUrl(relativePath) {
  return `${baseUrl}${relativePath}`
}

export function getMediaCollection(collectionKey) {
  return (mediaManifest[collectionKey] || []).map(resolvePublicUrl)
}

export function getMediaCollections(collectionKeys) {
  return collectionKeys.flatMap(getMediaCollection)
}
