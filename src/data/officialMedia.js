const asset = (folder, filename) => `/assets/official-media/${folder}/${filename}`

const image = (folder, filename, subject, alt, objectPosition = 'center') => ({
  filename,
  src: asset(folder, filename),
  subject,
  alt,
  objectPosition,
})

export const officialHotelMedia = {
  amsterdam: {
    owner: 'Waldorf Astoria Amsterdam',
    hero: image('hotels', 'waldorf-amsterdam-garden.jpg', 'Private garden and canal houses', 'Private garden at Waldorf Astoria Amsterdam with tulips and historic canal houses', 'center 48%'),
    supporting: image('hotels', 'waldorf-amsterdam-peacock-alley.jpg', 'Peacock Alley', 'Peacock Alley lounge at Waldorf Astoria Amsterdam'),
  },
  munich: {
    owner: 'Andaz Munich Schwabinger Tor',
    hero: image('hotels', 'andaz-munich-muniqo-rooftop.jpg', 'M’Uniqo rooftop interior', 'M’Uniqo rooftop interior at Andaz Munich with panoramic city views', 'center 46%'),
    supporting: image('hotels', 'andaz-munich-spa-pool.jpg', 'Spa pool', 'Spa pool at Andaz Munich with panoramic windows', 'center 36%'),
  },
  nice: {
    owner: 'Hôtel Palais de la Méditerranée',
    hero: image('hotels', 'palais-nice-pool-terrace.jpg', 'Indoor–outdoor pool terrace', 'Indoor–outdoor pool terrace at Hôtel Palais de la Méditerranée', 'center 45%'),
    supporting: image('hotels', 'palais-nice-executive-suite.jpg', 'Executive Suite', 'Executive Suite at Hôtel Palais de la Méditerranée'),
  },
  singapore: {
    owner: 'Grand Hyatt Singapore',
    hero: image('hotels', 'grand-hyatt-singapore-waterfall.jpg', 'Cascading waterfall', 'Cascading waterfall and lush greenery at Grand Hyatt Singapore', 'center 38%'),
    supporting: image('hotels', 'grand-hyatt-singapore-grand-suite.jpg', 'Grand Suite', 'Grand Suite living room at Grand Hyatt Singapore'),
  },
}

export const officialFlightMedia = {
  emirates: {
    owner: 'Emirates',
    hero: image('flights', 'emirates-a380-dubai.jpg', 'Emirates A380 at Dubai International Airport', 'Emirates Airbus A380 taxiing at Dubai International Airport'),
    supporting: image('flights', 'emirates-a380-shower-spa.jpg', 'A380 Shower Spa', 'Emirates A380 First Class Shower Spa', 'center 54%'),
  },
  lufthansa: {
    owner: 'Lufthansa',
    hero: image('flights', 'lufthansa-a320neo-munich-2020.jpg', 'Munich-based Airbus A320neo', 'Lufthansa Airbus A320neo in standard livery at Munich Airport', 'center 58%'),
    supporting: image('flights', 'lufthansa-a320neo-fleet.jpg', 'Airbus A320neo', 'Lufthansa Airbus A320neo in standard livery', 'center 54%'),
  },
  qatar: {
    owner: 'Qatar Airways',
    hero: image('flights', 'qatar-a350-1000.jpg', 'Airbus A350-1000', 'Qatar Airways Airbus A350-1000 in flight', 'center 48%'),
    supporting: image('flights', 'qatar-qsuite-qr948.jpg', 'Qsuite', 'Qatar Airways Qsuite with privacy door and cabin surround', 'center 47%'),
  },
  cathay: {
    owner: 'Cathay Pacific',
    hero: image('flights', 'cathay-aria-suite.jpg', 'Aria Suite', 'Cathay Pacific Aria Suite cabin with wraparound seats and privacy doors', 'center 52%'),
    supporting: image('flights', 'cathay-777-exterior.jpg', 'Cathay Pacific', 'Cathay Pacific Boeing 777 flying above Hong Kong', 'center 48%'),
  },
}
