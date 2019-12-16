const {
  getAll,
  getCountryByCode,
  getStatesByCode,
  getTimezonesByCode,
  getCities
} = require('.')

test('reads the entire database and detects US, CA and AU', () => {
  const countries = getAll()

  expect(countries.US).not.toBeUndefined()
  expect(countries.CA).not.toBeUndefined()
  expect(countries.AU).not.toBeUndefined()
})

test('gets country by correct code; US, CA', () => {
  const us = getCountryByCode('US')

  expect(us).not.toBeUndefined()
  expect(us.name).toBe('United States')

  const ca = getCountryByCode('CA')
  expect(ca).not.toBeUndefined()
  expect(ca.name).toBe('Canada')
})

test('gets null by incorrect code given', () => {
  const country = getCountryByCode('usa')

  expect(country).not.toBeUndefined()
  expect(country).toBeNull()
})

test('gets states by correct code; US, CA', () => {
  const usStates = getStatesByCode('US')

  expect(usStates).not.toBeUndefined()
  expect(usStates.length).not.toBe(0)

  const caStates = getStatesByCode('CA')

  expect(caStates).not.toBeUndefined()
  expect(caStates.length).not.toBe(0)
})

test('returns an empty array of states for incorrect country code', () => {
  const states = getStatesByCode('usa')

  expect(states).not.toBeUndefined()
  expect(states.length).toBe(0)
})

test('gets timezones by correct code; US, CA', () => {
  const usTimezones = getTimezonesByCode('US')

  expect(usTimezones).not.toBeUndefined()
  expect(usTimezones.length).not.toBe(0)

  const caTimezones = getTimezonesByCode('CA')

  expect(caTimezones).not.toBeUndefined()
  expect(caTimezones.length).not.toBe(0)
})

test('gets cities by correct country code and state code', () => {
  const newyorkCities = getCities('US', 'NY')

  expect(newyorkCities).not.toBeUndefined()
  expect(newyorkCities.length).not.toBe(0)

  const newSouthWalesCities = getCities('AU', 'NSW')

  expect(newSouthWalesCities).not.toBeUndefined()
  expect(newSouthWalesCities.length).not.toBe(0)
})

test('gets an empty array of cities for incorrect country code or state', () => {
  const newyorkCities = getCities('usa', 'NY')

  expect(newyorkCities).not.toBeUndefined()
  expect(newyorkCities.length).toBe(0)

  const newyorkCities1 = getCities('US', 'York')

  expect(newyorkCities1).not.toBeUndefined()
  expect(newyorkCities1.length).toBe(0)
})
