export interface IPatientCheckup {
  treatment: string
  drug_name_targeted: string
  drug_name_chemo: string
  drug_name_immuno: string
  date_of_start_of_treatment: Date
  response_pet_ct: string
  intracranial_response: string
  progressed_on_line: string
  date_of_progression: Date
  biopsy_line_of_progression: string
  ngs_at_progression: string
  ngs_result: string
}

export interface IPatient {
  cr_number: string
  name: string
  age: number
  gender: string
  state: string
  smoking: string
  family_history: string
  gene: string
  variant: string
  treatment_at_rgci: string
  phone_number: string
  status_at_last_follow_up: string
  date_of_last_follow_up: Date
  checkups?: IPatientCheckup[]
}
