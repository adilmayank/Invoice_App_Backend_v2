const formatResponse = (req, res, next) => {
  res.formattedJson = (error, success, message, data) => {
    if (error) {
      res.json({
        success: success,
        message: message,
      })
    } else {
      res.json({
        success: success,
        message: message,
        data: data,
      })
    }
  }
  next()
}

module.exports = { formatResponse }
