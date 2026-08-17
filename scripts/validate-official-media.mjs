import { readdir, readFile, stat } from 'node:fs/promises'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { flightEditorialCopy, openingJourney } from '../src/data/flightPresentation.js'
import { officialFlightMedia, officialHotelMedia } from '../src/data/officialMedia.js'
import { officialMediaRegistry } from './official-media-registry.mjs'

const projectRoot = fileURLToPath(new URL('../', import.meta.url))
const productionDirectory = fileURLToPath(new URL('../public/assets/official-media', import.meta.url))
const expectedUsageDecision = 'Approved by site owner for personal honeymoon website'
const publicCollections = [...Object.values(officialHotelMedia), ...Object.values(officialFlightMedia)]
const publicImages = publicCollections.flatMap(({ owner, hero, supporting }) => [
  { ...hero, owner, role: 'hero' },
  { ...supporting, owner, role: 'supporting' },
])
const errors = []

function jpegDimensions(buffer) {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) return null
  let offset = 2
  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1
      continue
    }
    const marker = buffer[offset + 1]
    const segmentLength = buffer.readUInt16BE(offset + 2)
    if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
      return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) }
    }
    if (segmentLength < 2) return null
    offset += 2 + segmentLength
  }
  return null
}

const registryByFilename = new Map(officialMediaRegistry.map((item) => [item.filename, item]))
if (registryByFilename.size !== officialMediaRegistry.length) errors.push('Private media-registry filenames must be unique.')
if (publicImages.length !== 16 || officialMediaRegistry.length !== 16) errors.push('Expected exactly 16 production images and registry records.')

for (const item of publicImages) {
  const registryItem = registryByFilename.get(item.filename)
  if (!registryItem) {
    errors.push(`${item.filename} is missing its private provenance record.`)
    continue
  }

  if (registryItem.subject !== item.subject || registryItem.owner !== item.owner || registryItem.role !== item.role) {
    errors.push(`${item.filename} does not match its selected subject, owner or role.`)
  }
  if (!item.alt || item.alt.length < 12) errors.push(`${item.filename} needs concise descriptive alt text.`)
  if (!registryItem.sourceUrl?.startsWith('https://') || !registryItem.originalAssetUrl?.startsWith('https://')) errors.push(`${item.filename} is missing private HTTPS provenance.`)
  if (registryItem.usageDecision !== expectedUsageDecision) errors.push(`${item.filename} has an incorrect usage-decision record.`)
  if (!registryItem.reviewDate || !registryItem.aircraftProductContext) errors.push(`${item.filename} is missing review date or context.`)

  const assetPath = fileURLToPath(new URL(`../public${item.src}`, import.meta.url))
  try {
    const metadata = await stat(assetPath)
    if (metadata.size === 0) errors.push(`${item.filename} is zero bytes.`)
    const buffer = await readFile(assetPath)
    const dimensions = jpegDimensions(buffer)
    if (!dimensions) errors.push(`${item.filename} is not a valid JPEG.`)
    else {
      const minimumWidth = item.role === 'hero' ? 1000 : 700
      if (dimensions.width < minimumWidth) errors.push(`${item.filename} is ${dimensions.width}px wide; expected at least ${minimumWidth}px.`)
      if (dimensions.height < 400) errors.push(`${item.filename} is only ${dimensions.height}px high.`)
    }

    const decode = spawnSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', assetPath], { encoding: 'utf8' })
    if (decode.error || decode.status !== 0) errors.push(`${item.filename} failed the native image decode check.`)

    const ignored = spawnSync('git', ['check-ignore', '--quiet', assetPath], { cwd: projectRoot })
    if (ignored.status === 0) errors.push(`${item.filename} is still ignored by Git.`)
  } catch (error) {
    errors.push(`${item.filename} cannot be read: ${error.message}`)
  }
}

const productionFiles = (await Promise.all(['hotels', 'flights'].map(async (folder) => {
  const names = await readdir(`${productionDirectory}/${folder}`)
  return names.filter((name) => name.toLowerCase().endsWith('.jpg'))
}))).flat()
const expectedFiles = new Set(publicImages.map(({ filename }) => filename))
for (const filename of productionFiles) if (!expectedFiles.has(filename)) errors.push(`Unexpected production asset: ${filename}`)
for (const filename of expectedFiles) if (!productionFiles.includes(filename)) errors.push(`Manifest asset missing from production folders: ${filename}`)

const publicMediaSource = await readFile(`${projectRoot}/src/data/officialMedia.js`, 'utf8')
if (/https?:\/\//.test(publicMediaSource)) errors.push('Official source URLs must remain outside the client media configuration.')

const temporaryPath = ['official', 'media', 'local'].join('-')
for (const file of ['.gitignore', 'package.json', 'src/data/officialMedia.js', 'src/components/EditorialMedia.jsx', 'src/components/HotelCard.jsx', 'src/components/FlightCard.jsx']) {
  const contents = await readFile(`${projectRoot}/${file}`, 'utf8')
  if (contents.includes(temporaryPath)) errors.push(`${file} still references the temporary media path.`)
}

const publicCopy = [
  ...publicImages.flatMap(({ subject, alt }) => [subject, alt]),
  ...Object.values(flightEditorialCopy),
  ...Object.values(openingJourney),
].join('\n')
const workInProgressTerms = ['pending', 'provisional', 'representative', 'unconfirmed', 'not confirmed', 'not yet verified', 'permission required']
for (const term of workInProgressTerms) {
  if (publicCopy.toLowerCase().includes(term)) errors.push(`Public media copy contains work-in-progress wording: ${term}`)
}

if (errors.length) {
  console.error(errors.map((error) => `ERROR: ${error}`).join('\n'))
  process.exit(1)
}

console.log(`Media integrity valid: ${publicImages.length} production JPEGs, ${officialMediaRegistry.length} private provenance records, native decoding, dimensions, copy and Git-ignore checks passed.`)
