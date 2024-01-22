const Patient = require('../../../models/Patient')

function getDataBasedOnField(field) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await Patient.aggregate([
        {
          $group: {
            _id: `$${field}`,
            type: {$first: `$${field}`},
            value: {$sum: 1},
          },
        },
      ])
      resolve(data)
    } catch (err) {
      reject(err)
    }
  })
}

function getDataForBarChart(field) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await Patient.aggregate([
        {
          $group: {
            _id: {
              $dateToString: {
                format: '%Y-%m-%d',
                date: `$${field}`,
              },
            },
            type: {$first: `$${field}`},
            value: {$sum: 1},
          },
        },
      ])
      resolve(data)
    } catch (err) {
      reject(err)
    }
  })
}

const pieChart = async (req, res) => {
  try {
    const field = req.body.field

    let data = []
    if (
      field === 'age' ||
      field === 'dob' ||
      field === 'date_of_last_follow_up' ||
      field === 'date_of_hpe_diagnosis' ||
      field === 'small_cell_transformation_date' ||
      field === 'date_of_hpe_diagnosis'
    ) {
      data = await getDataForBarChart(field)
    } else {
      data = await getDataBasedOnField(field)
    }
    
    // Send the response with the data
    return res.status(200).json({
      message: 'Data fetched successfully',
      chartData: data,
    })
  } catch (err) {
    return res.status(500).json({
      message: 'Unable to fetch data',
      error: err.message,
    })
  }
}

module.exports = pieChart
