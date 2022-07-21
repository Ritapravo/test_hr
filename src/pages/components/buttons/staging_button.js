import { React, useState, useEffect } from 'react';
import { Button } from '@mui/material';
import styles from './../../css/organiser.module.css';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Link, useNavigate } from "react-router-dom";
import { useSessionStorage, base_url3, getSessionStorage } from '../initializers/init_organiser';

const Staging_button = () => {
    const Navigate = useNavigate();

    var cancerDetails;
    cancerDetails = useSessionStorage('cancerDetails');

    const [staging_types, setStaging_types] = useState([]);

    const fetchStagingTypes = async () => {
        cancerDetails = getSessionStorage('cancerDetails');
        console.log(cancerDetails.cancerId);
        try {
            const res = await fetch(
                `${base_url3}/getStagingTypes/${cancerDetails.cancerId}`,
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
        if(cancerDetails){
            fetchStagingTypes();
            // console.log("error");
        }
    }, [cancerDetails]);

    const handleAddStaging = () => {
        setOpen_staging(!open_staging);
        if(staging_types.length===0)
            fetchStagingTypes();
    }

    const [open_staging, setOpen_staging] = useState(false);
    return (
        <div>
            <Button className={styles.case_summary_button} onClick={handleAddStaging}
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