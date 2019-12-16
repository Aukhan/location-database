const db = require('./db.json')

module.exports = {
  getAll: () => db,

  getCountryByCode: (code) => db[code] || null,

  getStatesByCode: (code) => {
    return db[code] ? db[code].states : []
  },

  getTimezonesByCode: (code) => {
    return db[code] ? db[code].timezones : []
  },

  getCities: (code, stateCode) => {
    if (typeof db[code] !== 'undefined') {
      const state = db[code].states.find(state => state.state_code === stateCode)

      return state ? state.cities : []
    }

    return []
  }
}
