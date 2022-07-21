import { React, useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableRow, TableContainer, TableRowTextField, TableHead } from '@mui/material';
import styles from './table.module.css';
import Paper from '@mui/material/Paper';
import { Link, useNavigate } from "react-router-dom";
import { setSessionStorage } from '../initializers/init_organiser';
import LinearProgress from '@mui/material/LinearProgress';

const max = (a, b) => { return a > b ? a : b };

const Organiser_task_table = (props) => {

    const Navigate = useNavigate();

    const task_table = props.task_table;
    const loading = props.loading;

    const handleOrganize = (item) => {
        console.log(item.patientID);
        setSessionStorage("patient_details_organiser", { p_id: item.patientID, phr_id: item.patient_health_record, task_id: item._id });
        Navigate('/organiser');
    }

    return (
        <Paper className={styles.table_report} style={{ marginTop: '50px', }}>
            {loading && <LinearProgress />}
            <TableContainer sx={{ maxHeight: '65vh' }}>
                <Table className={styles.TableBody}>
                    <TableHead>
                        <TableRow className={styles.tableRow}>
                            <TableCell className={styles.tableCell} width='10%' ><h3>Sr no.</h3></TableCell>
                            <TableCell className={styles.tableCell} width='20%' ><h3>Date</h3></TableCell>
                            <TableCell className={styles.tableCell} width='15%' ><h3>Patient Id</h3></TableCell>
                            <TableCell width='40%' ><h3></h3></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody className={styles.TableBody} >
                        {
                            task_table.map(item =>
                            (<TableRow className={styles.tableRow2} key={item._id}>
                                <TableCell className={styles.tableCell} width='10%' ><p>{task_table.indexOf(item) + 1}</p></TableCell>
                                <TableCell className={styles.tableCell} width='20%' ><p>{item.createdAt.slice(0, 10)}</p></TableCell>
                                <TableCell className={styles.tableCell} width='15%' ><p>{item.patientID}</p></TableCell>
                                <TableCell className={styles.tableCellEnd} width='35%' >
                                    <p className={styles.tableCellEnd_p}>{item.status}</p>
                                    <Button size='small' variant='contained' onClick={() => handleOrganize(item)} ><p>{'organize'}</p></Button>
                                </TableCell>
                            </TableRow>))
                        }
                        {task_table.length === 0 &&
                            [...Array(max(6 - task_table.length, 0))].map((e, i) => (
                                <TableRow className={styles.tableRow2} key={i}>
                                    <TableCell className={styles.tableCell} width='10%' ><h3></h3></TableCell>
                                    <TableCell className={styles.tableCell} width='20%' ><h3></h3></TableCell>
                                    <TableCell className={styles.tableCell} width='15%' ><h3></h3></TableCell>
                                    <TableCell width='35%' style={{ textAlign: 'center' }} ><h3 style={{ margin: '0' }}></h3></TableCell>
                                </TableRow>))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default Organiser_task_table;