const PatientModel = require('../../../models/Patient') // Import your Mongoose model here
const CheckupModel = require('../../../models/Checkup') // Import your Mongoose model here

const processBatch = async (batch) => {
  try {
    const treatments = ['l1', 'l2', 'l3', 'l4', 'l5']

    for (const rowData of batch) {
      const patientData = {
        cr_number: rowData['CR_Number'],
        name: rowData['Name'] || '', // Use a default empty string if 'Name' is undefined
        age: rowData['Age'] || '', // Use a default empty string if 'Age' is undefined
        gender: rowData['Gender'],
        state: rowData['State'],
        smoking: rowData['Smoking'],
        family_history: rowData['Family_history'],
        gene: rowData['Gene'],
        variant: rowData['Variant'],
        treatment_at_rgci: rowData['Treatment_At_RGCI'],
        phone_number: rowData['Phone_number'],
        status_at_last_follow_up: rowData['Status_at_last_follow_up'],
        date_of_last_follow_up: rowData['Date_of_Last_follow_up'],
      }

      try {
        const patient = new PatientModel(patientData)

        await patient.save()

        for (const tr of treatments) {
          const checkupData = {
            patient: patient._id,
            treatment: rowData[`${tr}_line_rx`],
            drug_name_targeted: rowData[`${tr}_Drug_Name_Targeted`],
            drug_name_chemo: rowData[`${tr}_Drug_Name_Chemotherapy`],
            drug_name_immuno: rowData[`${tr}_Drug_Name_Immuno`],
            date_of_start_of_treatment:
              rowData[`${tr}_Date_of_start_of_Rx`],
            response_pet_ct: rowData[`${tr}_Response_PET_CT`],
            intracranial_response: rowData[`${tr}_Intracranial_response`],
            progressed_on_line: rowData[`${tr}_Progressed_on_line`],
            date_of_progression: rowData[`${tr}_Date_of_Progression`],
            biopsy_progression: rowData[`${tr}_Biopsy_line_Progression`],
            ngs_at_progression: rowData[`${tr}_NGS_at_progression`],
            ngs_result: rowData[`${tr}_NGS_result`],
            other_remarks: rowData[`${tr}_Other_remarks`],
          }

          const checkup = new CheckupModel(checkupData)

          try {
            await checkup.save()
          } catch (err) {
            console.error(`Error saving checkup: ${err}`) // Use 'err' instead of 'error' for the error object
          }
        }
      } catch (err) {
        console.error(`Error creating patient: ${err}`) // Use 'err' instead of 'error' for the error object
      }
    }

    return {success: true, insertedCount: batch.length, failedRows: []}
  } catch (error) {
    const failedRows = batch.map((row) => row.CR_Number) // Replace 'rowId' with the actual ID property name in your data
    return {success: false, insertedCount: 0, failedRows}
  }
}

module.exports = processBatch
