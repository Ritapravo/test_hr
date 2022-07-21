import { React, useState, useEffect } from 'react';
import { patient_info_init, base_url2, useSessionStorage, setSessionStorage, getAge } from '../initializers/init_organiser';
import Progress_circle from '../progress/progress_circle';

const inlineBlock = {
    display: 'inline-block'
}

const Instructions = () => {
    const [patient_info, setPatient_info] = useState({});

    var patient_keys;

    patient_keys = useSessionStorage("patient_details_organiser");

    const fetchPatientInfo = async () => {
        setLoading(true);
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
            let temp = { ...data.data.patientDetails, ['cancerName']: data.data.cancerName }
            setPatient_info(temp);
            console.log(temp);
            //    setSessionStorage("cancerID", data.data.patientDetails.cancer_type);
            setSessionStorage("cancerDetails", {
                ['cancerId']: data.data.patientDetails.cancer_type,
                ['cancerName']: data.data.cancerName
            });
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }

    }

    useEffect(() => {
        if (patient_keys)
            fetchPatientInfo();
    }, [patient_keys]);

    const [loading, setLoading] = useState(false);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gridTemplateRows: '1fr' }}>
            {loading && <Progress_circle />}
            <div style={{ gridRowStart: '1', gridColumnStart: '1'}}>
                <h3 style={{ marginBottom: '1.5vh' }}>
                    Patient Details
                </h3>
                
                {/* <h3 style={inlineBlock}>Patient Name : </h3> 
            <p style={inlineBlock}>{patient_info.name} </p>

            <h3 style={inlineBlock}>Patient Age : </h3>
            <p style={inlineBlock}>{patient_info.age}</p>

            <h3 style={inlineBlock}>Gender: </h3>
            <p style={inlineBlock}>{patient_info.gender} </p>

            <h3 style={inlineBlock}> : </h3>
            <p style={inlineBlock}>Cancer Type{patient_info.cancer_type} </p> */}
                <h3 style={{ marginBottom: '1vh' }}>Patient Name : {patient_info.first_name + " " + patient_info.last_name}</h3>
                <h3 style={{ marginBottom: '1vh' }}>Patient Age : {getAge(patient_info.date_of_birth)}</h3>
                <h3 style={{ marginBottom: '1vh' }}>Gender : {patient_info.gender}</h3>
                <h3 style={{ marginBottom: '1vh' }}>Cancer Type : {patient_info.cancerName}</h3>
            </div>
        </div>
    )
}

export default Instructions