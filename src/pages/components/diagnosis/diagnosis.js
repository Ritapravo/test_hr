import {React, useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Patient_diagnosis = () => {
    const [diagnosis, setDiagnosis] = useState('');
    return (
        <div>
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
            >
                <div style={{ margin: '0' }}>Save</div>
            </Button>
        </div>
    )
}

export default Patient_diagnosis