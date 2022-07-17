import { React, useState, useEffect } from 'react';
import { Button } from '@mui/material';
import styles from './../../css/organiser.module.css';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Link, useNavigate } from "react-router-dom";
import { useSessionStorage, base_url3 } from '../initializers/init_organiser';

const Staging_button = () => {
    const Navigate = useNavigate();

    var cancerID;
    cancerID = useSessionStorage('cancerID');

    const [staging_types, setStaging_types] = useState([]);

    const fetchStagingTypes = async () => {
        try {
            const res = await fetch(
                `${base_url3}/getStagingTypes/${cancerID}`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json",
                    },
                }
            );

            const data = await res.json();
            setStaging_types(data.data);
            console.log(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if(cancerID){
            fetchStagingTypes();
        }
    }, [cancerID]);

    const [open_staging, setOpen_staging] = useState(false);
    return (
        <div>
            <Button className={styles.case_summary_button} onClick={() => setOpen_staging(!open_staging)}
                variant="contained" startIcon={<AddCircleOutlineOutlinedIcon />} >
                <p>Add Staging</p>
            </Button>

            {
                open_staging &&
                <>
                    <Button variant='outlined' disabled={!staging_types.includes("TNM")} className={styles.staging_options} onClick={() => { Navigate('/staging/tnm') }}><p>TNM</p></Button>
                    <Button variant='outlined' disabled={!staging_types.includes("FIGO")} className={styles.staging_options}><p>FIGO</p></Button>
                </>
            }
        </div>
    )
}

export default Staging_button;