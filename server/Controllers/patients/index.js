const addPatient = require('./addPatient')
const getPatientById = require('./getPatientById')
const getPatients = require('./getPatients')
const deletePatientById = require('./deletePatientById')
const addCheckup = require('./addCheckup')
const getCheckups = require('./getCheckups')
const uploadPatientData = require('./uploadPatientData')
const deleteCheckup = require('./deleteCheckup')
const updatePatient = require('./updatePatient')
const updateCheckup = require('./updateCheckup')


module.exports = {
  addPatient,
  getPatientById,
  getPatients,
  deletePatientById,
  addCheckup,
  getCheckups,
  uploadPatientData,
  deleteCheckup,
  updatePatient,
  updateCheckup,
}
