import { React, useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableRow, TableContainer, TableRowTextField } from '@mui/material';
import styles from './table.module.css';
import Paper from '@mui/material/Paper';
import { Link, useNavigate } from "react-router-dom";

const Organiser_task_table = (props) => {

    const Navigate = useNavigate();

    const task_table = props.task_table;

    const handleOrganize = (item) => {
        console.log(item.patientID);
        sessionStorage.setItem("patient_details_organiser", JSON.stringify({ p_id: item.patientID, phr_id: item.patient_health_record }))
        Navigate('/organiser');
    }

    return (
        <Paper className={styles.table_report} style={{ marginTop: '50px', }}>
            <TableContainer sx={{ maxHeight: '65vh' }}>
                <Table className={styles.TableBody}>
                    <TableBody className={styles.TableBody} >
                        <TableRow className={styles.tableRow}>
                            <TableCell className={styles.tableCell} width='10%' ><h3>Sr no.</h3></TableCell>
                            <TableCell className={styles.tableCell} width='20%' ><h3>Date</h3></TableCell>
                            <TableCell className={styles.tableCell} width='15%' ><h3>Patient Id</h3></TableCell>
                            <TableCell width='40%' ><h3></h3></TableCell>
                        </TableRow>
                        {
                            task_table.map(item =>
                            (<TableRow className={styles.tableRow2} key={item._id}>
                                <TableCell className={styles.tableCell} width='10%' ><p>{task_table.indexOf(item) + 1}</p></TableCell>
                                <TableCell className={styles.tableCell} width='20%' ><p>{item.createdAt.slice(0, 10)}</p></TableCell>
                                <TableCell className={styles.tableCell} width='15%' ><p>{item.patientID}</p></TableCell>
                                <TableCell className={styles.tableCellEnd} width='35%' >
                                    <p className={styles.tableCellEnd_p}>{item.status}</p>
                                    <Button size='small' variant='contained' onClick={() => handleOrganize(item)} ><p>{item.button}</p></Button>
                                </TableCell>
                            </TableRow>))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default Organiser_task_table;