import { prepareHeaders } from "@/utils/util"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export namespace PatientTable {
  export interface Checkup {
    _id: string
    treatment: string
    drug_name_targeted: string
    drug_name_chemo: string
    drug_name_immuno: string
    date_of_start_of_treatment: string // Assuming this is a date string
    response_pet_ct: string
    intracranial_response: string
    progressed_on_line: string
    date_of_progression: string // Assuming this is a date string
    biopsy_line_of_progression: string
    ngs_at_progression: string
    ngs_result: string
    other_remarks: string
    patientId: string // Assuming this is a patient id
  }

  export interface Patient {
    _id: string
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
    date_of_last_follow_up: string
    checkups?: Checkup[]
  }

  export interface ResGetPatientTable {
    patients: Patient[]
    totalCount: number
    success: boolean
  }

  export interface ResDeletePatient {
    success: boolean
    message: string
  }

  export interface ResUploadPatientData {
    success: boolean
    totalRows: number
    insertedRows: number
    failedRows: Array<number>
  }
}

const patientTableApi = createApi({
  reducerPath: "patientTable",
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3003/api/patients",
    prepareHeaders: prepareHeaders,
  }),
  endpoints: (builder) => ({
    getPatients: builder.query<PatientTable.ResGetPatientTable, {}>({
      query: () => ({
        url: `/get-patients`,
        method: "GET",
      }),
    }),
    addPatient: builder.mutation<PatientTable.Patient, PatientTable.Patient>({
      query: (body) => ({
        url: `/add-patient`,
        method: "POST",
        body,
      }),
    }),
    updatePatient: builder.mutation<PatientTable.Patient, PatientTable.Patient>(
      {
        query(data) {
          const { _id, ...body } = data
          return {
            url: `/update-patient/${_id}`,
            method: "PUT",
            body,
          }
        },
      },
    ),
    addCheckup: builder.mutation<PatientTable.Checkup, PatientTable.Checkup>({
      query(data) {
        const { patientId, ...body } = data
        return {
          url: `${patientId}/add-checkup`,
          method: "POST",
          body,
        }
      },
    }),
    updateCheckup: builder.mutation<PatientTable.Checkup, PatientTable.Checkup>(
      {
        query(data) {
          const { patientId, _id, ...body } = data
          return {
            url: `${patientId}/update-checkup/${_id}`,
            method: "PUT",
            body,
          }
        },
      },
    ),
    deleteCheckup: builder.mutation<{}, string>({
      query: (id) => ({
        url: `/delete-checkup/${id}`,
        method: "DELETE",
      }),
    }),
    getCheckups: builder.query<PatientTable.Checkup[], string>({
      query: (patientId) => ({
        url: `${patientId}/get-checkups/`,
        method: "GET",
      }),
    }),
    deletePatient: builder.mutation<PatientTable.ResDeletePatient, string>({
      query: (id) => ({
        url: `/delete-patient/${id}`,
        method: "DELETE",
      }),
    }),
    uploadPatientData: builder.mutation<
      PatientTable.ResUploadPatientData,
      FormData
    >({
      query: (data) => ({
        url: `/upload-patient-data`,
        method: "POST",
        body: data,
      }),
    }),
  }),
})

export default patientTableApi
