# Location Database

Curated database in JSON format of countries, states, cities and timezones
This data has been curated from three different souces with priority to the first one

- https://github.com/dr5hn/countries-states-cities-database
- https://github.com/khkwan0/countryCityStateJson
- https://github.com/manuelmhtr/countries-and-timezones

Install via npm
```sh
npm install location-database
```

# Methods

```javascript
const ld = require('location-database')
```

## getAll()
Returns the entire database

## getCountryByCode(code)
Pass the iso2 country code (e.g. US) to get entire information on that country. Returns an empty array for no data found.

country object looks like
```javascript
{ 
      id: 233,
      name: 'United States',
      iso3: 'USA',
      iso2: 'US',
      phone_code: '1',
      capital: 'Washington D.C.',
      currency: 'USD',
      native: 'United States',
      continent: 'NA',
      languages: [ 'en' ],
      emoji: '🇺🇸',
      emojiU: 'U+1F1FA U+1F1F8',
      states: [...],
      timezones: [...]
}
```

## getStatesByCode(code)
Pass the iso2 country code (e.g. US) to get an array of states for that country. Returns an empty array for no data found.

state object looks like
```javascript
{ 
      id: 1456,
      name: 'Alabama',
      country_id: 233,
      country_code: 'US',
      state_code: 'AL',
      cities: [...] 
}
```

## getTimezonesByCode(code)
Pass the iso2 country code (e.g. US) to get an array of timezones for that country. Returns an empty array for no data found.

timezone object looks like
```javascript
{ 
      name: 'America/Adak',
      country: 'US',
      utcOffset: -600,
      utcOffsetStr: '-10:00',
      dstOffset: -540,
      dstOffsetStr: '-09:00',
      aliasOf: null,
      country_code: 'US',
      country_id: 233
}
```

## getCities(code, stateCode)
Pass the iso2 country code (e.g. US) and the state code to get an array of cities for that country and state combination. Returns an empty array for no data found.

city object looks like
```javascript
{ 
      id: '114994',
      name: 'Dallas County',
      state_id: 1456,
      state_code: 'AL',
      country_id: 233,
      country_code: 'US',
      latitude: '32.32597000',
      longitude: '-87.10648000' 
}
```

# Scripts
- `npm run lint` to lint code, eslint standard being used
- `npm run lint:fix` to auto fix linting where possible
- `npm run build` to compile the database, it overwrites db.json in src
- `npm run test` to run tests
