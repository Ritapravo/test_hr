import { React, useState } from 'react';
import { Button, MenuItem, TableContainer, Table, TableBody, TableCell, TableRow, TableRowTextField, TextField } from '@mui/material';
import styles from './table.module.css';

import DeleteIcon from '@mui/icons-material/Delete';

const max =(a, b)=> {return a>b?a:b};


const Report_table = (props) => {
    const { reports, deleteReport } = props;
    return (
        <div className={styles.table_report}>
            <TableContainer sx={{ height: '35vh' }}>
                <Table className={styles.TableBody}>
                    <TableBody className={styles.TableBody} >
                        <TableRow className={styles.tableRow}>
                            <TableCell className={styles.tableCell} width='10%' ><h3>Date</h3></TableCell>
                            <TableCell className={styles.tableCell} width='15%' ><h3>Type</h3></TableCell>
                            <TableCell className={styles.tableCell} width='30%' ><h3>Investigation and Treatment</h3></TableCell>
                            <TableCell width='40%' style={{ textAlign: 'center' }} ><h3 style={{ margin: '0' }}>Impressions</h3></TableCell>

                        </TableRow>
                        {
                            reports.map(item =>
                            (<TableRow className={styles.tableRow2} key={reports.indexOf(item)}>
                                <TableCell className={styles.tableCell} width='10%' ><p>{item.reportDate}</p></TableCell>
                                <TableCell className={styles.tableCell} width='15%' ><p>{item.report_type}</p></TableCell>
                                <TableCell className={styles.tableCell} width='30%' ><p>{item.saved_filename}</p></TableCell>
                                <TableCell style={{ textAlign: 'center', padding: '1vh 0' }} width='40%' >
                                    <p>{item.impression}</p>
                                    <DeleteIcon style={{ float: 'right', cursor: 'pointer', marginRight: '1vw' }} onClick={() => deleteReport(item)} />

                                </TableCell>
                            </TableRow>))
                        }

                       
                        {[...Array(max(6-reports.length, 0))].map((e, i) => (
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
        </div>
    )
}

export default Report_table;