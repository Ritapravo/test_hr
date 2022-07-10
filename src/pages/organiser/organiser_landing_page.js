import { React, useState, useEffect } from 'react';
import { Button, Table, TableBody, TableCell, TableRow, TableRowTextField } from '@mui/material';
import styles from './../css/organiser.module.css';
import { Link, useNavigate } from "react-router-dom";
import Organiser_task_table from '../components/tables/organiser_task_table';
import Container from '../components/layout/container';


const initial_task_table = [
  { _id: 1, createdAt: '12/04/2021', patientID: 123456, status: "New Report ", button: 'organize', patient_health_record:'abcde' },
  { _id: 2, createdAt: '12/04/2021', patientID: 234567, status: "New Report Added", button: 'organize', patient_health_record:'bcdef' },
  { _id: 3, createdAt: '12/04/2021', patientID: 345678, status: "New Report Added", button: 'organize', patient_health_record:'cdefg' },
  { _id: 4, createdAt: '12/04/2021', patientID: 456789, status: "New Report Added", button: 'organize', patient_health_record:'defgh' },
]


const Organiser_landing_page = () => {

  // var organiser_details;

  // organiser_details = useSessionStorage("organiser_details");

  const Navigate = useNavigate();
  // const name = organiser_details.first_name;
  const name = 'Ritapravo';

  // console.log(organiser_details);

  const [task_table, setTask_table] = useState(initial_task_table);


  const handleLogout = () => {
    Navigate('/login');
  }

  const fetchTask = async () => {
    try {
      const res = await fetch(
        //`http://localhost:3001/api/organizers/getTasksList/${organiser_details._id}`,
        `http://localhost:3001/api/organizers/getTasksList/62a4274c1c54a3fb0973fdbc`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        }
      );

      const data = await res.json();
      setTask_table(data.data)
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (organiser_details._id)
  //     fetchTask();
  // }, [organiser_details]);



  return (

    <Container>


      <Button size='small' color="error" style={{ float: "right", fontSize: "bold" }} variant='outlined' onClick={() => handleLogout()} ><p>Logout</p></Button>
      <div className={styles.profile_image}>
        {/* <Image href='/' src={profile_img} alt="Logo"  /> */}

      </div>


      <div className={styles.profile_info}>
        <h2 className={styles.profile_name}>Hi, {name} </h2>
        <p className={styles.profile_greeting}>Who are we helping today?</p>
      </div>



      
        <Organiser_task_table task_table={task_table}/>
      
    </Container>

  )
}

export default Organiser_landing_page