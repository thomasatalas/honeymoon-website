import { useEffect, useState } from 'react'
import { useLanguage } from '../context/LanguageContext.jsx'

const navigationItems = [
  { path: '/', translationKey: 'nav.home' },
  { path: '/journey', translationKey: 'nav.journey' },
  { path: '/map', translationKey: 'nav.map' },
  { path: '/hotels', translationKey: 'nav.hotels' },
  { path: '/flights', translationKey: 'nav.flights' },
  { path: '/gallery', translationKey: 'nav.gallery' },
  { path: '/journal', translationKey: 'nav.journal' },
]

function getCurrentPath() {
  return window.location.hash.slice(1) || '/'
}

function Navbar() {
  const { t } = useLanguage()
  const [currentPath, setCurrentPath] = useState(getCurrentPath)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const nav = document.querySelector('.top-nav')

    const onScroll = () => {
      nav?.classList.toggle('nav-scrolled', window.scrollY > 24)
    }
    const onRouteChange = () => {
      setCurrentPath(getCurrentPath())
      setMenuOpen(false)
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    onScroll()
    window.addEventListener('scroll', onScroll)
    window.addEventListener('hashchange', onRouteChange)
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('hashchange', onRouteChange)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return (
    <header className="top-nav">
      <a className="brand-mark" href="#/">{t('brandName')}</a>
      <div className="nav-right">
        <button
          className="mobile-menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
        <nav id="primary-navigation" className={`nav-links${menuOpen ? ' is-open' : ''}`} aria-label="Primary navigation">
          {navigationItems.map((item) => (
            <a
              key={item.path}
              href={`#${item.path}`}
              className={currentPath === item.path ? 'active' : ''}
              aria-current={currentPath === item.path ? 'page' : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {t(item.translationKey)}
            </a>
          ))}
        </nav>
        {/* LanguageSwitcher is intentionally hidden until the Chinese experience is comprehensive. */}
      </div>
    </header>
  )
}

export default Navbar
