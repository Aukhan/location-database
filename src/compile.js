/**
 * This file compiles data from three different sources
 * 1) https://github.com/dr5hn/countries-states-cities-database
 * 2) https://github.com/khkwan0/countryCityStateJson
 * 3) https://github.com/manuelmhtr/countries-and-timezones
 *
 * The goal is to create a single module with most comprehensive data
 */

const fs = require('fs')
const path = require('path')

/**
  * We will be using dr5hn's work as the main source of data and inject
  * some other attributes and timezone information into it from datasource 2 and 3
  * wherever possible
  */
const CSC_DB_COUNTRIES = require('../components/countries-states-cities-database/countries.json')
const CSC_DB_STATES = require('../components/countries-states-cities-database/states.json')
const CSC_DB_CITIES = require('../components/countries-states-cities-database/cities.json')

const KHKWAN0_DB = require('countrycitystatejson')

const TIMEZONES = require('countries-and-timezones')

const RESULT = {}

CSC_DB_COUNTRIES.forEach(country => {
  /**
    * picking up some interesting fields from the KHKWAN database
    * KHKWAN0 database may not have the country, hence this is consitional
    */
  const KHKWAN0_COUNTRY = KHKWAN0_DB.getCountryByShort(country.iso2)

  if (KHKWAN0_COUNTRY) {
    const {
      native,
      continent,
      capital,
      languages,
      emoji,
      emojiU
    } = KHKWAN0_COUNTRY

    country = {
      ...country,
      native,
      continent,
      capital,
      languages,
      emoji,
      emojiU
    }
  }

  country.states = CSC_DB_STATES.filter(states => states.country_id === country.id)

  country.states.forEach(state => {
    state.cities = CSC_DB_CITIES.filter(city => city.state_id === state.id)
  })

  /**
   * patch the timezone object to have country_id and country_code
   * to conform with other datastructures
   */
  const timezones = TIMEZONES.getTimezonesForCountry(country.iso2)

  if (timezones) {
    country.timezones = timezones.map(timezone => {
      delete timezone.country
      timezone.country_code = country.iso2
      timezone.country_id = country.id
      return timezone
    })
  }

  RESULT[country.iso2] = country
})

fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(RESULT))
