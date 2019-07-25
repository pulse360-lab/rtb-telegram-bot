const factory = require('error-factory')

module.exports = {
  routeNotFoundError: factory('routeNotFoundError'),
  serviceUnavailable: factory('serviceUnavailable')
}