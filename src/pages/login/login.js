import { TextField, Button } from '@mui/material';
import { React, useState } from 'react';
import styles from './../css/login.module.css'
import {Link, useNavigate } from "react-router-dom";
import { base_url } from '../components/initializers/init_organiser';

const initial_values1 = {
    "email": '',
    "password": '',
}

const Login = () => {

    const Navigate = useNavigate();

    const handleSubmit = () => {
        let temp_val = validate();
        console.log(values);
        // console.log(temp_val);
        if (temp_val) {
            PostData(values)
            // Navigate('/organiser_landing_page');
        }
        else
            alert("Check for incorrect fields");
    }

    const PostData = async (jsonData) => {
        console.log("Helooo");
        const res = await fetch(`${base_url}/loginPassword`, {
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
            window.alert(`Could  not Login\nError ${data.message}`);
            console.log(`Could  not Login\nError ${data.message}`);
        } else {
            // console.log(data);
            window.alert("Logged in successfully");
            console.log("Successfully posted data");
            sessionStorage.setItem("organiser_details", JSON.stringify(data.userDetails));
            Navigate('/organiser_landing_page');
        }
    };

    const [values, setValues] = useState(initial_values1);
    const [errors, setErrors] = useState({});
    const [option1, setOption1] = useState(true);



    const validate = (fieldValues = values) => {
        let temp = { ...errors };
        if ("email" in fieldValues)
            temp.email = /$^|.+@.+..+/.test(fieldValues.email) ? '' : 'Please enter a valid email';
        if ("email" in fieldValues)
            temp.email = /[A-Za-z0-9]+/.test(fieldValues.email) ? temp.email : 'Email cannot be empty';
        if ("password" in fieldValues)
            temp.password = fieldValues.password.length > 3 ? '' : 'Password length at least 6';

        setErrors({ ...temp });

        if (fieldValues === values) {
            return Object.values(temp).every(x => x === "");
        }
    };

    const handleInputChange = (e) => {
        // console.log(e);
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setValues({
            ...values,
            [name]: value
        })

        validate({ [name]: value })
    }


    return (
        <div className={styles.container_cover}>
            <div className={styles.container2}>
                <h2 className={styles.h2}>LOGIN</h2>

                <div onClick={() => { setOption1(true) }} style={option1 ? { borderBottom: '7px solid #8E1B1B' } : {}} className={styles.login_option}>
                    <h3>Username</h3>
                </div>


                <div onClick={() => { setOption1(false) }} style={!option1 ? { borderBottom: '7px solid #8E1B1B' } : {}} className={styles.login_option}>
                    <h3>Phone Number</h3>
                </div>

                {option1 &&
                    <>
                        <div className={styles.inputs2}>
                            <p className={styles.inputs2_p}>Email ID*</p>
                            <TextField
                                name={'email'}
                                value={values.email}
                                onChange={handleInputChange}
                                {...(errors.email && { error: true, helperText: errors.email })}
                                variant="standard" className={styles.text_field} InputProps={{ disableUnderline: true }} size='small' />
                        </div>

                        <div className={styles.inputs2}>
                            <p className={styles.inputs2_p}>Password*</p>
                            <TextField
                                name={'password'}
                                value={values.password}
                                onChange={handleInputChange}
                                {...(errors.password && { error: true, helperText: errors.password })}
                                type='password' variant="standard" className={styles.text_field} InputProps={{ disableUnderline: true }} size='small' />
                        </div>
                    </>

                }
                {!option1 &&
                    <>
                        <div className={styles.inputs2}>
                            <p className={styles.inputs2_p}>Phone Number*</p>
                            <TextField
                                type='number'
                                variant="standard" className={styles.text_field} InputProps={{ disableUnderline: true }} size='small' />
                        </div>

                        <div className={styles.inputs2}>
                            <p className={styles.inputs2_p}>Enter OTP*</p>
                            <TextField
                                variant="standard" className={styles.text_field} InputProps={{ disableUnderline: true }} size='small' />
                        </div>

                        <p style={{ cursor: 'pointer' }}>send OTP</p>

                    </>

                }

                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Button className={styles.submit_button} onClick={handleSubmit} variant="contained" color='error'> Submit </Button>
                </div>
                <p className={styles.p_end2}>Don't have an account? <Link to='/signup'>Signup</Link></p>
            </div>
        </div>
    )
}

export default Login;