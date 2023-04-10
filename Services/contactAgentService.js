class ContactAgent {
  constructor(contactAgentRepository) {
    this.contactAgentRepository = contactAgentRepository
  }

  // data validation logic here
  validation(type) {}

  async addContactAgent(data) {
    try {
      const newContactAgent = await this.contactAgentRepository.addContactAgent(
        data
      )
      return newContactAgent
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateContactAgent(id, data) {
    try {
      const udpatedContactAgent =
        await this.contactAgentRepository.updateContactAgent(id, data)
      return udpatedContactAgent
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async removeContactAgent(id, data) {
    try {
      const removedContactAgent =
        await this.contactAgentRepository.removeContactAgent(id, data)
      return removedContactAgent
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

module.exports = { ContactAgent }
