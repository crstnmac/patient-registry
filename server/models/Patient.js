const {Schema, model} = require('mongoose')

const patientSchema = new Schema({
  cr_number: String,
  name: String,
  age: String,
  dob: String,
  gender: String,
  state: String,
  smoking: String,
  family_history: String,
  gene: String,
  variant: String,
  treatment_at_rgci: String,
  phone_number: String,
  status_at_last_follow_up: String,
  date_of_last_follow_up: String,
  //progressive data
  date_of_hpe_diagnosis: String,
  ecog_ps: String,
  extrathoracic_mets: String,
  brain_mets: String,
  letptomeningeal_mets: String,
  lm_mets_csf: String,
  histology: String,
  pdl1: String,
  brg1: String,
  ttf1: String,
  small_cell_transformation_date: String,
  vaf: String,
  co_mutation: String,
  is_deleted: {
    type: Boolean,
    default: false,
  },
  lots: [
    {
      type: Schema.Types.ObjectId,
      ref: 'LOT',
    },
  ],
})

patientSchema.index({cr_number: 1}, {unique: true})

module.exports = model('Patient', patientSchema)
