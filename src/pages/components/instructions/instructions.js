import {React, useState} from 'react';
import { patient_info_init } from '../initializers/init_organiser';

const inlineBlock = {
    display: 'inline-block'
}

const Instructions = () => {
    const [patient_info, setPatient_info] = useState(patient_info_init);
    return (
        <div>
            <h3 style={{ marginBottom: '1.5vh' }}>Patient Details</h3>

            {/* <h3 style={inlineBlock}>Patient Name : </h3> 
            <p style={inlineBlock}>{patient_info.name} </p>

            <h3 style={inlineBlock}>Patient Age : </h3>
            <p style={inlineBlock}>{patient_info.age}</p>

            <h3 style={inlineBlock}>Gender: </h3>
            <p style={inlineBlock}>{patient_info.gender} </p>

            <h3 style={inlineBlock}> : </h3>
            <p style={inlineBlock}>Cancer Type{patient_info.cancer_type} </p> */}

            <h3 style={{ marginBottom: '1vh' }}>Patient Name : {patient_info.name}</h3>
            <h3 style={{ marginBottom: '1vh' }}>Patient Age : {patient_info.age}</h3>
            <h3 style={{ marginBottom: '1vh' }}>Gender : {patient_info.gender}</h3>
            <h3 style={{ marginBottom: '1vh' }}>Cancer Type : {patient_info.cancer_type}</h3>
            
        </div>
    )
}

export default Instructions