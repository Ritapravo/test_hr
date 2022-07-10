import { React, useState } from 'react';
import { Button } from '@mui/material';
import styles from './../css/organiser.module.css';
import { Link, useNavigate } from "react-router-dom";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Grid from '@mui/material/Grid';
import { useSessionStorage, base_url } from '../components/initializers/init_organiser';
import Report_upload_modal from '../components/modals/upload_modal';
import Patient_diagnosis from '../components/diagnosis/diagnosis';
import Instructions from '../components/instructions/instructions';
import Report_table from '../components/tables/report_table';
import Tnm_staging_table from '../components/tables/tnm_staging_table';
import Container from '../components/layout/container';



const Organiser = () => {
  var patient_details;
  patient_details = useSessionStorage("patient_details_organiser");

  const Navigate = useNavigate();

  const [downloaded, setDownloaded] = useState(false);
  const [reports, setReports] = useState([]);


  const handleCloseWindow = () => {
    alert('Progress saved in draft');
    Navigate('/organiser_landing_page');
  }

  const handleDownload = () => {
    console.log("download button clicked");
    let temp = !downloaded;
    setDownloaded(temp);
  }


  const deleteReport = (item) => {
    setReports(reports.filter((t) => t !== item));
  }




  const [open_staging, setOpen_staging] = useState(false);




  return (


    <Container>
      <HighlightOffIcon fontSize='large' style={{ float: 'right', cursor: 'pointer' }} onClick={handleCloseWindow} />
      <h2 style={{display:"inline-block"}}>
        Patient Id : {patient_details.p_id}
      </h2>

      <a href={`${base_url}/getAllPatientReports/62caf645de65d0adb085c594`}>
      <div className={styles.downloadButton} onClick={()=>setDownloaded(true)}></div>
      </a>
      {downloaded && <div className={styles.downloaded} onClick={()=>setDownloaded(false)}> <p>Download complete!</p></div>}

      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Instructions />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Patient_diagnosis />
        </Grid>

      </Grid>

      <Report_upload_modal reports={reports} setReports={setReports} patient_details={patient_details} />

      <Report_table reports={reports} deleteReport={deleteReport} />


      <Button className={styles.case_summary_button} onClick={() => setOpen_staging(!open_staging)}
        variant="contained" startIcon={<AddCircleOutlineOutlinedIcon />} >
        <p>Add Staging</p>
      </Button>

      {
        open_staging &&
        <>
          <Button variant='outlined' className={styles.staging_options} onClick={() => { Navigate('/staging/tnm') }}><p>TNM</p></Button>
          <Button variant='outlined' className={styles.staging_options}><p>FIGO</p></Button>
        </>
      }

      <Tnm_staging_table patient_details={patient_details} edit_enabled={true} />

      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <Button className={styles.final_submit_button} onClick={() => { alert('Submitted'); Navigate('/organiser_landing_page') }} variant="contained" color='success'> Submit </Button>
      </div>

    </Container>

  )
}

export default Organiser;