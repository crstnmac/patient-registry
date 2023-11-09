const User = require("../../../models/User")

const addUser = async (req, res) => {
  try {
    const user = new User(req.body)

    await user.save()
    return res.status(200).json({
      message: 'User added successfully',
      user
    })
  }catch (err) {
    return res.status(500).json({
      message: 'Unable to add user',
      error: err.message
    })
  }
}

module.exports = addUser