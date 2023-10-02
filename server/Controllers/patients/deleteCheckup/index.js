const Checkup = require('../../../models/Checkup');

const deleteCheckup = async (req, res) => {
  try {
    const checkupId = req.params.checkupId
    console.log('checkupId', checkupId)
    const checkup = await Checkup.findByIdAndDelete(checkupId)
    res.status(200).json({
      message: 'Checkup deleted successfully'
    })
  }catch (err) {
    console.error(err.message)
    res.status(500).json({error: 'Failed to delete checkup'})
  }
}

module.exports = deleteCheckup