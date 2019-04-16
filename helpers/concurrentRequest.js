const axios = require('axios')
const https = require('https')

const MAX_REQUESTS_COUNT = 50
const INTERVAL_MS = 10
let PENDING_REQUESTS = 0


class Service {
  constructor() {
    const instance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    })

    instance.interceptors.request.use(config => new Promise((resolve) => {
      const interval = setInterval(() => {
        if (PENDING_REQUESTS < MAX_REQUESTS_COUNT) {
          // eslint-disable-next-line no-plusplus
          PENDING_REQUESTS++
          clearInterval(interval)
          resolve(config)
        }
      }, INTERVAL_MS)
    }))

    instance.interceptors.response.use((response) => {
      PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1)
      return Promise.resolve(response)
    }, (error) => {
      PENDING_REQUESTS = Math.max(0, PENDING_REQUESTS - 1)
      return Promise.reject(error)
    })

    this.instance = instance
  }
}

module.exports = Service
