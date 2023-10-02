const Patient = require('../../../models/Patient')

const updatePatient = async (req, res) => {
  try {
    const {patientId} = req.params
    const patient = await Patient.findOneAndUpdate(
      {_id: patientId},
      {$set: req.body},
      {new: true}
    )

    if (!patient) {
      return res.status(400).json({
        success: false,
        message: 'Patient not found',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Patient updated successfully',
      patient,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}

module.exports = updatePatient
