
const Patient = require('../../../models/Patient');

const addPatient = async (req, res) => {
  try {
    const patient = new Patient(req.body)

    await patient.save()
    return res.status(200).json({
      message: 'Patient added successfully',
      patient
    })
  }catch (err) {
    return res.status(500).json({
      message: 'Unable to add patient',
      error: err.message
    })
  }
}
 
module.exports = addPatient
