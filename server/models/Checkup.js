const {Schema, model} = require('mongoose')

const checkupSchema = new Schema({
  treatment: String,
  drug_name_targeted: String,
  drug_name_chemo: String,
  drug_name_immuno: String,
  date_of_start_of_treatment: Date,
  response_pet_ct: String,
  intracranial_response: String,
  progressed_on_line: String,
  date_of_progression: Date,
  biopsy_progression: String,
  ngs_at_progression: String,
  ngs_result: String,
  other_remarks: String,
  patient: {
    type: Schema.Types.ObjectId,
    ref: 'Patient'
  }
})

module.exports = model('Checkup', checkupSchema)