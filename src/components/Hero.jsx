function Hero() {
  return (
    <section id="journey" className="hero-section" aria-label="Luxury honeymoon hero">
      <div className="animated-background" aria-hidden="true">
        <span className="bg-orb orb-left" />
        <span className="bg-orb orb-right" />
        <span className="grid-line grid-line-1" />
        <span className="grid-line grid-line-2" />
      </div>

      <div className="hero-content">
        <p className="eyebrow">A Journey of a Lifetime</p>
        <h1>Thomas &amp; Maggie</h1>
        <p className="subtitle">Europe &amp; Singapore Honeymoon</p>
        <p className="dates">September 27 – October 12, 2026</p>
        <button type="button" className="journey-button">
          Begin Our Journey
        </button>
      </div>
    </section>
  )
}

export default Hero
