const Patient = require('../../../models/Patient')

const getPatients = async (req, res) => {
  try {
    const params = new URLSearchParams(req.query)
    const page = parseInt(params.get('page')) || 1
    const perPage = parseInt(params.get('rowsPerPage')) || 10
    const sort = params.get('sort') || 'createdAt'
    const order = params.get('order') || 'ascend'
    const search = params.get('search') || ''

    // Make filters array of objects
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
        param === 'dob' ||
        param === 'date_of_last_follow_up' ||
        param === 'date_of_hpe_diagnosis' ||
        param === 'small_cell_transformation_date' ||
        param === 'date_of_hpe_diagnosis'
      ) {
        const parts = value.split(',')

        const lte = parts[0] ? new Date(parts[0]) : new Date()
        const gte = parts[1] ? new Date(parts[1]) : new Date()

        filters[param] = {
          $gte: lte,
          $lte: gte,
        }
        continue
      }

      const regexPattern = {
        $regex: new RegExp(params.get(param) || '', 'i'),
      }

      filters[param] = regexPattern
    }
    // Remove filters with empty values
    Object.keys(filters).forEach(
      (key) => (filters[key] === '' || undefined) && delete filters[key]
    )

    const patients = await Patient.aggregate([
      {
        $match: {
          ...filters,
          $and: [
            {
              $or: [
                // Patient fields
                {cr_number: {$regex: new RegExp(search, 'i')}},
                {name: {$regex: new RegExp(search, 'i')}},
                {age: {$regex: new RegExp(search, 'i')}},
                {dob: {$regex: new RegExp(search, 'i')}},
              ],
            },
            {is_deleted: false},
          ],
        },
      },
      {
        $lookup: {
          from: 'LOT',
          localField: 'lots',
          foreignField: '_id',
          as: 'lots',
        },
      },
      {
        $sort: {[sort]: order === 'createdAt' ? 1 : -1},
      },
      // {
      //   $skip: (page - 1) * perPage,
      // },
      // {
      //   $limit: perPage,
      // },
    ])

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
