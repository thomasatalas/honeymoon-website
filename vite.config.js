import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs'
import path from 'node:path'

const virtualMediaModuleId = 'virtual:media-manifest'
const resolvedVirtualMediaModuleId = `\0${virtualMediaModuleId}`
const browserImageExtensions = new Set(['.avif', '.gif', '.jpeg', '.jpg', '.png', '.svg', '.webp'])

function createMediaManifestPlugin() {
  let assetsDirectory
  let outputDirectory
  let publicDirectory

  function createManifest() {
    const collections = {}

    function visitDirectory(directory) {
      const entries = readdirSync(directory, { withFileTypes: true })
        .filter((entry) => !entry.name.startsWith('.'))
        .sort((first, second) => first.name.localeCompare(second.name, undefined, { numeric: true }))

      entries.forEach((entry) => {
        const absolutePath = path.join(directory, entry.name)

        if (entry.isDirectory()) {
          if (directory === assetsDirectory && entry.name === 'optimized') return
          visitDirectory(absolutePath)
          return
        }

        if (!entry.isFile() || !browserImageExtensions.has(path.extname(entry.name).toLowerCase())) {
          return
        }

        const relativePath = path.relative(assetsDirectory, absolutePath)
        const collectionKey = path.dirname(relativePath).split(path.sep).join('/')
        const optimizedPath = path.join(assetsDirectory, 'optimized', relativePath)
        const deliveredPath = existsSync(optimizedPath)
          ? path.join('optimized', relativePath)
          : relativePath
        const publicPath = ['assets', ...deliveredPath.split(path.sep)]
          .map((segment) => encodeURIComponent(segment))
          .join('/')

        collections[collectionKey] ??= []
        collections[collectionKey].push(publicPath)
      })
    }

    visitDirectory(assetsDirectory)
    return collections
  }

  return {
    name: 'honeymoon-media-manifest',
    configResolved(config) {
      publicDirectory = config.publicDir
      assetsDirectory = path.resolve(config.publicDir, 'assets')
      outputDirectory = path.resolve(config.root, config.build.outDir)
    },
    resolveId(id) {
      return id === virtualMediaModuleId ? resolvedVirtualMediaModuleId : null
    },
    load(id) {
      if (id !== resolvedVirtualMediaModuleId) return null
      return `export default ${JSON.stringify(createManifest())}`
    },
    writeBundle() {
      const copyPublicFile = (relativePath) => {
        const source = path.resolve(publicDirectory, relativePath)
        const destination = path.resolve(outputDirectory, relativePath)
        mkdirSync(path.dirname(destination), { recursive: true })
        copyFileSync(source, destination)
      }

      readdirSync(publicDirectory, { withFileTypes: true })
        .filter((entry) => entry.isFile() && !entry.name.startsWith('.'))
        .forEach((entry) => copyPublicFile(entry.name))

      Object.values(createManifest())
        .flat()
        .forEach((publicPath) => copyPublicFile(decodeURIComponent(publicPath)))
    },
    configureServer(server) {
      server.watcher.add(assetsDirectory)

      const refreshMediaManifest = (filePath) => {
        const relativePath = path.relative(assetsDirectory, filePath)

        if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) return

        const mediaModule = server.moduleGraph.getModuleById(resolvedVirtualMediaModuleId)
        if (mediaModule) server.moduleGraph.invalidateModule(mediaModule)
        server.ws.send({ type: 'full-reload' })
      }

      server.watcher.on('add', refreshMediaManifest)
      server.watcher.on('unlink', refreshMediaManifest)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), createMediaManifestPlugin()],
  build: {
    copyPublicDir: false,
  },
})
