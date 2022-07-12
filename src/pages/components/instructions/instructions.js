import {React, useState, useEffect} from 'react';
import { patient_info_init, base_url2, useSessionStorage, getAge } from '../initializers/init_organiser';

const inlineBlock = {
    display: 'inline-block'
}

const Instructions = () => {
    const [patient_info, setPatient_info] = useState({});

    var patient_keys;

    patient_keys = useSessionStorage("patient_details_organiser");

    const fetchPatientInfo = async () => {
        try {
            const res = await fetch(
                `${base_url2}/getPatientDetails/${patient_keys.p_id}`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json",
                    },
                }
            );

            const data = await res.json();
            setPatient_info(data.data);
            console.log(data.data);
            sessionStorage.setItem("cancerID", JSON.stringify(data.data.cancer_type))
        } catch (error) {
            console.log(error);
        }
    
    }

    useEffect(() => {
        if (patient_keys)
            fetchPatientInfo();
    }, [patient_keys]);

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

            <h3 style={{ marginBottom: '1vh' }}>Patient Name : {patient_info.first_name +" "+patient_info.last_name}</h3>
            <h3 style={{ marginBottom: '1vh' }}>Patient Age : {getAge(patient_info.date_of_birth)}</h3>
            <h3 style={{ marginBottom: '1vh' }}>Gender : {patient_info.gender}</h3>
            <h3 style={{ marginBottom: '1vh' }}>Cancer Type : {patient_info.cancer_type}</h3>
            
        </div>
    )
}

export default Instructions