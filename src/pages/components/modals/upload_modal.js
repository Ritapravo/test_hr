import { React, useState } from 'react';
import { Button, MenuItem, Table, TableBody, TableCell, TableRow, TableRowTextField, TextField } from '@mui/material';
import styles from './upload_modal.module.css';
import { Link, useNavigate } from "react-router-dom";
import AddToPhotosIcon from '@mui/icons-material/AddToPhotosOutlined';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import { report_types, initial_report_entry  } from '../initializers/init_organiser';


const modal_style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    // height:'60%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Report_upload_modal = (props) => {

    const Navigate = useNavigate();

    // const { open, handleClose, report_entry, handleInputChange, handle_modal_save, file_select_handler, report_types } = props;
    const {reports, setReports, patient_details} = props ;
    const [diagnosis, setDiagnosis] = useState('');

    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    const [report_entry, setReport_entry] = useState(initial_report_entry);
    const [report_file, setReport_file] = useState(null);
    const [report_file_list, setReport_file_list] = useState([]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCloseWindow = () => {
        alert('Progress saved in draft');
        Navigate('/organiser_landing_page');
    }



    const handle_modal_save = () => {
        let temp0 = {...report_entry, ['organizerID']:patient_details.p_id, ['phrID']:patient_details.phr_id}
        let temp = [...report_file_list, report_file];
        setReport_file_list(temp);
        let temp2 = [...reports, temp0];
        console.log(temp2);
        setReports(temp2);
        handleClose();
        setReport_entry(initial_report_entry);
    }

    const file_select_handler = (event) => {
        setReport_file(event.target.files[0]);
        setReport_entry({
            ...report_entry,
            ['originalname']: event.target.files[0].name
        })
    }




    const handleInputChange = (e) => {
        // console.log(e);
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setReport_entry({
            ...report_entry,
            [name]: value
        })

        // validate({ [name]: value });
    }

    return (
        <div>
            <Button variant="contained" className={styles.case_summary_button} startIcon={<AddToPhotosIcon />} onClick={handleOpen}>
                <p>Upload Reports</p>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modal_style}>

                    <HighlightOffIcon fontSize='medium' style={{ float: 'right', cursor: 'pointer' }} onClick={handleClose} />
                    <div className={styles.inputs}>
                        <p className={styles.inputs_p}>Add file</p>
                        {/* <h3>Add file</h3> */}
                        <TextField name='originalname' type={'file'} onChange={file_select_handler}
                            variant="standard" className={styles.text_field} InputProps={{ disableUnderline: true }} size='small' />
                    </div>

                    <div className={styles.inputs}>
                        <p className={styles.inputs_p}>Save as</p>
                        <TextField name='saved_filename' value={report_entry.saved_filename} onChange={handleInputChange}
                            variant="standard" className={styles.text_field} InputProps={{ disableUnderline: true }} size='small' />

                    </div>
                    <div className={styles.inputs}>
                        <p className={styles.inputs_p}>Date</p>
                        <TextField name='reportDate' value={report_entry.reportDate} onChange={handleInputChange} type='date'
                            variant="standard" className={styles.text_field} InputProps={{ disableUnderline: true }} size='small' />
                    </div>
                    <div className={styles.inputs}>
                        <p className={styles.inputs_p}>Impressions</p>
                        <TextField name='impression' value={report_entry.impression} onChange={handleInputChange}
                            variant="standard" className={styles.text_field_multiline} InputProps={{ disableUnderline: true }} multiline rows={4} />
                    </div>

                    <div className={styles.inputs} style={{ transform: 'translate(0,50%)' }}>
                        <p className={styles.inputs_p}>Type</p>
                        <TextField name='report_type' value={report_entry.report_type} onChange={handleInputChange} select
                            variant="standard" className={styles.text_field} InputProps={{ disableUnderline: true }} size='small'>
                            {report_types.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '100px' }}>
                        <Button className={styles.modal_submit_button} onClick={handle_modal_save} variant="contained" color='error'> Save as Draft </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default Report_upload_modal;