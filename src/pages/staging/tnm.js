import { React, useState, useEffect } from 'react';
import { Button, MenuItem, Table, TableBody, TableCell, TableRow, TableRowTextField } from '@mui/material';
import styles from './tnm.module.css';

import styles2 from './../components/tables/table.module.css'

import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Link, useNavigate } from "react-router-dom";
import { TextField } from '@mui/material';
import { FormControl, FormControlLabel, Checkbox as MuiCheckbox } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useSessionStorage, reports_init, tnm_init, tnm_map, tnm_staging_fields_init } from './../components/initializers/init_organiser';
import { FormLabel, RadioGroup as MuiRadioGroup, Radio, FormHelperText } from '@mui/material';
import Container from '../components/layout/container';

// import formstyle from './../../styles/EmployeeForm.module.css

const TNM = () => {

    const Navigate = useNavigate();

    var patient_details;

    patient_details = useSessionStorage("patient_details_organiser");

    const [tnm_staging_fields, settnm_staging_fields] = useState(tnm_staging_fields_init);
    const [tnm_values, setTnm_values] = useState(tnm_init);
    const [errors, setErrors] = useState({});

    const validate = (fieldValues = tnm_staging_fields) => {
        let temp = { ...errors };

        if ("DX_Site" in fieldValues)
            temp.DX_Site = /[A-Za-z0-9]+/.test(fieldValues.DX_Site) ? '' : 'Required';
        if ("Stage" in fieldValues)
            temp.Stage = /[A-Za-z0-9]+/.test(fieldValues.Stage) ? '' : 'Required';
        if ("Date_staged" in fieldValues)
            temp.Date_staged = /[A-Za-z0-9]+/.test(fieldValues.Date_staged) ? '' : 'Required';
        if ("Basis" in fieldValues)
            temp.Basis = /[A-Za-z0-9]+/.test(fieldValues.Basis) ? '' : 'Required';

        setErrors({ ...temp });

        if (fieldValues === tnm_staging_fields) {
            if (!Object.values(fieldValues.Criteria).every(x => x !== "")) {
                alert('Please Enter TNM criteria');
            }
            return Object.values(temp).every(x => x === "") &&
                Object.values(fieldValues.Criteria).every(x => x !== "");
        }
    };

    const handle_change = (e) => {
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        settnm_staging_fields({
            ...tnm_staging_fields,
            [name]: value
        })
        validate({ [name]: value });
    }


    const handle_TNM_change = (e) => {
        // console.log(e);
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        let ind = 0;
        if (TNM_option === 'N') ind = 1;
        if (TNM_option === 'M') ind = 2;
        let temp1 = { ...tnm_values[ind] };
        temp1.value = value;
        let temp2 = [...tnm_values];
        temp2[ind] = temp1;
        setTnm_values(temp2);
        temp1 = [temp2[0].value, temp2[1].value, temp2[2].value]
        settnm_staging_fields({
            ...tnm_staging_fields,
            ['Criteria']: temp1
        })
    }

    const [TNM_option, setTNM_option] = useState('T');


    const handleCloseWindow = () => {
        Navigate('/organiser');
    }
    const postStaging = async (jsonData) => {
        const res = await fetch("http://localhost:3001/api/medical_writers/addStaging", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(jsonData),
        });
        const data = await res.json();
        console.log(data);
        if (data.status === 400 || data.status === 500 || !data) {
            console.log(data.message);
            window.alert(`Could  not Post\nError ${data.message}`);
            console.log(`Could  not Post\nError ${data.message}`);
        } else {
            console.log(data);
            // console.log(data.message);
            window.alert(data.message);
            console.log("Successfully posted data");
            Navigate('/organiser');
            // sessionStorage.setItem("writer_details", JSON.stringify(data.userDetails));
            // Navigate(nxt);
        }
    }

    const handleSave = () => {

        console.log(tnm_staging_fields);
        let val = validate();
        if (val) {
            postStaging(tnm_staging_fields);
        }
    }

    useEffect(() => {
        settnm_staging_fields({
            ...tnm_staging_fields,
            ['phrID']: patient_details.phr_id
        })
    }, [patient_details]);


    return (
        <Container>

            <HighlightOffIcon fontSize='large' style={{ float: 'right', cursor: 'pointer' }} onClick={handleCloseWindow} />

            <h2 >
                Patient Id : {patient_details.p_id}
            </h2>


            <div className={styles.inputs}>
                <p className={styles.inputs_p}>DX site</p>
                <TextField
                    name={'DX_Site'}
                    value={tnm_staging_fields.DX_Site}
                    onChange={handle_change}
                    {...(errors.DX_Site && { error: true, helperText: errors.DX_Site })}
                    variant="standard" className={styles.text_field} InputProps={{ disableUnderline: true }} size='small'
                />
            </div>

            <div className={styles.inputs}>
                <p className={styles.inputs_p}>Stage</p>
                <TextField
                    name={'Stage'}
                    value={tnm_staging_fields.Stage}
                    onChange={handle_change}
                    {...(errors.Stage && { error: true, helperText: errors.Stage })}
                    variant="standard" className={styles.text_field} InputProps={{ disableUnderline: true }} size='small' />
            </div>

            <div className={styles.double_input} >
                <p className={styles.inputs_p}>Date Staged</p>
                <TextField
                    name={'Date_staged'}
                    type='date'
                    value={tnm_staging_fields.Date_staged}
                    onChange={handle_change}
                    {...(errors.Date_staged && { error: true, helperText: errors.Date_staged })}
                    variant="standard" className={styles.text_field} InputProps={{ disableUnderline: true }} size='small'
                />
            </div>

            <div className={styles.inputs}>
                <p className={styles.inputs_p}>Basis</p>
                <TextField select
                    name={'Basis'}
                    value={tnm_staging_fields.Basis}
                    onChange={handle_change}
                    {...(errors.Basis && { error: true, helperText: errors.Basis })}
                    variant="standard" className={styles.text_field} InputProps={{ disableUnderline: true }} size='small'
                >
                    {['Pathologic', 'Clinical'].map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
            </div>

            <div className={styles.inputs_checkbox} >
                <p className={styles.inputs_p}>Working Stage</p>
                <FormControl style={{ transform: 'translate(5%, -17%)' }}>
                    <FormControlLabel
                        control={<MuiCheckbox
                            // style={{font: 'normal normal normal 40px/49px Calibri'}}
                            color='primary'
                        />}
                    // label={'working stage'}
                    >
                    </FormControlLabel>
                </FormControl>
            </div>

            <div style={{ height: '5vh' }}></div>

            <Grid container spacing={1}>
                <Grid item xs={3} sm={2}>
                    <Paper elevation={4} className={styles2.table_report} style={{ width: '97%', marginRight: '3%' }}>
                        <Table className={styles2.TableBody}>
                            <TableBody className={styles2.TableBody} >
                                <TableRow style={{ borderBottom: '1.5px solid rgb(147, 134, 134)' }} >
                                    <TableCell width='100%' style={{ textAlign: 'center' }} ><h3>Criteria</h3></TableCell>


                                </TableRow>


                                {
                                    tnm_values.map(item =>
                                    (<TableRow className={styles2.tableRow} key={item.name}>
                                        <TableCell
                                            style={TNM_option === item.name ? { background: 'white', } : { cursor: 'pointer' }} width='100%'
                                            onClick={() => { setTNM_option(item.name) }}
                                        >

                                            <h3 style={{ display: 'inline-block', marginLeft: '10%', float: 'left' }}>{item.name}</h3>
                                            <h3 style={{ display: 'inline-block', marginRight: '10%', float: 'right' }}>{item.value}</h3>

                                        </TableCell>

                                    </TableRow>))
                                }



                            </TableBody>
                        </Table>
                    </Paper>

                    <div style={{ textAlign: 'center', marginTop: '1vh' }}>
                        <Button variant="contained" size='medium' color="success" onClick={handleSave}>Save</Button>
                    </div>

                </Grid>

                <Grid item xs={9} sm={10}>
                    <FormControl >
                        <MuiRadioGroup row={false}
                            name={'T'}
                            // value={''}
                            onChange={handle_TNM_change}
                        >
                            <Paper elevation={4} className={styles2.table_report} style={{ width: '70vw' }}>
                                <Table className={styles2.TableBody}>
                                    <TableBody className={styles2.TableBody} >
                                        <TableRow className={styles2.tableRow}>
                                            <TableCell className={styles2.tableCell} width='10%' ><h3>Criteria code</h3></TableCell>
                                            <TableCell width='40%' style={{ textAlign: 'center' }} ><h3>Classification definition</h3></TableCell>


                                        </TableRow>

                                        {
                                            tnm_map.get(TNM_option).map(item =>
                                            (<TableRow className={styles2.tableRow2} key={item.code}>

                                                <TableCell className={styles2.tableCell_tnm_radio} width='10%' style={{ textAlign: 'left', paddingLeft: '5%' }} >
                                                    <FormControlLabel
                                                        key={item.code} value={item.code} control={<Radio />} label={<p>{item.code}</p>}
                                                    />

                                                </TableCell>
                                                <TableCell style={{ textAlign: 'left', padding: '0 0 0 10px' }} width='40%' >
                                                    <p style={{ display: 'inline-block' }}>{item.definition}</p>

                                                </TableCell>
                                            </TableRow>))
                                        }




                                    </TableBody>
                                </Table>
                            </Paper>
                        </MuiRadioGroup>
                    </FormControl>
                </Grid>
            </Grid>

        </Container>
    )
}

export default TNM;