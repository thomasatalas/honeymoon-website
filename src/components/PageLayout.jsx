import Footer from './Footer.jsx'
import Navbar from './Navbar.jsx'

function PageLayout({ eyebrow, title, intro, children }) {
  return (
    <div className="page-shell inner-page-shell">
      <Navbar />
      <main id="main-content" tabIndex="-1">
        <header className="inner-page-hero">
          <div className="inner-page-hero__glow" aria-hidden="true" />
          <div className="inner-page-hero__content">
            <p className="section-tag">{eyebrow}</p>
            <h1>{title}</h1>
            {intro && <p>{intro}</p>}
          </div>
        </header>
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default PageLayout
