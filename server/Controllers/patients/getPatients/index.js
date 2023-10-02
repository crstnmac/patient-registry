const Patient = require('../../../models/Patient')
const Checkup = require('../../../models/Checkup')

const getPatients = async (req, res) => {
  try {
    //get patients and populate checkups using patientId
    const patients = await Patient.find({})
    const patientCount = await Patient.countDocuments({})

    //agregate checkups by patientId
    const patientsWithCheckups = await Patient.aggregate([
      {
        $lookup: {
          from: 'checkups',
          localField: '_id',
          foreignField: 'patient',
          as: 'checkups',
        },
      },
    ])

    return res.status(200).json({
      success: true,
      patients: patientsWithCheckups,
      totalCount: patientCount,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    })
  }
}

module.exports = getPatients
