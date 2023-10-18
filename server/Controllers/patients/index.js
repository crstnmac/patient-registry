const addPatient = require('./addPatient')
const getPatientById = require('./getPatientById')
const getPatients = require('./getPatients')
const deletePatientsById = require('./deletePatientsById')
const addLOT = require('./addLOT')
const getLOTs = require('./getLOTs')
const uploadPatientData = require('./uploadPatientData')
const deleteLOT = require('./deleteLOT')
const updatePatient = require('./updatePatient')
const updateLOT = require('./updateLOT')

module.exports = {
  addPatient,
  getPatientById,
  getPatients,
  deletePatientsById,
  addLOT,
  getLOTs,
  uploadPatientData,
  deleteLOT,
  updatePatient,
  updateLOT,
}
