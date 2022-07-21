import { React, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { base_url, base_url2, useSessionStorage } from '../initializers/init_organiser';
import Progress_circle from '../progress/progress_circle';


const Patient_diagnosis = () => {

    var patient_details;
    patient_details = useSessionStorage("patient_details_organiser");

    const [diagnosis, setDiagnosis] = useState('');


    const fetchTask = async () => {
        setLoading(true);
        try {
            const res = await fetch(
                `${base_url2}/getDiagnosis/${patient_details.phr_id}`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json",
                    },
                }
            );

            const data = await res.json();
            setDiagnosis(data.data)
            console.log(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (patient_details) {
            fetchTask();
        }
    }, [patient_details]);


    const save_diagnosis_to_database = async (jsonData) => {
        try {
            const res = await fetch(
                `${base_url}/addDiagnosis`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify(jsonData),
                }
            );

            const data = await res.json();
            console.log(data);
            alert(data.message);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSave = () => {
        const jsonData = {
            "phrID": patient_details.phr_id,
            "diagnosis": diagnosis
        }
        save_diagnosis_to_database(jsonData);
    }

    const [loading, setLoading] = useState(false);

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gridTemplateRows: '1fr' }}>
            
            {loading && <Progress_circle/>}
            <div style={{ gridRowStart: '1', gridColumnStart: '1' }}>
                <h3>Patient Diagnosis</h3>
                <TextField
                    placeholder={'Type here...'}
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    style={{ margin: '10px 0 0 0', width: '90%', background: '#f3efef 0% 0% no-repeat padding-box' }}
                    multiline rows={4}
                >

                </TextField>
                <Button
                    variant="contained" size='small' color="success"
                    style={{ transform: 'translate(-110%, 460%)', position: 'absolute', padding: '0' }}
                    onClick={handleSave}
                >
                    <div style={{ margin: '0' }}>Save</div>
                </Button>
            </div>
        </div>
    )
}

export default Patient_diagnosis