
import _ from 'lodash'

import './peer'

const UPDATE_INTERVAL_CHECK = 10000

app.factory('$peers', ($peer, $timeout) => {
  class $peers {
    constructor () {
      this.stack = {
        official: [
          new $peer({ host: '13.56.163.57', port: 9030, ssl: false }),
          new $peer({ host: '54.183.132.15', port: 9030, ssl: false }),
          new $peer({ host: '54.183.69.30', port: 9030, ssl: false }),
          new $peer({ host: '54.183.152.67', port: 9030, ssl: false }),
          new $peer({ host: '54.183.22.145', port: 9030, ssl: false }),
          new $peer({ host: '54.183.209.94', port: 9030, ssl: false }),
          new $peer({ host: '54.153.89.97', port: 9030, ssl: false }),
          new $peer({ host: '54.153.120.24', port: 9030, ssl: false }),
          new $peer({ host: '54.67.117.224', port: 9030, ssl: false }),
          new $peer({ host: '54.241.156.232', port: 9030, ssl: false }),
          new $peer({ host: '54.193.61.26', port: 9030, ssl: false }),
          new $peer({ host: '54.67.92.59', port: 9030, ssl: false }),
          new $peer({ host: '54.67.7.8', port: 9030, ssl: false }),
          new $peer({ host: '54.193.96.185', port: 9030, ssl: false }),
	  new $peer({ host: '54.193.74.250', port: 9030, ssl: false }),
	  new $peer({ host: '54.67.93.228', port: 9030, ssl: false }),
	  new $peer({ host: '54.183.21.26', port: 9030, ssl: false }),
          new $peer({ host: '54.153.44.24', port: 9030, ssl: false }),
     	  new $peer({ host: '54.241.140.106', port: 9030, ssl: false }),
      	  new $peer({ host: '54.153.117.209', port: 9030, ssl: false })
        ],
        public: [],
        testnet: [
          new $peer({ host: '52.66.184.223', port: 9028, ssl: false }),
          new $peer({ host: '34.211.111.67', port: 9028, ssl: false }),
          new $peer({ host: '13.59.176.127', port: 9028, ssl: false }),
          new $peer({ host: '54.175.122.162', port: 9028, ssl: false }),
          new $peer({ host: '13.126.40.180', port: 9028, ssl: false }),
          new $peer({ host: '54.93.85.178', port: 9028, ssl: false }),
          new $peer({ host: '54.246.214.229', port: 9028, ssl: false }),
          new $peer({ host: '35.182.28.68', port: 9028, ssl: false }),
          new $peer({ host: '54.153.35.65', port: 9028, ssl: false }),
          new $peer({ host: '54.252.170.222', port: 9028, ssl: false }),
          new $peer({ host: '13.124.137.65', port: 9028, ssl: false }),
          new $peer({ host: '52.78.18.248', port: 9028, ssl: false }),
          new $peer({ host: '54.206.6.159', port: 9028, ssl: false }),
          new $peer({ host: '54.183.178.42', port: 9028, ssl: false }),
          new $peer({ host: '54.241.135.25', port: 9028, ssl: false }),
          new $peer({ host: '52.60.226.39', port: 9028, ssl: false }),
          new $peer({ host: '52.60.223.205', port: 9028, ssl: false }),
          new $peer({ host: '176.34.156.16', port: 9028, ssl: false }),
          new $peer({ host: '54.154.120.195', port: 9028, ssl: false }),
          new $peer({ host: '54.93.33.249', port: 9028, ssl: false })
        ]
      }

      this.check()
    }

    reset (active) {
      $timeout.cancel(this.timeout)

      if (active) {
        this.active = undefined
      }
    }

    setActive () {
      this.active = _.chain([])
        .concat(this.stack.official, this.stack.public)
        .sample()
        .value()

      this.check()
    }

    check () {
      this.reset()

      let next = () => this.timeout = $timeout(this.check.bind(this), UPDATE_INTERVAL_CHECK)

      if (!this.active) {
        return next()
      }

      this.active.status()
        .then(() => this.online = true)
        .catch(() => this.online = false)
        .finally(() => next())
    }
  }

  return new $peers()
})
