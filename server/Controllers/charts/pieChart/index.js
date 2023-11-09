const Patient = require("../../../models/Patient")

const pieChart = async (req, res) => {
  try {
    const patients = await Patient.aggregate([
      {
        $match: {
          is_deleted: false,
        },
      },
      {
        $group: {
          _id: '$gender',
          count: { $sum: 1 },
        },
      },
    ])

    return res.status(200).json({
      message: 'Pie Chart Data',
      patients,
    })
  } catch (err) {
    return res.status(500).json({
      message: 'Unable to fetch data',
      error: err.message,
    })
  }
}

module.exports = pieChart