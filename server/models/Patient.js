const { Schema, model } = require('mongoose');

const patientSchema = new Schema({
  cr_number: String,
  name: String,
  age: Number,
  gender: String,
  state: String,
  smoking: String,
  family_history: String,
  gene: String,
  variant: String,
  treatment_at_rgci: String,
  phone_number: String,
  status_at_last_follow_up: String,
  date_of_last_follow_up: Date,
  checkups: [{
    type: Schema.Types.ObjectId,
    ref: 'Checkup'
  }]
})

patientSchema.index({ cr_number: 1 }, { unique: true });

module.exports = model('Patient', patientSchema);
