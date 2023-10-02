const Checkup = require('../../../models/Checkup')

const updateCheckup = async (req, res) => {
  try {
    const {checkupId, patientId} = req.params
    const checkup = await Checkup.findOneAndUpdate(
      {_id: checkupId},
      {$set: req.body},
      {new: true}
    )

    if (!checkup) {
      return res.status(400).json({
        success: false,
        message: 'Checkup not found',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Checkup updated successfully',
      checkup,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}

module.exports = updateCheckup
