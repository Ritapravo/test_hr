import { TextField, Button } from '@mui/material';
import { React, useState, useEffect } from 'react';
import styles from './../css/login.module.css'
import { Link, useNavigate } from "react-router-dom";
import { base_url } from '../components/initializers/init_organiser';
import { setSessionStorage } from '../components/initializers/init_organiser';

const initial_values1 = {
    "email": '',
    "password": '',
}

const initial_values2 = {
    "phonenumber": '',
    "code": ''
}

const Login = () => {

    const Navigate = useNavigate();

    const handleSubmit = () => {
        let temp_val = validate();
        // console.log(values);
        if (temp_val) {
            if (option1)
                PostData(values)
            else {
                PostData2(values2);
            }
            // Navigate('/organiser_landing_page');
        }
        else
            alert("Check for incorrect fields");
    }

    const PostData = async (jsonData) => {
        // console.log("Helooo");
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
            setSessionStorage('organiser_details', data.userDetails);
            Navigate('/organiser_landing_page');
        }
    };

    const PostData2 = async (jsonData) => {
        console.log("values2", values2);
        const res = await fetch(`${base_url}/verifyOTP?phonenumber=${values2.phonenumber}&code=${values2.code}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({}),
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
            setSessionStorage('organiser_details', data.userDetails);
            // Navigate('/organiser_landing_page');
        }
    };

    const [values, setValues] = useState(initial_values1);
    const [errors, setErrors] = useState({});

    const [values2, setValues2] = useState(initial_values2);
    const [errors2, setErrors2] = useState({});

    const [option1, setOption1] = useState(true);



    const validate = (fieldValues = option1 ? values : values2) => {
        let temp = { ...errors };
        if (option1) {
            if ("email" in fieldValues)
                temp.email = /$^|.+@.+..+/.test(fieldValues.email) ? '' : 'Please enter a valid email';
            if ("email" in fieldValues)
                temp.email = /[A-Za-z0-9]+/.test(fieldValues.email) ? temp.email : 'Email cannot be empty';
            if ("password" in fieldValues)
                temp.password = fieldValues.password.length > 3 ? '' : 'Password length at least 6';
        }
        else {
            if ("phonenumber" in fieldValues)
                temp.phonenumber = fieldValues.phonenumber.length > 9 ? '' : 'Please enter a valid phone number';
            if ("code" in fieldValues)
                temp.code = fieldValues.code.length === 6 ? '' : 'Please enter a valid 6 digit OTP';
        }
        setErrors({ ...temp });
        // console.log(temp);
        if (fieldValues === option1 ? values : values2) {
            return Object.values(temp).every(x => x === "");
        }
    };

    const handleInputChange = (e) => {
        // console.log(e);
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        if (option1) {
            setValues({
                ...values,
                [name]: value
            })
        }
        else {
            setValues2({
                ...values2,
                [name]: value
            })
        }

        validate({ [name]: value })
    }

    const sendOTP = async () => {

        if (values2.phonenumber.length < 10) {
            setErrors({...errors, ['phonenumber']:'Enter a valid phone number to receive OTP'});
            return
        };
        setCounter(30);
        console.log("clicked send OTP");
        const res = await fetch(`${base_url}/loginOTP?phonenumber=${values2.phonenumber}&channel=sms`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            // body: JSON.stringify(jsonData),
        });
        const data = await res.json();
        console.log(data);
        if (data.status === 400 || data.status === 500 || !data) {
            console.log(data.message);
            window.alert(`Could  not deliver OTP\nError ${data.message}`);
            console.log(`Could  not deliver OTP\nError ${data.message}`);
        } else {
            // console.log(data);
            window.alert("OTP deliverered successfully");
            console.log("Successfully posted OTP data");
        }
    }

    const [counter, setCounter] = useState(0);

    useEffect(() => {
        const timer =
            counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);


    return (
        <div className={styles.container_cover}>
            <div className={styles.container2}>
                <h2 className={styles.h2}>LOGIN</h2>

                <div onClick={() => { setOption1(true); setErrors({}) }} style={option1 ? { borderBottom: '7px solid #8E1B1B' } : {}} className={styles.login_option}>
                    <h3>Username</h3>
                </div>


                <div onClick={() => { setOption1(false); setErrors({}) }} style={!option1 ? { borderBottom: '7px solid #8E1B1B' } : {}} className={styles.login_option}>
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
                                name={'phonenumber'}
                                value={values2.phonenumber}
                                onChange={handleInputChange}
                                {...(errors.phonenumber && { error: true, helperText: errors.phonenumber })}
                                type='number'
                                variant="standard" className={styles.text_field} InputProps={{ disableUnderline: true }} size='small' />
                        </div>

                        <div className={styles.inputs2}>
                            <p className={styles.inputs2_p}>Enter OTP*</p>
                            <TextField
                                name={'code'}
                                value={values2.code}
                                onChange={handleInputChange}
                                {...(errors.code && { error: true, helperText: errors.code })}
                                type='number'
                                variant="standard" className={styles.text_field} InputProps={{ disableUnderline: true }} size='small' />
                        </div>
                        {counter > 0 &&
                            <span className="styles.resendOTP">
                                Resend OTP in
                                <span style={{ color: "green", fontWeight: "bold" }}> 00:{counter}</span>
                            </span>
                        }
                        { counter===0 &&
                        <span style={{ cursor: 'pointer' }} onClick={() => { sendOTP() }}>send OTP</span>
                        }
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

// <div>
//     <a href={url}  onClick={e => sendOTP(e)} className={ counter > 0? 'text-center send-otp disable_a':'text-center send-otp ' }>
//         Send OTP
//     </a>
//     { counter >0 &&
//     <span className="styles.resendOTP">
//         Resend OTP in
//         <span style={{color:"green",fontWeight:"bold"}}> 00:{counter}</span>
//     </span> }
// </div>
