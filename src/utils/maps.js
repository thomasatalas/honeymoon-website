export function createGoogleMapsSearchUrl(place, location) {
  const query = [place, location].filter(Boolean).join(', ')
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}
