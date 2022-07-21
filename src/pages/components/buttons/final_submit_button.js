import { React, useState, useEffect, forwardRef } from 'react';
import { Button } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import { useSessionStorage } from '../initializers/init_organiser';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Final_submit_button = (props) => {
    var patient_details;
    patient_details = useSessionStorage("patient_details_organiser");
    const { reports } = props;

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose1 = () => {
        setOpen(false);
    };

    const handleClose2 = () => {
        setOpen(false);
        Navigate('/organiser_landing_page');
    };
    const handleSubmit = () => {
        // alert('Submitted');
        setOpen(true);
        // Navigate('/organiser_landing_page');

    }

    const Navigate = useNavigate();
    return (

        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <Button
                disabled={reports.length === 0}
                onClick={() => handleSubmit()}
                variant="contained" color='success'
            >
                Submit
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose1}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Final Submit Confirmation!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        You will not be able to edit any more once you hit submit
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose1}>Disagree</Button>
                    <Button onClick={handleClose2}>Agree</Button>
                </DialogActions>
            </Dialog>
        </div>

    )
}

export default Final_submit_button;