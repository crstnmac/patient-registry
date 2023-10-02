const Checkup = require('../../../models/Checkup')

const addCheckup = async (req, res) => {
  try {
    const patientId = req.params.patientId
    const checkupData = req.body
    const checkup = new Checkup(checkupData)

    checkup.patient = patientId

    //limit to only 5 subsequent checkups

    const checkups = await Checkup.find({patient: patientId}).sort({
      date: -1,
    })

    if (!checkup) {
      return res.status(400).json({error: 'Failed to create checkup'})
    }

    if (checkups.length >= 5) {
      return res.status(400).json({
        error: 'You can only have 5 checkups per patient',
      })
    } else {
      await checkup.save()
      res.status(200).json({
        message: 'Checkup added successfully',
        checkup,
      })
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).json({error: 'Failed to create checkup'})
  }
}

module.exports = addCheckup
