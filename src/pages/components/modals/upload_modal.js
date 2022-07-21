import { React, useState, useEffect } from 'react';
import { Button, MenuItem, Table, TableBody, TableCell, TableRow, TableRowTextField, TextField } from '@mui/material';
import styles from './upload_modal.module.css';
import { Link, useNavigate } from "react-router-dom";
import AddToPhotosIcon from '@mui/icons-material/AddToPhotosOutlined';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { base_url, useSessionStorage } from '../initializers/init_organiser';
import { fetchReports } from '../tables/report_table';
import { report_types_init, initial_report_entry, getAge } from '../initializers/init_organiser';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import Progress_circle from '../progress/progress_circle';
import swal from 'sweetalert';

const modal_style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: `${window.screen.width > 850 ? '60%' : '98vw'}`,
    // width:'70%',
    // height:'60%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    // gridRowStart: '1', gridColumnStart: '1'
    display: 'grid', gridTemplateColumns: '1fr', gridTemplateRows: '1fr'
};

const Report_upload_modal = (props) => {

    // console.log(window.screen.width);
    const Navigate = useNavigate();

    var patient_details, organiser_details, cancerDetails;
    patient_details = useSessionStorage("patient_details_organiser");
    organiser_details = useSessionStorage("organiser_details");
    cancerDetails = useSessionStorage("cancerDetails");

    const { reports, setReports } = props;

    const [open, setOpen] = useState(false);

    const [report_entry, setReport_entry] = useState(initial_report_entry);
    const [report_file, setReport_file] = useState(null);
    const [report_file_list, setReport_file_list] = useState([]);

    const [report_types, setReport_types] = useState([]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {if(!loading)setOpen(false)};

    const fetchCancerInfo = async () => {
        console.log('entered');
        try {
            const res = await fetch(
                // `${base_url}/getCancerFields/${cancerDetails.cancerId}`,
                `${base_url}/getCancerFields/62caf1b2a8394e529d6a15e8`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json",
                    },
                }
            );

            const data = await res.json();
            setReport_types([...data.data.Investigation.Reports,
            ...data.data.Investigation.Other_Investigations,
            ...data.data.Investigation.Images,
            ...data.data.subtypes,
            ...data.data.treatment,
            ...data.data.other_documents
            ]);
            console.log(data.data);
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(() => {
        if (cancerDetails) {
            console.log('entered ');
            fetchCancerInfo();
        }
    }, [cancerDetails]);

    const [loading, setLoading] = useState(false);


    const post_file_data = async (tempRepID) => {
        const jsonData = {
            "tempRepID": tempRepID,
            "originalname": report_entry.originalname,
            "report_type": report_entry.report_type,
            "reportDate": report_entry.reportDate,
            "impression": report_entry.impression,
            "saved_filename": report_entry.saved_filename,
            "organizerID": organiser_details._id,
            "phrID": patient_details.phr_id,
            "taskOrgID": patient_details.task_id
        }
        try {
            const res = await fetch(
                `${base_url}/addCuratedReportsData`,
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
            console.log(data, "inside data success");
            // alert(data.message);
            swal({
                // title: "Logged in Successfully!",
                text: data.message,
                icon: "success",
              });
            // window.location.reload(false);
            handleClose();
            setLoading(false);
            fetchReports(patient_details, setReports, setLoading);

        } catch (error) {
            console.log(error, "inside daTa error");
            setLoading(false);
        }
    }


    const upload_file = async (file) => {

        setLoading(true);
        const form_data = new FormData();
        form_data.append('file', file);
        try {
            const res = await fetch(
                `${base_url}/uploadCuratedReports/${patient_details.p_id}`,
                {
                    method: "POST",
                    // headers: {
                    //     Accept: "application/json",
                    //     "Content-type": "file",
                    // },
                    body: form_data,
                }
            );

            const data = await res.json();
            const tempRepID = await data.tempRepID
            console.log(tempRepID, "inside file success");
            // alert(data.message);
            post_file_data(tempRepID);
        } catch (error) {
            console.log(error, "inside file error");
            setLoading(false);
        }
    }
    // 62cc5a6a549fb946603c7b79



    const handle_modal_save = (e) => {
        e.preventDefault();

        const val = validate();
        if (!val)
            return;

        let temp0 = { ...report_entry, ['organizerID']: patient_details.p_id, ['phrID']: patient_details.phr_id }
        let temp = [...report_file_list, report_file];
        setReport_file_list(temp);
        let temp2 = [...reports, temp0];
        console.log(temp2);
        // setReports(temp2);
        // handleClose();
        console.log(report_file);
        upload_file(report_file);
        setReport_entry(initial_report_entry);

    }

    const file_select_handler = (event) => {
        const name = event.target.name;
        const value = event.target.files[0].name;
        console.log(event.target.value);
        setReport_file(event.target.files[0]);
        setReport_entry({
            ...report_entry,
            ['originalname']: event.target.files[0].name
        })
        validate({ [name]: value });
    }

    const [errors, setErrors] = useState({});

    const validate = (fieldValues = report_entry) => {
        let temp = { ...errors };

        if ("originalname" in fieldValues)
            temp.originalname = /[A-Za-z0-9]+/.test(fieldValues.originalname) ? '' : 'Required';
        if ("report_type" in fieldValues)
            temp.report_type = /[A-Za-z0-9]+/.test(fieldValues.report_type) ? '' : 'Required';
        if ("reportDate" in fieldValues)
            temp.reportDate = /[A-Za-z0-9]+/.test(fieldValues.reportDate) ? '' : 'Required';
        if ("reportDate" in fieldValues && fieldValues.reportDate!=='')
            temp.reportDate = getAge(fieldValues.reportDate)>=0 ? '' : 'Future dates not allowed';
        if ("impression" in fieldValues)
            temp.impression = /[A-Za-z0-9]+/.test(fieldValues.impression) ? '' : 'Required';
        if ("saved_filename" in fieldValues)
            temp.saved_filename = /[A-Za-z0-9]+/.test(fieldValues.saved_filename) ? '' : 'Required';

        setErrors({ ...temp });

        if (fieldValues === report_entry) {
            return Object.values(temp).every(x => x === "")
        }
    };



    const handleInputChange = (e) => {
        // console.log(e);
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setReport_entry({
            ...report_entry,
            [name]: value
        })

        validate({ [name]: value });
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
                {/* <Progress_circle/> */}
                <Box sx={modal_style}>
                    {loading && <Progress_circle padding="35% 0 0 0" margin="0px 0px 0px 0px"/> }
                    <div style={{ gridRowStart: '1', gridColumnStart: '1' }}>
                        <HighlightOffIcon fontSize='medium' style={{ float: 'right', cursor: 'pointer', margin:'5px 5px 0 0' }} onClick={handleClose} />
                        <div className={styles.inputs}>
                            <p className={styles.inputs_p}>Add file</p>
                            {/* <h3>Add file</h3> */}
                            <TextField name='originalname' type={'file'} onChange={file_select_handler}
                                {...(errors.originalname && { error: true, helperText: errors.originalname })}
                                variant="standard" className={styles.text_field} InputProps={{ disableUnderline: true }} size='small' />
                        </div>

                        <div className={styles.inputs}>
                            <p className={styles.inputs_p}>Save as</p>
                            <TextField name='saved_filename' value={report_entry.saved_filename} onChange={handleInputChange}
                                {...(errors.saved_filename && { error: true, helperText: errors.saved_filename })}
                                variant="standard" className={styles.text_field} InputProps={{ disableUnderline: true }} size='small' />

                        </div>
                        <div className={styles.inputs}>
                            <p className={styles.inputs_p}>Date</p>
                            <TextField name='reportDate' value={report_entry.reportDate} onChange={handleInputChange} type='date'
                                {...(errors.reportDate && { error: true, helperText: errors.reportDate })}
                                variant="standard" className={styles.text_field} InputProps={{ disableUnderline: true }} size='small' />
                        </div>
                        <div className={styles.inputs}>
                            <p className={styles.inputs_p}>Impressions</p>
                            <TextField name='impression' value={report_entry.impression} onChange={handleInputChange}
                                {...(errors.impression && { error: true, helperText: errors.impression })}
                                variant="standard" className={styles.text_field_multiline} InputProps={{ disableUnderline: true }} multiline rows={4} />
                        </div>

                        <div className={styles.inputs} style={{ transform: 'translate(0,50%)' }}>
                            <p className={styles.inputs_p}>Type</p>
                            <AutorenewOutlinedIcon onClick={fetchCancerInfo} style={{ cursor: 'pointer', transform: 'translate(30%,30%)' }} />
                            <TextField name='report_type' value={report_entry.report_type} onChange={handleInputChange} select
                                {...(errors.report_type && { error: true, helperText: errors.report_type })}
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
                    </div>
                </Box>
            </Modal>
        </div>
    )
}

export default Report_upload_modal;