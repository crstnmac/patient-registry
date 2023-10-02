const router = require('express').Router()

const {
  addPatient,
  getPatientById,
  getPatients,
  deletePatientById,
  addCheckup,
  getCheckups,
  uploadPatientData,
  deleteCheckup,
  updateCheckup,
  updatePatient,
} = require('../../controllers/patients')

router.get('/', async (req, res) => {
  return res.send('Patients service running...')
})

router.post('/add-patient', async (req, res) => {
  await addPatient(req, res)
})

// Create a new checkup for a patient
router.post('/:patientId/add-checkup', async (req, res) => {
  await addCheckup(req, res)
})

router.get('/:patientId/get-checkups', async (req, res) => {
  await getCheckups(req, res)
})

router.put('/update-patient/:patientId', async (req, res) => {
  await updatePatient(req, res)
})

router.put('/:patientId/update-checkup/:checkupId', async (req, res) => {
  await updateCheckup(req, res)
})

router.delete('/delete-checkup/:checkupId', async (req, res) => {
  await deleteCheckup(req, res)
})

router.get('/get-patient-by-id', async (req, res) => {
  await getPatientById(req, res)
})

router.get('/get-patients', async (req, res) => {
  await getPatients(req, res)
})

router.delete('/delete-patient/:patientId', async (req, res) => {
  await deletePatientById(req, res)
})

router.post('/upload-patient-data', async (req, res) => {
  await uploadPatientData(req, res)
})

module.exports = router
