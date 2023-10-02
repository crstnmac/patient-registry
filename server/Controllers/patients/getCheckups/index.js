const Checkup = require('../../../models/Checkup');

const getCheckups = async (req, res) => {
  try {
    const patientId = req.params.patientId
    console.log('patientId', patientId)
    const checkups = await Checkup.find({ patient: patientId })
      // .populate(
      //   'patient'
       // )
        res.json(checkups)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({error: 'Failed to retrieve checkups'})
  }
}
 
module.exports = getCheckups