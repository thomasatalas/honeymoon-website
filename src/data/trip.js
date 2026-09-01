const maps = (query) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`

const activity = (title, location, status, details = {}) => ({
  title,
  location,
  status,
  mapUrl: maps(`${location}`),
  ...details,
})

export const trip = {
  title: 'Thomas & Maggie · Honeymoon 2026',
  startDate: '2026-09-24',
  endDate: '2026-10-13',
  statusLabels: ['Confirmed', 'Reserve', 'Optional', 'Tentative', 'Awaiting input'],
  transportation: [
    {
      id: 'sfo-dxb', mode: 'Flight', route: 'San Francisco → Dubai', carrier: 'Emirates', number: 'EK226', cabin: 'First Class', aircraft: 'Airbus A380',
      departure: { airport: 'San Francisco International Airport', terminal: 'International Terminal', date: '2026-09-24', time: '17:00' },
      arrival: { airport: 'Dubai International Airport', terminal: 'Terminal 3', date: '2026-09-25', time: '20:00' },
      duration: '16 hr', status: 'Confirmed',
      guidance: 'First Class reward travel is confirmed; private reference, seating and account details are intentionally not published.',
    },
    {
      id: 'dxb-ams', mode: 'Flight', route: 'Dubai → Amsterdam', carrier: 'Emirates', number: 'EK145', cabin: 'First Class', aircraft: 'Boeing 777',
      departure: { airport: 'Dubai International Airport', terminal: 'Terminal 3', date: '2026-09-26', time: '03:40' },
      arrival: { airport: 'Amsterdam Schiphol', terminal: null, date: '2026-09-26', time: '09:20' },
      duration: '7 hr 40 min', status: 'Confirmed',
      guidance: 'Arrive Saturday morning, then use the Hyatt Regency prelude night before the Waldorf Astoria stay begins.',
    },
    {
      id: 'ams-muc',
      mode: 'Flight',
      date: '2026-09-30',
      route: 'Amsterdam → Munich',
      carrier: 'Lufthansa',
      number: 'LH2305',
      cabin: 'Economy (X)',
      departure: { airport: 'Amsterdam Schiphol', date: '2026-09-30', time: '15:40' },
      arrival: { airport: 'Munich Airport', date: '2026-09-30', time: '17:05' },
      duration: '1 hr 25 min',
      status: 'Confirmed',
      guidance: 'Reach Schiphol around 12:45–1:00 PM and verify live check-in guidance the day before.',
    },
    {
      id: 'muc-nce',
      mode: 'Flight',
      date: '2026-10-04',
      route: 'Munich → Nice',
      carrier: 'Lufthansa',
      number: 'LH2278',
      cabin: 'Economy',
      aircraft: 'Airbus A320neo',
      departure: { airport: 'Munich Airport', date: '2026-10-04', time: '19:25' },
      arrival: { airport: 'Nice Côte d’Azur', date: '2026-10-04', time: '20:55' },
      duration: '1 hr 30 min',
      status: 'Confirmed',
      guidance: 'Return the SIXT car by 3:00 PM, then continue to the terminal for the evening flight.',
    },
    {
      id: 'nce-doh',
      mode: 'Flight',
      date: '2026-10-08',
      route: 'Nice → Doha',
      carrier: 'Qatar Airways',
      number: 'QR56',
      cabin: 'Business Class',
      aircraft: 'Airbus A350-900',
      departure: { airport: 'Nice Côte d’Azur', terminal: 'Terminal 1', date: '2026-10-08', time: '15:55' },
      arrival: { airport: 'Hamad International Airport', terminal: null, date: '2026-10-08', time: null },
      duration: null,
      status: 'Confirmed',
      guidance: 'Leave the Nice hotel around 12:30–12:45 PM after checkout and a light lunch.',
    },
    {
      id: 'doh-sin', mode: 'Flight', date: '2026-10-09', route: 'Doha → Singapore', carrier: 'Qatar Airways', number: 'QR948', cabin: 'Business Class', aircraft: 'Airbus A350-1000',
      departure: { airport: 'Hamad International Airport', terminal: null, date: '2026-10-09', time: null },
      arrival: { airport: 'Singapore Changi Airport', terminal: 'Terminal 1', date: '2026-10-09', time: '15:45' },
      duration: null, status: 'Confirmed',
      guidance: 'The complete Nice–Doha–Singapore itinerary is 17 hr 50 min; segment and connection timings are not separately published in the supplied public-safe details.',
    },
    {
      id: 'sin-hkg',
      mode: 'Flight',
      date: '2026-10-13',
      route: 'Singapore → Hong Kong',
      carrier: 'Cathay Pacific',
      number: 'CX714',
      cabin: 'Business Class',
      departure: { airport: 'Singapore Changi Airport', terminal: 'Terminal 4', date: '2026-10-13', time: '01:45' },
      arrival: { airport: 'Hong Kong International Airport', terminal: 'Terminal 1', date: '2026-10-13', time: '05:50' },
      duration: '4 hr 5 min',
      status: 'Confirmed',
      guidance: 'Transfer from Jewel/Terminal 1 to Terminal 4 at 9:45 PM and begin check-in by 10:45 PM.',
    },
    {
      id: 'hkg-ngb', mode: 'Flight', date: '2026-10-13', route: 'Hong Kong → Ningbo', carrier: 'Cathay Pacific', number: 'CX956', cabin: 'Business Class', aircraft: null,
      departure: { airport: 'Hong Kong International Airport', terminal: 'Terminal 1', date: '2026-10-13', time: '11:00' },
      arrival: { airport: 'Ningbo Lishe International Airport', terminal: 'Terminal 2', date: '2026-10-13', time: '13:20' },
      duration: '2 hr 20 min', status: 'Confirmed',
      guidance: 'Allow 5 hr 10 min in Hong Kong between the scheduled arrival of CX714 and departure of CX956.',
    },
  ],
  transitLocations: [
    { id: 'san-francisco', city: 'San Francisco', country: 'United States', coordinates: [37.6213, -122.379], connectionIds: ['sfo-dxb'], label: 'Journey origin', stopType: 'origin' },
    { id: 'dubai', city: 'Dubai', country: 'United Arab Emirates', coordinates: [25.2532, 55.3657], connectionIds: ['sfo-dxb', 'dxb-ams'], label: 'Emirates connection' },
    { id: 'doha', city: 'Doha', country: 'Qatar', coordinates: [25.2731, 51.6081], connectionIds: ['nce-doh', 'doh-sin'], label: 'Qatar Airways connection' },
    { id: 'hong-kong', city: 'Hong Kong', country: 'China', coordinates: [22.3193, 114.1694], connectionIds: ['sin-hkg', 'hkg-ngb'], label: 'Cathay Pacific connection' },
    { id: 'ningbo', city: 'Ningbo', country: 'China', coordinates: [29.8267, 121.4619], connectionIds: ['hkg-ngb'], label: 'Final destination', stopType: 'final' },
  ],
  destinations: [
    {
      id: 'amsterdam',
      city: 'Amsterdam',
      country: 'Netherlands',
      dates: 'September 26–30',
      dateRange: { start: '2026-09-26', end: '2026-09-30' },
      coordinates: { latitude: 52.3676, longitude: 4.9041 },
      appearance: { side: 'left', variant: 'amsterdam' },
      arrivalConnectionId: 'dxb-ams',
      departureConnectionId: 'ams-muc',
      hotel: {
        name: 'Waldorf Astoria Amsterdam',
        suite: null,
        checkIn: 'September 27 · after Hyatt checkout', checkInDate: '2026-09-27',
        checkOut: 'September 30 · before lunch', checkOutDate: '2026-09-30',
        nights: 3,
        status: 'Confirmed',
        description: 'A quiet canal-side base with a garden and pool.',
        highlights: ['Herengracht location', 'Garden and pool', 'Walkable canal neighborhoods'],
      },
      stays: [
        {
          name: 'Hyatt Regency Amsterdam',
          suite: null,
          checkIn: 'September 26 · 3:00 PM',
          checkInDate: '2026-09-26',
          checkOut: 'September 27 · 12:00 PM',
          checkOutDate: '2026-09-27',
          nights: 1,
          status: 'Confirmed',
          description: 'A practical Amsterdam East landing point before the canal-side Waldorf stay.',
          highlights: ['Amsterdam East base', 'One-night arrival reset', 'Friend pickup and city prelude'],
          variant: 'amsterdam-hyatt',
          destinationId: 'amsterdam',
          mapUrl: maps('Hyatt Regency Amsterdam'),
          googleMapsQuery: 'Hyatt Regency Amsterdam',
        },
        {
          name: 'Waldorf Astoria Amsterdam',
          suite: null,
          checkIn: 'September 27 · after Hyatt checkout',
          checkInDate: '2026-09-27',
          checkOut: 'September 30 · before lunch',
          checkOutDate: '2026-09-30',
          nights: 3,
          status: 'Confirmed',
          description: 'A quiet canal-side base with a garden and pool.',
          highlights: ['Herengracht location', 'Garden and pool', 'Walkable canal neighborhoods'],
          variant: 'amsterdam',
          destinationId: 'amsterdam',
          mapUrl: maps('Waldorf Astoria Amsterdam'),
          googleMapsQuery: 'Waldorf Astoria Amsterdam',
        },
      ],
      journey: {
        arrivalContext: 'Emirates from Dubai',
        arrivalTransfer: 'Amsterdam Schiphol → Hyatt Regency Amsterdam · Cologne friend pickup planned after arrival',
        departurePlan: 'Leave the hotel around 12:20 PM to reach Schiphol between 12:45 and 1:00 PM.',
      },
      arrivalSummary: 'Arrive at Schiphol at 9:20 AM on September 26; a Cologne friend picks us up for the Hyatt Regency prelude night before the Waldorf stay.',
      planningLabel: 'Flexible',
      planningNote: 'The Amsterdam chapter now starts with a relaxed Hyatt Regency prelude night, a Cologne friend pickup and the existing Waldorf Astoria plan from September 27.',
      reservations: [
        { item: 'Emirates EK226 + EK145 to Amsterdam', status: 'Confirmed', note: 'September 24–26; First Class via Dubai with private reference, seating and account details kept offline.' },
        { item: 'Hyatt Regency Amsterdam', status: 'Confirmed', note: 'One-night arrival stay: September 26–27, with 3:00 PM check-in and 12:00 PM checkout.' },
        { item: 'Cologne friend pickup and Amsterdam prelude', status: 'Confirmed', note: 'Friend drives in from Cologne, helps with arrival, Hyatt drop-off and an easy first look at the city.' },
        { item: 'Waldorf Astoria Amsterdam', status: 'Confirmed', note: 'September 27–30 after the Hyatt checkout.' },
        { item: 'Van Gogh Museum · September 28 at 11:00 AM', status: 'Confirmed', note: 'Timed entry for Thomas, Maggie and Maggie’s friend; arrive 10–15 minutes early.' },
        { item: 'Private Classic Saloon canal cruise · September 28, 6:30–8:00 PM', status: 'Confirmed', note: 'Thomas and Maggie; coordinate a drop-off near Bistro de la Mer.' },
        { item: 'Bistro de la Mer · September 28 at 8:15 PM', status: 'Confirmed', note: 'Three guests with confirmed bar seating.' },
        { item: 'House of Gassan · September 29 at 11:00 AM', status: 'Confirmed', note: 'Complimentary private-car collection, diamond craftsmanship and Rolex appointment; no purchase obligation.' },
        { item: 'Canal-cruise beverages and light bites', status: 'Awaiting input', note: 'Choose with the concierge before departure.' },
        { item: 'Maggie’s Amsterdam friend', status: 'Confirmed', note: 'Confirmed for Monday and may also join Sunday evening.' },
        { item: 'Separate friend visit Tuesday or Wednesday', status: 'Optional', note: 'Keep Tuesday afternoon and Wednesday morning flexible.' },
        { item: 'Focused Rijksmuseum rainy-day visit', status: 'Optional', note: 'A reserve option near Museumplein, not part of the principal itinerary.' },
      ],
      reserveOptions: [
        { area: 'Canal Belt', places: 'Café Marcella, Magere Brug and Utrechtsestraat' },
        { area: 'Jordaan', places: 'Noordermarkt, Café ’t Papeneiland and Café ’t Smalle' },
        { area: 'Nine Streets', places: 'Boutiques, design, leather, chocolate and vintage' },
        { area: 'De Pijp', places: 'Albert Cuyp Market, Sarphatipark and specialty coffee' },
        { area: 'Museumplein', places: 'Vondelpark or a focused Rijksmuseum rainy-day visit' },
        { area: 'Near the hotel', places: 'Peacock Lounge, Goldfinch and Bistro de la Mer' },
      ],
      exclusions: ['Anne Frank House'],
      days: [
        {
          date: '2026-09-26',
          title: 'Emirates arrival and Hyatt Regency prelude',
          note: 'A Cologne friend meets us after arrival, helps with the Hyatt drop-off and shows us around before the Waldorf chapter begins.',
          morning: [activity('Arrive at Schiphol on Emirates EK145', 'Amsterdam Airport Schiphol', 'Confirmed', { time: '09:20', displayTime: '9:20 AM arrival', transportation: 'Friend drives in from Cologne for pickup; allow time for immigration and luggage.', note: 'Keep private travel references, seating and account details offline.' })],
          afternoon: [activity('Hyatt Regency Amsterdam check-in and city introduction', 'Hyatt Regency Amsterdam', 'Confirmed', { time: '15:00', displayTime: '3:00 PM check-in', transportation: 'Friend drop-off at Hyatt Regency Amsterdam, then a relaxed city route together.', note: 'Use this as a light prelude rather than a packed sightseeing day.' })],
          evening: [activity('Dinner or canal walk with Cologne friend', 'Amsterdam', 'Optional', { displayTime: 'Evening', transportation: 'Let the friend lead based on energy, weather and parking.', note: 'Keep the evening flexible after the long Emirates journey.' })],
          alternatives: ['Hyatt rest', 'Amsterdam East walk', 'Short canal introduction', 'Casual dinner with friend'],
          journal: { mood: 'Prelude', notes: 'Emirates arrival, a friendly pickup from Cologne and one soft Amsterdam night before the Waldorf stay.', restaurants: [] },
        },
        {
          date: '2026-09-27',
          title: 'Hyatt checkout, Waldorf arrival and canals',
          note: 'Move from the Hyatt Regency to the Waldorf, then keep the rest of the day flexible around recovery and whether Maggie’s friend joins.',
          morning: [activity('Checkout from Hyatt Regency and move to the Waldorf', 'Hyatt Regency Amsterdam', 'Confirmed', { time: '11:00', displayTime: 'Morning · checkout by noon', transportation: 'Transfer to Waldorf Astoria Amsterdam and leave luggage if the room is not ready.', note: 'The original Waldorf plan resumes after the prelude night.' })],
          afternoon: [activity('Hotel-area canals, garden, pool and rest', 'Waldorf Astoria Amsterdam', 'Optional', { transportation: 'Walk Reguliersgracht, Amstelveld, Utrechtsestraat and Magere Brug, or remain at the hotel.', note: 'Preserve the room, garden, pool and unstructured neighborhood time.' })],
          evening: [activity('Flexible dinner and possible friend time', 'Waldorf Astoria Amsterdam', 'Optional', { displayTime: 'Evening', transportation: 'Choose near the hotel once timing and energy are clear.', note: 'Maggie’s Amsterdam friend may join, subject to final timing.' })],
          alternatives: ['Peacock Lounge', 'Goldfinch', 'Bistro de la Mer', 'A short evening canal walk'],
          journal: { mood: 'First Light', notes: 'A flexible first day for canal air, the garden, the pool and recovery.', restaurants: ['Peacock Lounge', 'Goldfinch', 'Bistro de la Mer'] },
        },
        {
          date: '2026-09-28',
          title: 'Van Gogh and a flexible local day',
          note: 'Monday’s anchors are confirmed; the afternoon remains open with Maggie’s friend.',
          morning: [activity('Meet Maggie’s friend and visit the Van Gogh Museum', 'Van Gogh Museum Amsterdam', 'Confirmed', { time: '11:00', displayTime: '11:00 AM–12:30 PM', transportation: 'Travel to Museumplein after a slow breakfast and meet before entry.', note: 'Confirmed timed entry for three; arrive 10–15 minutes early.' })],
          afternoon: [activity('Flexible Amsterdam afternoon with Maggie’s friend', 'Museumplein Amsterdam', 'Optional', { time: '12:30', displayTime: '12:30–5:45 PM', transportation: 'Choose the most suitable neighborhood and return Thomas and Maggie to the Waldorf by about 5:45 PM.', note: 'Select Museumplein/Vondelpark, De Pijp/Albert Cuyp, or the Canal Belt/Nine Streets/Jordaan based on weather and energy.' })],
          evening: [activity('Private Classic Saloon canal cruise', 'Waldorf Astoria Amsterdam', 'Confirmed', { time: '18:30', displayTime: '6:30–8:00 PM', transportation: 'Thomas and Maggie cruise privately; coordinate a drop-off close to Bistro de la Mer.', note: 'Beverages and light bites remain an open decision.' }), activity('Bistro de la Mer with Maggie’s friend', 'Bistro de la Mer Amsterdam', 'Confirmed', { time: '20:15', displayTime: '8:15 PM', transportation: 'Maggie’s friend rejoins for dinner; protect the short cruise-to-restaurant transition.', note: 'Bar seating for three is confirmed.' })],
          alternatives: ['Museumplein and Vondelpark', 'De Pijp and Albert Cuyp Market', 'Canal Belt, Nine Streets and Jordaan', 'Focused Rijksmuseum visit only if rain calls for an indoor alternative'],
          journal: { mood: 'Together', notes: 'Van Gogh with a local friend, an open afternoon, a private sunset cruise and Bistro de la Mer.', restaurants: ['Bistro de la Mer'] },
        },
        {
          date: '2026-09-29',
          title: 'House of Gassan and an open afternoon',
          note: 'The appointment and private-car collection are confirmed; everything afterward stays open.',
          morning: [activity('Breakfast, hotel time and House of Gassan collection', 'Waldorf Astoria Amsterdam', 'Confirmed', { time: '11:00', displayTime: '11:00 AM collection', transportation: 'Complimentary private car collects from the Waldorf lobby.', note: 'The visit and optional return transportation are complimentary, with no purchase obligation.' })],
          afternoon: [activity('Diamond craftsmanship and Rolex appointment', 'House of Gassan Amsterdam', 'Confirmed', { displayTime: 'From 11:00 AM', transportation: 'Use the complimentary return or walk back through the eastern canal belt.', note: 'Keep the description and the day intentionally discreet and unhurried.' })],
          evening: [activity('Open evening and possible friend visit', 'Amsterdam', 'Optional', { displayTime: 'Afternoon and evening', transportation: 'Choose hotel time, a canal walk or spontaneous sightseeing.', note: 'A separate friend visit may happen Tuesday or Wednesday.' })],
          alternatives: ['Hotel time', 'Walk through the eastern canal belt', 'Spontaneous sightseeing', 'A separate friend visit'],
          journal: { mood: 'Crafted', notes: 'A private Gassan appointment, followed by an afternoon left open to the city.', restaurants: [] },
        },
        {
          date: '2026-09-30',
          title: 'Easy morning and flight to Munich',
          note: 'The airport target is 12:45–1:00 PM for Lufthansa LH2305.',
          morning: [activity('Slow breakfast, packing, final canal walk and checkout', 'Waldorf Astoria Amsterdam', 'Optional', { time: '11:00', displayTime: 'Morning · checkout by 11:00 AM', transportation: 'Leave luggage with the hotel if needed.', note: 'A friend may visit; Peacock Lounge from 11:30 AM is a possible brief lunch.' })],
          afternoon: [activity('Lufthansa LH2305 to Munich', 'Amsterdam Airport Schiphol', 'Confirmed', { time: '15:40', displayTime: '3:40–5:05 PM', transportation: 'Leave around 12:20 PM to target Schiphol arrival between 12:45 and 1:00 PM.', note: 'Preserve comfortable time for airport processing and lounge access.' })],
          evening: [activity('Taxi, Andaz check-in and hotel dinner', 'Andaz Munich Schwabinger Tor', 'Reserve', { time: '20:00', displayTime: 'Around 8:00 PM', transportation: 'Taxi from Munich Airport, normally 35–50 minutes.', note: 'Reserve The Lonely Broccoli; use room service if the flight is delayed.' })],
          alternatives: ['Possible friend visit', 'Brief Peacock Lounge lunch from 11:30 AM', 'One final canal walk'],
          journal: { mood: 'In Motion', notes: 'A slow final canal morning, comfortable airport time and the short flight to Munich.', restaurants: ['Peacock Lounge', 'The Lonely Broccoli'] },
        },
      ],
      helpful: { currency: 'Euro (EUR)', emergency: '112', timeZone: 'Europe/Amsterdam', plugType: 'Type C / F · 230V', language: 'Dutch · English widely spoken' },
      links: { googleMaps: maps('Waldorf Astoria Amsterdam'), appleMaps: 'https://maps.apple.com/?q=Waldorf+Astoria+Amsterdam', hotelWebsite: 'https://www.hilton.com/en/hotels/amswawa-waldorf-astoria-amsterdam/', weatherDetails: 'https://www.google.com/search?q=Amsterdam+weather' },
    },
    {
      id: 'munich',
      city: 'Munich',
      country: 'Germany',
      dates: 'September 30–October 4',
      dateRange: { start: '2026-09-30', end: '2026-10-04' },
      coordinates: { latitude: 48.1351, longitude: 11.582 },
      appearance: { side: 'right', variant: 'munich' },
      arrivalConnectionId: 'ams-muc',
      departureConnectionId: 'muc-nce',
      hotel: {
        name: 'Andaz Munich Schwabinger Tor', suite: 'Junior Suite', checkIn: 'September 30 · after arrival', checkInDate: '2026-09-30', checkOut: 'October 4 · 12:00 PM', checkOutDate: '2026-10-04', nights: 4, status: 'Confirmed',
        description: 'A convenient Schwabing base for the city, match and driving days.',
        highlights: ['Spa and pool', 'U6 access', 'Easy airport-road connection'],
      },
      journey: {
        arrivalContext: 'LH2305 from Amsterdam',
        arrivalTransfer: 'Munich Airport → Andaz · approximately 35–50 minutes by taxi',
        departurePlan: 'Return the SIXT car at Munich Airport by 3:00 PM, then continue to the terminal.',
      },
      planningNote: null,
      reservations: [
        { item: 'Andaz Munich Schwabinger Tor · Junior Suite', status: 'Confirmed', note: 'September 30–October 4; checkout at 12:00 PM.' },
        { item: 'Lufthansa LH2305 Amsterdam–Munich', status: 'Confirmed', note: 'September 30 · 3:40–5:05 PM.' },
        { item: 'Germany–Serbia match tickets', status: 'Confirmed', note: 'Tickets are confirmed; no private ticket or seating details are published.' },
        { item: 'SIXT BMW M340 Touring rental', status: 'Confirmed', note: 'Pickup October 2 at 3:00 PM and return October 4 at 3:00 PM, both at Munich Airport.' },
        { item: 'The Lonely Broccoli · September 30 at 8:00 PM', status: 'Reserve', note: 'Book two to four weeks before arrival.' },
        { item: 'Alpenrose Mittenwald · October 3 around 12:30 PM', status: 'Reserve', note: 'Holiday lunch on the driving loop.' },
        { item: 'Arena guided tour', status: 'Optional', note: 'Check the official calendar four to six weeks before.' },
        { item: 'BMW Museum or Nymphenburg Palace', status: 'Optional', note: 'Choose one final-morning option together.' },
      ],
      days: [
        {
          date: '2026-09-30', title: 'Arrival and hotel evening', note: 'The confirmed 5:05 PM landing makes this an intentionally quiet first night.',
          morning: [],
          afternoon: [activity('Lufthansa LH2305 from Amsterdam', 'Munich Airport', 'Confirmed', { time: '15:40', displayTime: '3:40–5:05 PM', transportation: 'Taxi to Andaz after baggage; S8 + U6 is the backup.' })],
          evening: [activity('Andaz check-in, spa and dinner', 'Andaz Munich Schwabinger Tor', 'Reserve', { time: '20:00', displayTime: '8:00 PM', transportation: 'The Lonely Broccoli is inside the hotel.', note: 'Use the lounge or room service if delayed.' })],
          alternatives: ['Public transit via S8, Marienplatz and U6 if energetic'],
          journal: { mood: 'In Motion', notes: 'A short flight and a quiet reset in Schwabing.', restaurants: ['The Lonely Broccoli'] },
        },
        {
          date: '2026-10-01', title: 'Marienplatz, Oktoberfest and Germany–Serbia', note: 'Use U6 for both the city and Allianz Arena; protect the hotel rest before kickoff.',
          morning: [activity('Marienplatz, Glockenspiel and FC Bayern World', 'Marienplatz Munich', 'Confirmed', { time: '09:45', displayTime: '9:45 AM–12:30 PM', transportation: 'U6 from Dietlindenstraße to Marienplatz.' })],
          afternoon: [activity('View lunch, Oktoberfest walk-through and hotel rest', 'Theresienwiese Munich', 'Optional', { time: '12:30', displayTime: '12:30–4:00 PM', transportation: 'U-Bahn to the festival grounds, then return to Andaz.', note: 'No tent reservation; spend only 45–75 minutes on the grounds.' })],
          evening: [activity('Germany vs Serbia at Allianz Arena', 'Allianz Arena Munich', 'Confirmed', { time: '17:45', displayTime: 'Leave 5:45 PM · kickoff 8:45 PM', transportation: 'Walk to Dietlindenstraße, take U6 toward Garching-Forschungszentrum, exit Fröttmaning, then walk 10–15 minutes.', note: 'Carry the mobile ticket and photo ID.' })],
          alternatives: ['Café Kreutzkamm, Bar Centrale, Sweet Spot or Viktualienmarkt for lunch', 'Arena tour only if an official DFB-compatible slot appears'],
          journal: { mood: 'Celebratory', notes: 'Old Munich by day and one unforgettable football night.', restaurants: ['Café Glockenspiel', 'Café Kreutzkamm'] },
        },
        {
          date: '2026-10-02', title: 'A light morning and the M340 Touring', note: 'Freising is removed; drive directly back to the hotel after pickup.',
          morning: [activity('Choose Schwabing, Museum Brandhorst or hotel time', 'Andaz Munich Schwabinger Tor', 'Optional', { displayTime: 'Morning', transportation: 'Walk/U6 for the city options; stay in for the lowest-effort choice.' })],
          afternoon: [activity('SIXT BMW M340 Touring pickup', 'Munich Airport Center', 'Confirmed', { time: '15:00', displayTime: '3:00 PM', transportation: 'Taxi from Andaz around 1:45 PM; U6 + S8 is the backup.', note: 'Pickup is confirmed. Photograph all panels, wheels, glass, interior, mileage and fuel.' })],
          evening: [activity('Drive directly to Andaz and rest', 'Andaz Munich Schwabinger Tor', 'Confirmed', { time: '16:30', displayTime: 'Around 4:30 PM', transportation: 'Drive 35–55 minutes from Munich Airport.', note: 'No extra sightseeing is scheduled.' })],
          alternatives: ['Schwabing for good weather', 'Museum Brandhorst for compact contemporary art', 'Hotel spa and pool if match night ran late'],
          journal: { mood: 'Easygoing', notes: 'A deliberately light morning, then the road-trip car arrives.', restaurants: ['Andaz Munich'] },
        },
        {
          date: '2026-10-03', title: 'Simplified Bavarian Alpine loop', note: 'Four core stops, one optional church and no Austria.',
          morning: [activity('Tegernsee and Sylvenstein Reservoir', 'Tegernsee Germany', 'Confirmed', { time: '09:15', displayTime: '9:15 AM–11:42 AM', transportation: 'Drive via Germany-only waypoints; use signed pull-offs at Sylvenstein.' })],
          afternoon: [activity('Mittenwald lunch and Neuschwanstein exterior', 'Neuschwanstein Castle Parking P4', 'Reserve', { time: '12:23', displayTime: '12:23–5:45 PM', transportation: 'Continue via Mittenwald; Wieskirche is optional before the castle.', note: 'Exterior views only. Walk uphill if the carriage wait exceeds 20–25 minutes.' })],
          evening: [activity('Drive back to Munich', 'Andaz Munich Schwabinger Tor', 'Confirmed', { time: '17:45', displayTime: 'Return around 7:33 PM', transportation: 'Allow extra traffic buffer and eat after returning.' })],
          alternatives: ['Skip Wieskirche first if timing slips', 'Turn back and reroute within Germany if the private scenic road is closed'],
          journal: { mood: 'Storybook', notes: 'Lake light, mountain roads and Neuschwanstein from the outside.', restaurants: ['Alpenrose Mittenwald'] },
        },
        {
          date: '2026-10-04', title: 'Choose the final morning and fly to Nice', note: 'All options return to Andaz before checkout and protect the 3:00 PM car return.',
          morning: [activity('Choose BMW Museum, Nymphenburg or hotel time', 'Andaz Munich Schwabinger Tor', 'Optional', { time: '09:00', displayTime: '9:00–11:30 AM', transportation: 'Use the car only if useful; all choices return to the hotel before noon.' })],
          afternoon: [activity('Checkout, refuel and return the SIXT BMW at P6', 'Munich Airport P6 Rental Car Return', 'Confirmed', { time: '13:15', displayTime: '1:15–3:00 PM', transportation: 'Refuel near the airport, follow Mietwagenrückgabe signs and do not enter P20.', note: 'The 3:00 PM return is confirmed; retain fuel and vehicle-condition documentation.' })],
          evening: [activity('Lufthansa LH2278 to Nice', 'Munich Airport', 'Confirmed', { time: '19:25', displayTime: '7:25–8:55 PM', transportation: 'Continue to the terminal after the 3:00 PM rental return.', note: 'Taxi from Nice Airport to the hotel after arrival.' })],
          alternatives: ['BMW Welt + Museum — Thomas choice', 'Nymphenburg Palace — Maggie choice', 'Hotel-only morning — lowest effort'],
          journal: { mood: 'Sunbound', notes: 'One final Munich choice, then an evening flight to the Riviera.', restaurants: ['Andaz Munich'] },
        },
      ],
      helpful: { currency: 'Euro (EUR)', emergency: '112', timeZone: 'Europe/Berlin', plugType: 'Type C / F · 230V', language: 'German · English widely spoken' },
      links: { googleMaps: maps('Andaz Munich Schwabinger Tor'), appleMaps: 'https://maps.apple.com/?q=Andaz+Munich+Schwabinger+Tor', hotelWebsite: 'https://www.hyatt.com/andaz/en-US/mucaz-andaz-munich-schwabinger-tor', weatherDetails: 'https://www.google.com/search?q=Munich+weather' },
    },
    {
      id: 'nice',
      city: 'Nice', country: 'France', dates: 'October 4–8', dateRange: { start: '2026-10-04', end: '2026-10-08' }, coordinates: { latitude: 43.7102, longitude: 7.262 }, appearance: { side: 'left', variant: 'nice' },
      arrivalConnectionId: 'muc-nce', departureConnectionId: 'nce-doh',
      planningLabel: 'Tentative',
      planningNote: 'Tentative — family guidance now points to a Monte Carlo Country Club tennis morning, Monaco on October 5, Èze with Villa Kérylos on October 6, and Matisse/Cimiez unchanged on October 7. Cannes is excluded.',
      hotel: { name: 'Hôtel Palais de la Méditerranée', suite: 'Executive Suite', checkIn: 'October 4 · from 3:00 PM', checkInDate: '2026-10-04', checkOut: 'October 8 · 12:00 PM', checkOutDate: '2026-10-08', nights: 4, status: 'Confirmed', description: 'A Promenade hotel with an indoor-outdoor pool and room to slow down.', highlights: ['Promenade location', 'Indoor-outdoor pool', 'Terrace and wellness facilities'] },
      journey: {
        arrivalContext: 'LH2278 from Munich',
        arrivalTransfer: 'Nice Côte d’Azur Airport → hotel · approximately 15–25 minutes by taxi',
        departurePlan: 'Leave the hotel around 12:30–12:45 PM for the 3:55 PM departure.',
      },
      reservations: [
        { item: 'Hôtel Palais de la Méditerranée · Executive Suite', status: 'Confirmed', note: 'October 4–8; checkout at 12:00 PM.' },
        { item: 'Lufthansa LH2278 Munich–Nice', status: 'Confirmed', note: 'October 4 · 7:25–8:55 PM.' },
        { item: 'Qatar Airways QR56 + QR948 to Singapore', status: 'Confirmed', note: 'October 8 at 3:55 PM; arrives October 9 at 3:45 PM.' },
        { item: 'Private tennis coaching · Monte Carlo Country Club', status: 'Tentative', note: 'Concierge is arranging the October 5 morning session.' },
        { item: 'Monaco · October 5', status: 'Tentative', note: 'Meet family later and explore Monaco in the afternoon; return to Nice afterward.' },
        { item: 'Èze and Villa Kérylos · October 6', status: 'Tentative', note: 'Keep this as the east-coast scenic day without adding Cannes.' },
        { item: 'Musée Matisse and Cimiez picnic · October 7', status: 'Tentative', note: 'Museum approximately 11:00 AM–12:15 PM; move lunch indoors if rain prevents the picnic.' },
        { item: 'Evening dining', status: 'Optional', note: 'Intentionally flexible throughout the stay.' },
        { item: 'Monaco Palace interior', status: 'Optional', note: 'Include only if pace and interest support it.' },
      ],
      exclusions: ['Cannes'],
      days: [
        { date: '2026-10-04', title: 'Arrive and settle', note: 'Keep the late arrival minimal.', morning: [], afternoon: [], evening: [activity('Lufthansa LH2278 from Munich', 'Munich Airport', 'Confirmed', { time: '19:25', displayTime: '7:25–8:55 PM', transportation: 'Continue to the terminal after returning the rental car.' }), activity('Taxi, Executive Suite check-in and simple dinner', 'Hôtel Palais de la Méditerranée', 'Confirmed', { time: '20:55', displayTime: 'After 8:55 PM arrival', transportation: 'Taxi from Nice Airport to the hotel.', note: 'Settle into the Executive Suite and keep dinner simple if needed.' })], alternatives: ['Room service', 'A simple hotel meal', 'An early night'], journal: { mood: 'Riviera Arrival', notes: 'A late landing and a minimal first evening in the Executive Suite.', restaurants: [] } },
        { date: '2026-10-05', title: 'Monte Carlo tennis and Monaco', note: 'Start with private tennis coaching, then meet family later and keep the rest of the day flexible.', morning: [activity('Private tennis coaching', 'Monte Carlo Country Club', 'Tentative', { time: '09:30', displayTime: 'Morning session', transportation: 'Travel from Nice by car or taxi; final timing depends on the concierge confirmation.', note: 'Concierge is arranging the private coaching session. Keep the morning athletic and unhurried.' })], afternoon: [activity('Monaco with family', 'Monaco', 'Tentative', { displayTime: 'Afternoon', transportation: 'Meet family later in the day, then explore Monaco at an easy pace.', note: 'Focus on the harbor, Casino Square, gardens and Grand Prix atmosphere; keep Palace interior optional.' })], evening: [activity('Return to Nice, then choose seaside, Castle Hill or rest', 'Nice France', 'Optional', { displayTime: 'Evening', transportation: 'Return to Nice after Monaco; continue only if energy is good.', note: 'If energy is high, walk the Promenade or Castle Hill area; if not, go back to the hotel and rest.' })], alternatives: ['Promenade des Anglais walk', 'Castle Hill if energy remains', 'Hotel pool and early rest'], journal: { mood: 'Riviera Rally', notes: 'A tennis morning near Monaco, family time, then an energy-based Nice evening.', restaurants: [] } },
        { date: '2026-10-06', title: 'Èze and Villa Kérylos', note: 'A lighter east-coast scenic day centered on Èze and the Belle Époque villa by the sea.', morning: [activity('Èze village and Exotic Garden', 'Èze Village France', 'Tentative', { time: '10:00', displayTime: 'Depart Nice around 10:00 AM', transportation: 'Drive east from Nice; final parking order may be adjusted locally.', note: 'Expect steep stone lanes and wear secure walking shoes.' })], afternoon: [activity('Villa Kérylos and Beaulieu-sur-Mer', 'Villa Kérylos Beaulieu-sur-Mer', 'Tentative', { displayTime: 'Afternoon', transportation: 'Continue from Èze to Villa Kérylos and the nearby seafront.', note: 'Keep lunch and timing flexible so the day stays relaxed.' })], evening: [activity('Return to Nice for hotel time and dinner', 'Hôtel Palais de la Méditerranée', 'Optional', { displayTime: 'Evening', transportation: 'Return to Nice after Villa Kérylos.', note: 'Use the Promenade, pool or a low-key dinner depending on energy.' })], alternatives: ['Longer Èze village time', 'Beaulieu-sur-Mer waterfront', 'Hotel pool and quiet dinner'], journal: { mood: 'Riviera Day', notes: 'Stone lanes in Èze, Villa Kérylos and a calmer return to Nice.', restaurants: [] } },
        { date: '2026-10-07', title: 'Matisse, Cimiez and a picnic', note: 'A focused museum visit, an olive-grove picnic and family time, ending around 4:00 PM.', morning: [activity('Meet, travel to Cimiez and visit Musée Matisse', 'Musée Matisse Nice', 'Tentative', { time: '10:30', displayTime: 'Meet 10:30 AM · museum 11:00 AM–12:15 PM', transportation: 'Travel together to Cimiez.', note: 'Keep the visit to about 75 minutes. The museum is open Wednesday and closed Tuesday.' })], afternoon: [activity('Picnic, monastery garden and family time in Cimiez', 'Jardin des Arènes de Cimiez', 'Tentative', { time: '12:30', displayTime: '12:30–4:00 PM', transportation: 'Walk through the olive grove, monastery garden and Cimiez neighborhood.', note: 'If rain prevents the picnic, substitute a casual indoor lunch without replacing the day.' })], evening: [activity('Pool, Promenade and celebratory dinner', 'Hôtel Palais de la Méditerranée', 'Optional', { displayTime: 'After 4:00 PM', transportation: 'Return to the hotel for an unstructured final Nice evening.' })], alternatives: ['Casual indoor lunch in Cimiez or near the hotel if rain prevents the picnic'], journal: { mood: 'Artful', notes: 'Matisse, an olive-grove picnic, gardens and a final flexible Riviera evening.', restaurants: [] } },
        { date: '2026-10-08', title: 'Slow departure day', note: 'Leave the hotel around 12:30–12:45 PM for Nice Terminal 1.', morning: [activity('Breakfast, one last promenade or swim, pack and check out', 'Hôtel Palais de la Méditerranée', 'Confirmed', { time: '12:00', displayTime: 'Morning · checkout at 12:00 PM', transportation: 'Stay close to the hotel before departure.', note: 'Check out of the Executive Suite at noon.' })], afternoon: [activity('Qatar Airways QR56 + QR948 via Doha', 'Nice Côte d’Azur Airport Terminal 1', 'Confirmed', { time: '15:55', displayTime: 'Depart 3:55 PM', transportation: 'Taxi from the hotel around 12:30–12:45 PM.', note: 'Preserve comfortable time for check-in, security and lounge access; scheduled Singapore arrival is 3:45 PM Friday.' })], evening: [activity('Overnight journey to Singapore', 'Hamad International Airport Doha', 'Confirmed', { transportation: 'Follow the QR56 to QR948 connection.' })], alternatives: ['A short Promenade walk or swim only if packing is complete'], journal: { mood: 'Airborne', notes: 'One final Mediterranean morning, Executive Suite checkout and the long journey east.', restaurants: [] } },
      ],
      helpful: { currency: 'Euro (EUR)', emergency: '112', timeZone: 'Europe/Paris', plugType: 'Type C / E · 230V', language: 'French · English in major hotels', practical: 'Check weather 48 hours ahead. Castle Hill and Èze require secure shoes. Move the picnic indoors if needed; preserve the day’s route and relaxed pace.' },
      links: { googleMaps: maps('Hôtel Palais de la Méditerranée Nice'), appleMaps: 'https://maps.apple.com/?q=Hotel+Palais+de+la+Mediterranee+Nice', hotelWebsite: 'https://www.hyatt.com/unbound-collection/en-US/ncehr-hotel-palais-de-la-mediterranee', weatherDetails: 'https://www.google.com/search?q=Nice+France+weather' },
    },
    {
      id: 'singapore', city: 'Singapore', country: 'Singapore', dates: 'October 9–13', dateRange: { start: '2026-10-09', end: '2026-10-13' }, coordinates: { latitude: 1.3521, longitude: 103.8198 }, appearance: { side: 'right', variant: 'singapore' },
      arrivalConnectionId: 'doh-sin', departureConnectionId: 'sin-hkg', planningNote: null,
      hotel: { name: 'Grand Hyatt Singapore', suite: 'Grand Suite', checkIn: 'October 9 · around 5:30 PM', checkInDate: '2026-10-09', checkOut: 'October 12 · 4:00 PM late checkout', checkOutDate: '2026-10-12', nights: 3, status: 'Confirmed', description: 'A garden-oriented base near Orchard Road.', highlights: ['Grand Club access', 'Pool and wellness', '4:00 PM late checkout'] },
      journey: {
        arrivalContext: 'QR948 from Doha',
        arrivalTransfer: 'Singapore Changi Terminal 1 → Grand Hyatt · approximately 25–40 minutes by taxi or Grab',
        departurePlan: 'After the 4:00 PM checkout on October 12, continue to Jewel, then transfer to Terminal 4 for CX714 after midnight.',
      },
      reservations: [
        { item: 'Grand Hyatt Singapore · Grand Suite', status: 'Confirmed', note: 'Three hotel nights: October 9, 10 and 11. Late checkout is 4:00 PM on October 12.' },
        { item: 'Sunday Premier Walkabout ticket', status: 'Confirmed', note: 'Zones 1–4 and all performance stages; no reserved viewing position.' },
        { item: 'Singapore Grand Prix and Lana Del Rey · October 11', status: 'Confirmed', note: 'Race at 8:00 PM; Lana at Padang Stage at 10:25 PM.' },
        { item: 'Friday Padang Grandstand for Sprint Qualifying and JJ Lin', status: 'Confirmed', note: 'Tickets are purchased; keep the plan energy-dependent after the long arrival day.' },
        { item: 'Saturday evening: Gardens or crab + Night Safari', status: 'Awaiting input', note: 'Choose one ending, not both.' },
        { item: 'Long Beach Dempsey and Night Safari entry', status: 'Reserve', note: 'Book only if choosing the food + wildlife option.' },
        { item: 'Damai treatment', status: 'Optional', note: 'Ask whether hydrotherapy access is included.' },
      ],
      days: [
        { date: '2026-10-09', title: 'Arrive gently — then JJ Lin if energy allows', note: 'The Friday F1 and JJ Lin ticket is purchased; still treat attendance as energy-dependent after the long arrival day.', morning: [activity('Arrive from Doha on QR948', 'Singapore Changi Airport Terminal 1', 'Confirmed', { time: '15:45', displayTime: '3:45 PM', transportation: 'Allow 45–75 minutes for immigration and bags, then taxi or Grab 25–40 minutes to Orchard.' })], afternoon: [activity('Grand Hyatt check-in and Grand Club reset', 'Grand Hyatt Singapore', 'Confirmed', { time: '17:30', displayTime: 'Around 5:30 PM', transportation: 'Taxi or Grab from Changi.', note: 'Check into the confirmed Grand Suite; the stay covers the nights of October 9, 10 and 11.' })], evening: [activity('Sprint Qualifying and JJ Lin', 'Padang Singapore', 'Confirmed', { time: '19:15', displayTime: 'Leave 7:15 PM · Sprint 8:30 PM · JJ Lin 10:30 PM', transportation: 'Orchard MRT to City Hall, then follow ticket gate directions.', note: 'Ticket is purchased; still skip or shorten the night if arrival fatigue hits hard.' })], alternatives: ['Grand Club cocktails', 'Oasis by the pool', 'Pete’s Place and an early night'], journal: { mood: 'Soft Landing', notes: 'Warm night air, a Grand Suite reset and a purchased Friday F1/JJ Lin night if energy cooperates.', restaurants: ['Oasis', 'Pete’s Place'] } },
        { date: '2026-10-10', title: 'Chinatown, one bite at a time', note: 'Share small portions and keep the afternoon protected for the suite and pool.', morning: [activity('Late Grand Club breakfast and MRT to Maxwell', 'Maxwell Food Centre Singapore', 'Confirmed', { time: '11:30', displayTime: 'Leave around 11:30 AM', transportation: 'Direct Thomson–East Coast Line from Orchard to Maxwell.' })], afternoon: [activity('Maxwell food crawl, Chinatown walk and hotel rest', 'Chinatown Singapore', 'Confirmed', { time: '12:00', displayTime: '12:00–5:30 PM', transportation: 'Walk Maxwell, Tong Heng, Sri Mariamman Temple exterior and Ann Siang Hill; MRT back.', note: 'Try chicken rice, one fried snack, sugarcane or kopi and an egg tart.' })], evening: [activity('Choose Gardens by the Bay or crab + Night Safari', 'Singapore', 'Awaiting input', { time: '17:30', displayTime: 'From 5:30 or 6:00 PM', transportation: 'MRT for Gardens; taxi for Dempsey and Mandai.' })], alternatives: ['Gardens by the Bay with 7:45 PM Garden Rhapsody', 'Long Beach Dempsey black pepper crab plus Night Safari'], journal: { mood: 'Hungry', notes: 'Chicken rice, Chinatown lanes and one good evening choice.', restaurants: ['Maxwell Food Centre', 'Long Beach Dempsey'] } },
        { date: '2026-10-11', title: 'Singapore Grand Prix and Lana Del Rey', note: 'This is the fixed centerpiece; choose race-finish priority or a stronger Lana position before leaving.', morning: [activity('Slow Grand Club breakfast and pool time', 'Grand Hyatt Singapore', 'Confirmed', { time: '10:30', displayTime: '10:30 AM–2:30 PM', transportation: 'Stay at the hotel; hydrate and eat before circuit food lines build.' })], afternoon: [activity('Enter Zone 4 and settle near Padang', 'Gate 3A Singapore Grand Prix', 'Confirmed', { time: '15:15', displayTime: 'Leave 3:15 PM · enter around 4:00 PM', transportation: 'North–South Line from Orchard to City Hall, then walk to the gate printed on the ticket.', note: 'Premier Walkabout positions are first-come, first-served.' })], evening: [activity('Singapore Grand Prix', 'Marina Bay Street Circuit Zone 4', 'Confirmed', { time: '20:00', displayTime: '8:00–10:00 PM', transportation: 'Stay in Zone 4 for the simplest Padang transition.' }), activity('Lana Del Rey at Padang Stage', 'Padang Stage Singapore', 'Confirmed', { time: '22:25', displayTime: '10:25–11:55 PM', transportation: 'Move toward Padang around 9:30 PM for a stronger position, or stay for the live checkered flag.' })], alternatives: ['James Arthur at 6:15 PM if it does not compromise track positioning'], journal: { mood: 'Electric', notes: 'The night race, city lights and Lana Del Rey under the Singapore sky.', restaurants: ['Oasis', 'Grand Club'] } },
        { date: '2026-10-12', title: 'Hotel time and Jewel Changi', note: 'Late checkout is 4:00 PM; continue to Jewel and the airport for the 1:45 AM Tuesday flight.', morning: [activity('Grand Club breakfast, pool or Damai wellness', 'Grand Hyatt Singapore', 'Optional', { time: '10:30', displayTime: '10:30 AM–1:00 PM', transportation: 'Stay in the hotel.', note: 'This is the best spa window if booking a treatment.' })], afternoon: [activity('Lunch, pack and 4:00 PM late checkout', 'Grand Hyatt Singapore', 'Confirmed', { time: '13:00', displayTime: '1:00–4:00 PM', transportation: 'Check out at 4:00 PM, then depart for Jewel Changi.' }), activity('Jewel Changi and early dinner', 'Jewel Changi Airport', 'Confirmed', { time: '17:00', displayTime: '5:00–9:45 PM', transportation: 'Taxi or Grab 25–40 minutes to Jewel/Terminal 1.', note: 'See Forest Valley and the Rain Vortex; verify Jewel early bag drop eligibility.' })], evening: [activity('Transfer to Terminal 4 and check in for CX714', 'Singapore Changi Airport Terminal 4', 'Confirmed', { time: '21:45', displayTime: '9:45 PM onward', transportation: 'Take the free shuttle from Jewel/Terminal 1 to Terminal 4.', note: 'Begin formalities around 10:45 PM for the 1:45 AM departure on October 13.' })], alternatives: ['Oasis, Pete’s Place or StraitsKitchen for lunch'], journal: { mood: 'Grateful', notes: 'A final hotel morning, 4:00 PM checkout, the Rain Vortex and the overnight departure sequence.', restaurants: ['Oasis', 'Pete’s Place', 'Jewel Changi'] } },
        { date: '2026-10-13', title: 'Singapore to Ningbo via Hong Kong', note: 'A 5-hour 10-minute Hong Kong connection completes the public honeymoon route.', morning: [activity('Cathay Pacific CX714 to Hong Kong', 'Singapore Changi Airport Terminal 4', 'Confirmed', { time: '01:45', displayTime: '1:45–5:50 AM', transportation: 'Depart Terminal 4 and arrive at Hong Kong Terminal 1.' }), activity('Cathay Pacific CX956 to Ningbo', 'Hong Kong International Airport Terminal 1', 'Confirmed', { time: '11:00', displayTime: '11:00 AM–1:20 PM', transportation: 'Remain in Terminal 1 for the connection, then arrive at Ningbo Terminal 2.' })], afternoon: [activity('Arrive in Ningbo', 'Ningbo Lishe International Airport Terminal 2', 'Confirmed', { time: '13:20', displayTime: '1:20 PM', transportation: 'The public journey ends at Ningbo Terminal 2.' })], evening: [], alternatives: [], journal: { mood: 'Homeward', notes: 'Singapore to Hong Kong, then the final short flight to Ningbo.', restaurants: [] } },
      ],
      helpful: { currency: 'Singapore Dollar (SGD)', emergency: 'Police 999 · Ambulance / Fire 995', timeZone: 'Asia/Singapore', plugType: 'Type G · 230V', language: 'English · Mandarin · Malay · Tamil' },
      links: { googleMaps: maps('Grand Hyatt Singapore'), appleMaps: 'https://maps.apple.com/?q=Grand+Hyatt+Singapore', hotelWebsite: 'https://www.hyatt.com/grand-hyatt/en-US/sinrs-grand-hyatt-singapore', weatherDetails: 'https://www.google.com/search?q=Singapore+weather' },
    },
  ],
}

export function getConnection(connectionId) {
  return trip.transportation.find((connection) => connection.id === connectionId) || null
}

export function getTripDestination(destinationId) {
  return trip.destinations.find((destination) => destination.id === destinationId) || null
}

export function getTripDay(date) {
  return getAllTripDays().find(({ day }) => day.date === date) || null
}

export function getAllTripDays({ includeDeparture = true } = {}) {
  const byDate = new Map()

  trip.destinations.forEach((destination) => {
    destination.days.forEach((day) => {
      const existing = byDate.get(day.date)
      if (!existing) {
        byDate.set(day.date, { destination, day: { ...day } })
        return
      }

      const nextDestination = destination.dateRange.start === day.date ? destination : existing.destination
      const mergeActivities = (first, second) => {
        const seen = new Set()
        return [...first, ...second].filter((item) => {
          const key = item.time || `${item.title}-${item.location}`
          if (seen.has(key)) return false
          seen.add(key)
          return true
        })
      }

      byDate.set(day.date, {
        destination: nextDestination,
        day: {
          ...day,
          title: `${existing.destination.city} to ${destination.city}`,
          note: `${existing.day.note} ${day.note}`,
          morning: mergeActivities(existing.day.morning, day.morning),
          afternoon: mergeActivities(existing.day.afternoon, day.afternoon),
          evening: mergeActivities(existing.day.evening, day.evening),
          alternatives: [...new Set([...(existing.day.alternatives || []), ...(day.alternatives || [])])],
          journal: {
            mood: day.journal?.mood || existing.day.journal?.mood,
            notes: `${existing.day.journal?.notes || ''} ${day.journal?.notes || ''}`.trim(),
            restaurants: [...new Set([...(existing.day.journal?.restaurants || []), ...(day.journal?.restaurants || [])])],
          },
        },
      })
    })
  })

  return [...byDate.values()]
    .filter(({ day }) => includeDeparture || day.date !== trip.endDate)
    .sort((a, b) => a.day.date.localeCompare(b.day.date))
}
