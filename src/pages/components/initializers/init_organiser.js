import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper'

const useSessionStorage = (name) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(JSON.parse(sessionStorage.getItem(name)));
  }, [])

  return value
}

const report_types = ['Histopathology', 'Neuropathology', 'Radiology', 'cytopathology'];

const reports_init = [
  {
    "tempRepID": "abcd",
    "originalname": "abcd",
    "report_type": "abcd",
    "reportDate": "26/06/1999",
    "impression": "good",
    "saved_filename": "goody",
    "organizerID": "62a4274c1c54a3fb0973fdbc",
    "phrID": "62a34d0e3e182b8478bb5cdc"
  },

  {
    "tempRepID": "efgh",
    "originalname": "efgh",
    "report_type": "efgh",
    "reportDate": "30/08/2021",
    "impression": "noice",
    "saved_filename": "dunno",
    "organizerID": "62a4274c1c54a3fb0973fdbc",
    "phrID": "62a34d0e3e182b8478bb5cdc"
  },
]

const initial_report_entry = {
  "tempRepID": "",
  "originalname": "",
  "report_type": "",
  "reportDate": "",
  "impression": "",
  "saved_filename": "",
  "organizerID": "62a4274c1c54a3fb0973fdbc",
  "phrID": "62a34d0e3e182b8478bb5cdc"
}




// ======================== Staging ==========================

const initial_staging = [
  {
    "staging_type": "TNM",
    "Date_staged": "2022-07-05T16:47:00.150Z",
    "Stage": "Stage IA1",
    "Criteria": [
      "T1a",
      "N0",
      "M0"
    ],
    "Basis": "Pathological",
    "DX_Site": "Small Cell Lung Cancer",
    "_id": "62c46b04eff42b38b2c584a7"
  },
  {
    "staging_type": "TNM",
    "Date_staged": "2022-07-05T16:47:00.150Z",
    "Stage": "Stage IA1",
    "Criteria": [
      "T1a",
      "N0",
      "M0"
    ],
    "Basis": "Pathological",
    "DX_Site": "Small Cell Lung Cancer",
    "_id": "62c46b04eff42b38b2c584a8"
  }
]



// ====================== TNM ================================



// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));


const tnm_staging_fields_init = {
  "staging_type": "TNM",
  "Date_staged": "",
  "Stage": "",
  "Criteria": ['','',''],
  "Basis": "",
  "DX_Site": "",
}



const tnm_init = [
  { name: 'T', value: '' },
  { name: 'N', value: '' },
  { name: 'M', value: '' },
]




const t_values = [
  { code: 'TX', definition: 'Primary tumor cannot be assessed' },
  { code: 'T0', definition: 'No evidence of primary tumor' },
  { code: 'T1', definition: 'Tumor less than or equal to 7 cm in greatest dimension, limited to kidney' },
  { code: 'T1a', definition: 'Tumor less than equal to 4 cm in greatest dimension, limited to kidney' },
  { code: 'T1b', definition: 'Tumor greater than 4 cm but less than or equal to 7 cm in greatest dimension, limited to kidney' },
  { code: 'T2', definition: 'Tumor greater than 7 cm in greatest dimension, limited to kidney' },
  { code: 'T2a', definition: 'Tumor greater than 7 cm but less than or equal to 10 cm in greatest dimension, limited to kidney' },
  { code: 'T2b', definition: 'Tumor greater than 10 cm, limited to kidney' },
  { code: 'T3', definition: 'Tumor extends into major veins and perinephric tissues, but not into the ipsilateral adrenal gland and not beyond Gerota\'s fascia' },
  { code: 'T3a', definition: 'Tumor extends into renal veins or its segmental branches or invades the pelvicalyceal system or invades perirenal and/or renal sinus beyond fascia' },
  { code: 'T3b', definition: 'Tumor extends into vena cava below the diaphragm' },
  { code: 'T3c', definition: 'Tumor extends into vena cava below the diaphragm or invades the wall of vena cava' },
  { code: 'T4', definition: 'Tumor invades beyond Gerota\'s fascia' }
];

const n_values = [
  { code: 'NX', definition: 'Regional lymphs cannot be assessed' },
  { code: 'N0', definition: 'No regional lymph node metastatis' },
  { code: 'N1', definition: 'Metastatis in regional lymph node' },
];

const m_values = [
  { code: 'M0', definition: 'No distant metastatis' },
  { code: 'M1', definition: 'Distant metastasis' },
];




const tnm_map = new Map([
  ['T', t_values],
  ['N', n_values],
  ['M', m_values]
]);


// const check = (z) => {
//   if (check_map.has(z))
//       return check_map.get(z);
//   else {
//       return 0;
//   }
// }

//  ==========================  CASE SUMMARY ===========================

const patient_info_init = {
  name: 'Alexander Flemming',
  age: 55,
  phone_number: 9775704198,
  gender: 'Male',
  cancer_type: 'Lung Cancer'
}

function getAge(dateString) {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}

const base_url = "http://localhost:3001/api/organizers"


export { useSessionStorage, report_types, reports_init, initial_report_entry, initial_staging,
          tnm_init, tnm_map, tnm_staging_fields_init, patient_info_init, base_url };