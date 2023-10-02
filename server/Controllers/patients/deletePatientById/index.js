const Patient = require('../../../models/Patient')
const Checkup = require('../../../models/Checkup')

const deletePatientById = async (req, res) => {
  try {
    const patientId = req.params.patientId

    const patient = await Patient.findByIdAndDelete({
      _id: patientId,
    })
    //delete patient checkups

    if (!patient)
      return res.status(404).json({success: false, error: 'Patient not found'})

    await Checkup.deleteMany({patient: patientId})

    return res.status(200).json({
      success: true,
      patientId,
      message: 'Patient deleted successfully',
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}

module.exports = deletePatientById
