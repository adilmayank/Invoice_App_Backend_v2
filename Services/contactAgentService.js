class ContactAgent {
  constructor(contactAgentRepository) {
    this.contactAgentRepository = contactAgentRepository
  }

  // data validation logic here
  validation(type) {}

  async getSingleContactAgent(contactAgentId) {
    try {
      const singleContactAgent =
        await this.contactAgentRepository.getSingleContactAgent(contactAgentId)
      return singleContactAgent
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getAllContactAgents() {
    try {
      const allContactAgents =
        await this.contactAgentRepository.getAllContactAgents()
      return allContactAgents
    } catch (error) {
      throw new Error(error.message)
    }
  }

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

  async updateContactAgent(contactAgentId, data) {
    try {
      const udpatedContactAgent =
        await this.contactAgentRepository.updateContactAgent(contactAgentId, data)
      return udpatedContactAgent
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async removeContactAgent(contactAgentId) {
    try {
      const removedContactAgent =
        await this.contactAgentRepository.removeContactAgent(contactAgentId)
      return removedContactAgent
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

module.exports = { ContactAgent }
