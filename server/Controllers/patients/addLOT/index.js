const LOT = require('../../../models/LOT')
const mongoose = require('mongoose')

const addLOT = async (req, res) => {
  try {
    const patientId = new mongoose.Types.ObjectId(req.params.patientId)
    const checkupData = req.body
    const lot = new LOT(checkupData)

    lot.patient = patientId

    //limit to only 5 subsequent lots

    const lots = await LOT.find({patient: patientId}).sort({
      date: -1,
    })

    if (!lot) {
      return res.status(400).json({error: 'Failed to create lot'})
    }

    if (lots.length >= 5) {
      return res.status(400).json({
        error: 'You can only have 5 lots per patient',
      })
    } else {
      await lot.save()
      res.status(200).json({
        message: 'LOT added successfully',
        lot,
      })
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).json({error: 'Failed to create lot'})
  }
}

module.exports = addLOT
