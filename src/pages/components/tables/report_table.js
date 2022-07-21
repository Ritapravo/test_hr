import { React, useState, useEffect } from 'react';
import { Button, MenuItem, TableContainer, Table, TableBody, TableCell, TableRow, TableRowTextField, TextField } from '@mui/material';
import styles from './table.module.css';
import { base_url, base_url2, useSessionStorage } from '../initializers/init_organiser';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import LinearProgress from '@mui/material/LinearProgress';

const max = (a, b) => { return a > b ? a : b };


const fetchReports = async (patient_details, setReports, setLoading) => {
    setLoading(true);
    try {
        const res = await fetch(
            `${base_url}/getCuratedReports/${patient_details.p_id}`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                },
            }
        );

        const data = await res.json();
        if(data.status===500)
            throw(data.messgae)
        setReports(data.data)
        console.log(data);
        setLoading(false);
    } catch (error) {
        console.log(error);
        setLoading(false);
    }
};

const Report_table = (props) => {

    var patient_details;
    patient_details = useSessionStorage("patient_details_organiser");

    const { reports, setReports} = props;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (patient_details) {
            fetchReports(patient_details, setReports, setLoading);
        }
    }, [patient_details]);


    const deleteReportFromDB = async (item) => {
        try {
            const res = await fetch(
                `${base_url}/removeCuratedReport/${item._id}`,
                {
                    method: "DELETE",
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json",
                    },
                }
            );

            const data = await res.json();
            // setReports(reports.filter((t) => t !== item));
            fetchReports(patient_details, setReports, setLoading);
            alert('Report deleted from database');
        } catch (error) {
            console.log(error);
        }
    };

    const deleteReport = (item) => {
        console.log(item._id);
        // setReports(reports.filter((t) => t !== item));
        deleteReportFromDB(item);
    }

    

    

    
    return (
        <div className={styles.table_report}>
            {loading && <LinearProgress/>}
            <TableContainer sx={{ maxHeight: '45vh' }}>
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
                                <TableCell className={styles.tableCell} width='10%' ><p>{item.reportDate.slice(0, 10)}</p></TableCell>
                                <TableCell className={styles.tableCell} width='15%' ><p>{item.report_type}</p></TableCell>
                                <TableCell className={styles.tableCell} width='30%' >
                                    <a href={`${base_url2}/getPatientReport/${item._id}`} target="_blank" title='click here to view the document'>
                                        <p style={{ display: 'inline-block', width: '100%' }}>{item.saved_filename}
                                        <LinkRoundedIcon style={{ float: 'right', cursor: 'pointer', marginRight: '1vw' }} />
                                        
                                        </p>
                                    </a>
                                </TableCell>
                                <TableCell style={{ textAlign: 'center', padding: '1vh 0' }} width='40%' >
                                    <p style={{ display: 'inline-block', width: '100%' }}>{item.impression}
                                    <DeleteIcon style={{ float: 'right', cursor: 'pointer', marginRight: '1vw' }} onClick={() => deleteReport(item)} />
                                    </p>
                                </TableCell>
                            </TableRow>))
                        }


                        {[...Array(max(6 - reports.length, 0))].map((e, i) => (
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

export  {Report_table, fetchReports};