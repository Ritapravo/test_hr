import { React, useState, useEffect } from 'react';
import { Button,TableContainer, Table, TableBody, TableCell, TableRow } from '@mui/material';
import styles from './table.module.css';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';
import { initial_staging } from '../initializers/init_organiser';

const max =(a, b)=> {return a>b?a:b};

const Tnm_staging_table = (props) => {

    var patient_details = props.patient_details;
    const [staging, setStaging] = useState(initial_staging);
    const fetchStaging = async () => {
        try {
            const res = await fetch(
                `http://localhost:3001/api/medical_writers/getStagingData/${patient_details.phr_id}`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json",
                    },
                }
            );

            const data = await res.json();
            setStaging(data.data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteStagingFromDB = async (item) => {
        try {
            const res = await fetch(
                `http://localhost:3001/api/medical_writers/removeStaging/${patient_details.phr_id}/${item._id}`,
                {
                    method: "DELETE",
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json",
                    },
                }
            );

            const data = await res.json();
            setStaging(staging.filter((t) => t !== item));
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (patient_details) {
            // fetchStaging();
            console.log('staging data will be fetched', patient_details);
        }
    }, [patient_details]);

    const deleteStaging = (item) => {
        // deleteStagingFromDB(item)
        setStaging(staging.filter((t) => t !== item));
    }

    return (
        <Paper elevation={4} className={styles.table_report} >
            <TableContainer sx={{ maxHeight:'45vh' }}>
                <Table className={styles.TableBody}>
                    <TableBody className={styles.TableBody} >
                        <TableRow className={styles.tableRow}>
                            <TableCell className={styles.tableCell} width='25%' ><h3>Date Stage</h3></TableCell>
                            <TableCell className={styles.tableCell} width='25%' ><h3>Stage</h3></TableCell>
                            <TableCell className={styles.tableCell} width='25%' ><h3>Criteria</h3></TableCell>
                            <TableCell width='25%' style={{ textAlign: 'center' }} ><h3>Basis</h3></TableCell>

                        </TableRow>
                        {
                            staging.map(item =>
                            (<TableRow className={styles.tableRow2} key={staging.indexOf(item)}>
                                <TableCell className={styles.tableCell} width='10%' ><p>{item.Date_staged.slice(0, 10)}</p></TableCell>
                                <TableCell className={styles.tableCell} width='15%' ><p>{item.Stage}</p></TableCell>
                                <TableCell className={styles.tableCell} width='25%' >
                                    <p>{item.Criteria[0] + ', ' + item.Criteria[1] + ', ' + item.Criteria[2]}</p>
                                </TableCell>
                                <TableCell style={{ textAlign: 'center', padding: '1vh 0' }} width='45%' >
                                    <p style={{ display: 'inline-block', width: '100%' }}>{item.Basis}
                                        {props.edit_enabled &&
                                            <DeleteIcon style={{ float: 'right', cursor: 'pointer', marginRight: '1vw' }} onClick={() => deleteStaging(item)} />
                                        }</p>
                                </TableCell>
                            </TableRow>))
                        }

                        {[...Array(max(6-staging.length, 0))].map((e, i) => (
                            <TableRow className={styles.tableRow2} key={i}>
                                <TableCell className={styles.tableCell} width='10%' ><h3></h3></TableCell>
                                <TableCell className={styles.tableCell} width='15%' ><h3></h3></TableCell>
                                <TableCell className={styles.tableCell} width='30%' ><h3></h3></TableCell>
                                <TableCell width='40%' style={{ textAlign: 'center' }} ><h3 style={{ margin: '0' }}></h3></TableCell>
                            </TableRow>))
                        }

                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default Tnm_staging_table;