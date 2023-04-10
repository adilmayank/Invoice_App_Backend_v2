class ContactAgentRepository {
  constructor(contactAgentModel) {
    this.contactAgentModel = contactAgentModel
  }

  async addContactAgent(data) {
    const { name, emailId, phoneNumber } = data
    try {
      const newContactAgent = await this.contactAgentModel({
        name,
        emailId,
        phoneNumber,
      }).save()
      return newContactAgent._id
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateContactAgent(id, data) {
    try {
      const updatedContactAgent = await this.contactAgentModel.findByIdAndUpdate(id, data, { new: true })
      if(updatedContactAgent === null) {
        return new Error("No record found with the provided id.")
      }
      return updatedContactAgent._id
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async removeContactAgent(id) {
    try {
      const removedContactAgent = await this.contactAgentModel.findByIdAndRemove(id)
      if(removedContactAgent === null) {
        return new Error("No record found with the provided id.")
      }
      return removedContactAgent
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

module.exports = { ContactAgentRepository }