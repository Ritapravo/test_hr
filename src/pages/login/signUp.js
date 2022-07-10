import { TextField, Button } from '@mui/material';
import { React, useState } from 'react';
import styles from './../css/login.module.css'
import { Link, useNavigate } from "react-router-dom";
import { base_url } from '../components/initializers/init_organiser';

const initial_values = {
    "phone_number": '',
    "first_name": '',
    "last_name": '',
    "email": '',
    "password": '',
    "cpassword": ''
}

const SignUp = () => {

    const Navigate = useNavigate();

    const handleSubmit = () => {
        let temp_val = validate();

        let jsonData = { ...values, ['phone_number']: parseInt(values.phone_number) };
        console.log(jsonData);

        // console.log(temp_val);
        if (temp_val) {
            console.log('validated');
            PostData(jsonData);
            // Navigate('/login');

        }
        else
            alert("Check for incorrect fields");
    }

    const PostData = async (jsonData) => {
        console.log("Helooo");
        const res = await fetch(`${base_url}/signUp`, {
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
            window.alert(`Could  not Sign Up\nError ${data.message}`);
            console.log(`Could  not Sign Up\nError ${data.message}`);
        } else {
            console.log(data);
            window.alert("Successfully posted data");
            console.log("Successfully posted data");
            Navigate('/login');

        }
    };

    const [values, setValues] = useState(initial_values);
    const [errors, setErrors] = useState({})


    const autocomplete = 'off';


    const validate = (fieldValues = values) => {
        let temp = { ...errors };

        if ("phone_number" in fieldValues)
            temp.phone_number = fieldValues.phone_number.length > 9 ? '' : 'Please enter a valid phone number';
        if ("first_name" in fieldValues)
            temp.first_name = /[A-Za-z0-9]+/.test(fieldValues.first_name) ? '' : 'First Name cannot be empty';
        if ("last_name" in fieldValues)
            temp.last_name = /[A-Za-z0-9]+/.test(fieldValues.last_name) ? '' : 'Last Name cannot be empty';
        if ("email" in fieldValues)
            temp.email = /$^|.+@.+..+/.test(fieldValues.email) ? '' : 'Please enter a valid email';
        if ("email" in fieldValues)
            temp.email = /[A-Za-z0-9]+/.test(fieldValues.email) ? temp.email : 'Email cannot be empty';
        if ("password" in fieldValues)
            temp.password = fieldValues.password.length > 5 ? '' : 'Password length at least 6';
        if ("cpassword" in fieldValues)
            temp.cpassword = fieldValues.cpassword === values.password ? '' : 'Must be same as password';

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
            <div className={styles.container}>
                <h2 className={styles.h2}>SIGNUP</h2>

                <form autoComplete={autocomplete}>
                    <div className={styles.inputs}>
                        <p className={styles.inputs_p}>First Name</p>
                        <TextField
                            name={'first_name'}
                            value={values.first_name}
                            onChange={handleInputChange}
                            {...(errors.first_name && { error: true, helperText: errors.first_name })}
                            variant="standard" className={styles.text_field} InputProps={{ disableUnderline: true }} size='small'
                        />
                    </div>

                    <div className={styles.inputs}>
                        <p className={styles.inputs_p}>Last Name</p>
                        <TextField
                            name={'last_name'}
                            value={values.last_name}
                            onChange={handleInputChange}
                            {...(errors.last_name && { error: true, helperText: errors.last_name })}
                            variant="standard" className={styles.text_field} InputProps={{ disableUnderline: true }} size='small' />
                    </div>

                    <div className={styles.inputs}>
                        <p className={styles.inputs_p}>Email ID</p>
                        <TextField
                            name={'email'}
                            value={values.email}
                            onChange={handleInputChange}
                            {...(errors.email && { error: true, helperText: errors.email })}
                            variant="standard" className={styles.text_field} InputProps={{ disableUnderline: true }} size='small' />
                    </div>

                    <div className={styles.inputs}>
                        <p className={styles.inputs_p}>Phone Number</p>
                        <TextField
                            name={'phone_number'}
                            value={values.phone_number}
                            onChange={handleInputChange}
                            {...(errors.phone_number && { error: true, helperText: errors.phone_number })}
                            type='number' variant="standard" className={styles.text_field} InputProps={{ disableUnderline: true }} size='small' />
                    </div>

                    <div className={styles.inputs}>
                        <p className={styles.inputs_p}>Create Password</p>
                        <TextField
                            name={'password'}
                            value={values.password}
                            onChange={handleInputChange}
                            {...(errors.password && { error: true, helperText: errors.password })}
                            type='password' variant="standard" className={styles.text_field} InputProps={{ disableUnderline: true }} size='small' />
                    </div>

                    <div className={styles.inputs}>
                        <p className={styles.inputs_p}>Confirm Password</p>
                        <TextField
                            name={'cpassword'}
                            value={values.cpassword}
                            onChange={handleInputChange}
                            {...(errors.cpassword && { error: true, helperText: errors.cpassword })}
                            type='password' variant="standard" className={styles.text_field} InputProps={{ disableUnderline: true }} size='small' />
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '30px' }}>
                        <Button className={styles.submit_button} onClick={handleSubmit} variant="contained" color='error'> Submit </Button>
                    </div>
                    <p className={styles.p_end}>Already have an account? <Link color='blue' to='/login'>Login</Link></p>
                </form>
            </div>
            
        </div>
    )
}

export default SignUp