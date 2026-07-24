import { useEffect } from 'react'

function Navbar() {
  useEffect(() => {
    const nav = document.querySelector('.top-nav')

    const onScroll = () => {
      nav.classList.toggle('nav-scrolled', window.scrollY > 24)
    }

    onScroll()
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="top-nav">
      <div className="brand-mark">Thomas &amp; Maggie</div>
      <nav className="nav-links" aria-label="Primary navigation">
        <a href="#journey">Journey</a>
        <a href="#destinations">Destinations</a>
        <a href="#hotels">Hotels</a>
        <a href="#flights">Flights</a>
        <a href="#journal">Journal</a>
      </nav>
    </header>
  )
}

export default Navbar
