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

const setSessionStorage=(name, value) => {
  sessionStorage.setItem(name, JSON.stringify(value));
}

const delSessionStorage=(name) => {
  sessionStorage.removeItem(name);
}

// const useLocalStorage = (name) => {
//     const [value, setValue] = useState('')
  
//     useEffect(() => {
//       setValue(JSON.parse(localStorage.getItem(name)));
//     }, [])
  
//     return value
//   }

const report_types_init = ['Histopathology', 'Neuropathology', 'Radiology', 'cytopathology'];

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
//   "Date_staged": "",
  // "Stage": "",
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



const base_url = "http://localhost:3001/api/organizers";
// const base_url = "http://192.168.16.133:3001/api/organizers"


const base_url2 = "http://localhost:3001/api/organizerMW";


const base_url3 = "http://localhost:3001/api/cancer_records";


const tnm_criteria_init = [
  {
      "criteria_name": "T",
      "criteria_code": [
          {
              "name": "TX",
              "description": "Primary tumor cannot be assessed",
              "_id": "62caf0b7a8394e529d6a15c0"
          },
          {
              "name": "T0",
              "description": " No evidence of primary tumor",
              "_id": "62caf0b7a8394e529d6a15c1"
          },
          {
              "name": "Tis (DCIS)",
              "description": "Ductal carcinoma in situ",
              "_id": "62caf0b7a8394e529d6a15c2"
          },
          {
              "name": "Tis (Paget)",
              "description": "Paget disease of the nipple NOT associated with invasive carcinoma and/or carcinoma in situ (DCIS) in the underlying breast parenchyma. Carcinomas in the breast parenchyma associated with Paget disease are categorized based on the size and characteristics of the parenchymal disease, although the presence of Paget disease should still be noted",
              "_id": "62caf0b7a8394e529d6a15c3"
          },
          {
              "name": "T1",
              "description": "Tumor ≤20 mm in greatest dimension",
              "_id": "62caf0b7a8394e529d6a15c4"
          },
          {
              "name": "T1mi",
              "description": "Tumor ≤1 mm in greatest dimension",
              "_id": "62caf0b7a8394e529d6a15c5"
          },
          {
              "name": "T1a",
              "description": "Tumor >1 mm but ≤5 mm in greatest dimension (round any measurement >1.0–1.9 mm to 2 mm)",
              "_id": "62caf0b7a8394e529d6a15c6"
          },
          {
              "name": "T1b",
              "description": "Tumor >5 mm but ≤10 mm in greatest dimension",
              "_id": "62caf0b7a8394e529d6a15c7"
          },
          {
              "name": "T1c",
              "description": "Tumor >10 mm but ≤20 mm in greatest dimension",
              "_id": "62caf0b7a8394e529d6a15c8"
          },
          {
              "name": "T2",
              "description": "Tumor >20 mm but ≤50 mm in greatest dimension",
              "_id": "62caf0b7a8394e529d6a15c9"
          },
          {
              "name": "T3",
              "description": "Tumor >50 mm in greatest dimension",
              "_id": "62caf0b7a8394e529d6a15ca"
          },
          {
              "name": "T4",
              "description": "Tumor of any size with direct extension to the chest wall and/ or to the skin (ulceration or macroscopic nodules); invasion of the dermis alone does not qualify as T4",
              "_id": "62caf0b7a8394e529d6a15cb"
          },
          {
              "name": "T4a",
              "description": "Extension to the chest wall; invasion or adherence to pectoralis muscle in the absence of invasion of chest wall structures does not qualify as T4",
              "_id": "62caf0b7a8394e529d6a15cc"
          },
          {
              "name": "T4b",
              "description": "Ulceration and/or ipsilateral macrosopic satellite nodules and/or edema (including peau d’orange) of the skin that does not meet the criteria for inflammatory carcinoma",
              "_id": "62caf0b7a8394e529d6a15cd"
          },
          {
              "name": "T4c",
              "description": "Both T4a and T4b are present",
              "_id": "62caf0b7a8394e529d6a15ce"
          },
          {
              "name": "T4d",
              "description": "Inflammatory carcinoma",
              "_id": "62caf0b7a8394e529d6a15cf"
          }
      ],
      "_id": "62caf0b7a8394e529d6a15bf"
  },
  {
      "criteria_name": "N",
      "criteria_code": [
          {
              "name": "NX",
              "description": "Regional lymph nodes cannot be assessed (e.g., not removed for pathological study or previously removed)",
              "_id": "62caf0b7a8394e529d6a15d1"
          },
          {
              "name": "N0",
              "description": " No regional lymph node metastasis identified or ITCs only",
              "_id": "62caf0b7a8394e529d6a15d2"
          },
          {
              "name": "N0(i+)",
              "description": "ITCs only (malignant cells clusters no larger than 0.2 mm) in regional lymph node(s)",
              "_id": "62caf0b7a8394e529d6a15d3"
          },
          {
              "name": "N0(mol+)",
              "description": "Positive molecular findings by reverse transcriptase polymerase chain reaction (RT-PCR); no ITCs detected ",
              "_id": "62caf0b7a8394e529d6a15d4"
          },
          {
              "name": "N1",
              "description": "Micrometastases; or metastases in 1–3 axillary lymph nodes; and/or in clinically negative internal mammary nodes with micrometastases or macrometastases by sentinel lymph node biopsy",
              "_id": "62caf0b7a8394e529d6a15d5"
          },
          {
              "name": "N1mi",
              "description": "Micrometastases (approximately 200 cells, larger than 0.2 mm, but none larger than 2.0 mm)",
              "_id": "62caf0b7a8394e529d6a15d6"
          },
          {
              "name": "N1a",
              "description": "Metastases in 1–3 axillary lymph nodes, at least one metastasis larger than 2.0 mm",
              "_id": "62caf0b7a8394e529d6a15d7"
          },
          {
              "name": "N1b",
              "description": "Metastases in ipsilateral internal mammary sentinel nodes, excluding ITCs",
              "_id": "62caf0b7a8394e529d6a15d8"
          },
          {
              "name": "N1c",
              "description": "pN1a and pN1b combined",
              "_id": "62caf0b7a8394e529d6a15d9"
          },
          {
              "name": "N2",
              "description": "Metastases in 4–9 axillary lymph nodes; or positive ipsilateral internal mammary lymph nodes by imaging in the absence of axillary lymph node metastases",
              "_id": "62caf0b7a8394e529d6a15da"
          },
          {
              "name": "N2a",
              "description": "Metastases in 4–9 axillary lymph nodes (at least one tumor deposit larger than 2.0 mm)",
              "_id": "62caf0b7a8394e529d6a15db"
          },
          {
              "name": "N2b",
              "description": "Metastases in clinically detected internal mammary lymph nodes with or without microscopic confirmation; with pathologically negative axillary nodes",
              "_id": "62caf0b7a8394e529d6a15dc"
          },
          {
              "name": "N3",
              "description": "Metastases in 10 or more axillary lymph nodes; or in infraclavicular (level III axillary) lymph nodes; or positive ipsilateral internal mammary lymph nodes by imaging in the presence of one or more positive level I, II axillary lymph nodes; or in more than three axillary lymph nodes and micrometastases or macrometastases by sentinel lymph node biopsy in clinically negative ipsilateral internal mammary lymph nodes; or in ipsilateral supraclavicular lymph nodes",
              "_id": "62caf0b7a8394e529d6a15dd"
          },
          {
              "name": "N3a",
              "description": "Metastases in 10 or more axillary lymph nodes (at least one tumor deposit larger than 2.0 mm); or metastases to the infraclavicular (level III axillary lymph) nodes",
              "_id": "62caf0b7a8394e529d6a15de"
          },
          {
              "name": "N3b",
              "description": "pN1a or pN2a in the presence of cN2b (positive internal mammary nodes by imaging); or pN2a in the presence of pN1b",
              "_id": "62caf0b7a8394e529d6a15df"
          },
          {
              "name": "N3c",
              "description": "Metastases in ipsilateral supraclavicular lymph nodes",
              "_id": "62caf0b7a8394e529d6a15e0"
          }
      ],
      "_id": "62caf0b7a8394e529d6a15d0"
  },
  {
      "criteria_name": "M",
      "criteria_code": [
          {
              "name": "M0",
              "description": "No clinical or radiographic evidence of distant metastases*",
              "_id": "62caf0b7a8394e529d6a15e2"
          },
          {
              "name": "M1",
              "description": "Any histologically proven metastases in distant organs; or if in non-regional nodes, metastases greater than 0.2 mm",
              "_id": "62caf0b7a8394e529d6a15e3"
          }
      ],
      "_id": "62caf0b7a8394e529d6a15e1"
  }
]


export { useSessionStorage, delSessionStorage, setSessionStorage, report_types_init, reports_init, initial_report_entry, initial_staging,
          tnm_init, tnm_map, tnm_staging_fields_init, patient_info_init, base_url, base_url2, base_url3, getAge, tnm_criteria_init };