const Patient = require('../../../models/Patient')
const LOT = require('../../../models/LOT')

const getPatients = async (req, res) => {
  try {
    const params = new URLSearchParams(req.query)
    const page = parseInt(params.get('page')) || 1
    const perPage = parseInt(params.get('rowsPerPage')) || 10
    const sort = params.get('sort') || 'createdAt'
    const order = params.get('order') || 'ascend'
    const search = params.get('search') || ''

    //make filters array of objects
    const filters = {}
    for (const [param, value] of params) {
      // Create a regex pattern for each parameter's value (case-insensitive)
      if (
        param === 'page' ||
        param === 'rowsPerPage' ||
        param === 'sort' ||
        param === 'order' ||
        param === 'search'
      )
        continue

      if (
        param === 'date_of_last_follow_up' ||
        param === 'small_cell_transformation_date' ||
        param === 'date_of_hpe_diagnosis'
      ) {
        const parts = value.split('/')
        const date = new Date(
          parts[2],
          parts[1] - 1,
          (parseInt(parts[0]) + 1).toString()
        ).toISOString()
        filters[param] = {
          $lte: date,
          $gte: new Date(parts[2], parts[1] - 1, parts[0]).toISOString(),
        }
        continue
      }
      const regexPattern = {
        $regex: new RegExp(params.get(param) || '', 'i'),
      }
      filters[param] = regexPattern
    }
    // remove filters with empty values
    Object.keys(filters).forEach(
      (key) => (filters[key] === '' || undefined) && delete filters[key]
    )

    const patients = await Patient.aggregate([
      {
        $match: {
          ...filters,
          is_deleted: false,
        },
      },
      {
        $match: {
          $or: [
            {cr_number: {$regex: new RegExp(search, 'i')}},
            {name: {$regex: new RegExp(search, 'i')}},
          ],
        },
      },
    ])
      .sort({[sort]: order === 'ascend' ? 1 : -1})
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec()

    const patientCount = await Patient.countDocuments({
      ...filters,
      is_deleted: false,
    })

    return res.status(200).json({
      success: true,
      patients: patients,
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
