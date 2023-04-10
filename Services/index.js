const { Customer } = require('./customerService')
const { ContactAgent } = require('./contactAgentService')

module.exports = {
  CustomerService: Customer,
  ContactAgentService: ContactAgent,
}
