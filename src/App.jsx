import { useEffect, useState } from 'react'
import './App.css'
import { LanguageProvider } from './context/LanguageContext.jsx'
import WeatherProvider from './weather/WeatherProvider.jsx'
import { openMeteoProvider } from './weather/openMeteoProvider.js'
import Destination from './pages/Destination.jsx'
import Flights from './pages/Flights.jsx'
import Galleries from './pages/Galleries.jsx'
import Home from './pages/Home.jsx'
import Hotels from './pages/Hotels.jsx'
import Journal from './pages/Journal.jsx'
import Journey from './pages/Journey.jsx'
import JourneyMapPage from './pages/JourneyMapPage.jsx'

const routes = {
  '/': Home,
  '/journey': Journey,
  '/map': JourneyMapPage,
  '/hotels': Hotels,
  '/flights': Flights,
  '/gallery': Galleries,
  '/journal': Journal,
}

function getCurrentRoute() {
  return window.location.hash.slice(1) || '/'
}

function Router() {
  const [route, setRoute] = useState(getCurrentRoute)

  useEffect(() => {
    const handleRouteChange = () => {
      setRoute(getCurrentRoute())
      window.scrollTo({ top: 0, behavior: 'instant' })
    }

    window.addEventListener('hashchange', handleRouteChange)
    return () => window.removeEventListener('hashchange', handleRouteChange)
  }, [])

  const destinationMatch = route.match(/^\/destination\/([a-z-]+)$/)

  if (destinationMatch) {
    return <Destination destinationId={destinationMatch[1]} />
  }

  const Page = routes[route] || Home
  return <Page />
}

function App() {
  return (
    <WeatherProvider provider={openMeteoProvider}>
      <LanguageProvider>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <Router />
      </LanguageProvider>
    </WeatherProvider>
  )
}

export default App
