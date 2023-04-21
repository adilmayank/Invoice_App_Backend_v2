class ContactAgentController {
  constructor(contactAgentService) {
    this.contactAgentService = contactAgentService
  }

  getAllContactAgents = async (req, res) => {
    try {
      const allContactAgents =
        await this.contactAgentService.getAllContactAgents()
      res.formattedJson(
        null,
        true,
        'Contact Agent Fetched successfully',
        allContactAgents
      )
    } catch (error) {
      res.formattedJson(true, false, error.message, null)
    }
  }

  addContactAgent = async (req, res) => {
    try {
      const data = req.body
      // some controller validation steps that return in a validated data or throws an error
      const validatedData = { ...data }
      const newContactAgent = await this.contactAgentService.addContactAgent(
        validatedData
      )
      res.formattedJson(
        null,
        true,
        'Contact Agent Created successfully',
        newContactAgent
      )
    } catch (error) {
      res.formattedJson(true, false, error.message, null)
    }
  }

  updateContactAgent = async (req, res) => {
    try {
      const { contactAgentId } = req.params
      const data = req.body
      // some controller validation steps that return in a validated data or throws an error
      const validatedData = { ...data }
      const updatedContactAgent =
        await this.contactAgentService.updateContactAgent(
          contactAgentId,
          validatedData
        )

      if (updatedContactAgent instanceof Error) {
        throw new Error(updatedContactAgent.message)
      } else {
        res.formattedJson(
          null,
          true,
          'Contact Agent Updated Successfully',
          updatedContactAgent
        )
      }
    } catch (error) {
      res.formattedJson(true, false, error.message, null)
    }
  }

  removeContactAgent = async (req, res) => {
    try {
      const { contactAgentId } = req.params
      const removedContactAgent =
        await this.contactAgentService.removeContactAgent(contactAgentId)
      if (removedContactAgent instanceof Error) {
        throw new Error(removedContactAgent.message)
      } else {
        res.formattedJson(
          null,
          true,
          'Contact Agent Removed Successfully',
          removedContactAgent
        )
      }
    } catch (error) {
      res.formattedJson(true, false, error.message, null)
    }
  }
}

module.exports = { ContactAgentController }
