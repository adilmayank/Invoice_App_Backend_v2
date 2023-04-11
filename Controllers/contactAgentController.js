class ContactAgentController {
  constructor(contactAgentService) {
    this.contactAgentService = contactAgentService
  }

  addContactAgent = async (req, res) => {
    const { data } = req.body

    try {
      const newContactAgent = await this.contactAgentService.addContactAgent(
        data
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
    const { id, data } = req.body

    try {
      const updatedContactAgent =
        await this.contactAgentService.updateContactAgent(id, data)

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
    const { id } = req.body

    try {
      const removedContactAgent =
        await this.contactAgentService.removeContactAgent(id)
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
