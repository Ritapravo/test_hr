import React from 'react';
import styles from './welcome.module.css'
import {Link} from "react-router-dom";

const Welcome = () => {
    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to <a href="https://www.supraoncology.com/" target='_blank'>Supra Oncology!</a>
                </h1>

                <p className={styles.description}>
                    Get started
                </p>

                <div className={styles.grid}>
                    <Link to="./login" className={styles.card}>
                        <h2>Organiser Login &rarr;</h2>
                        <p>Click here to signup as curator.</p>
                    </Link>

                    <Link to="./signUp" className={styles.card}>
                        <h2>Organiser Sign up &rarr;</h2>
                        <p>Click here to login as curator.</p>
                    </Link>

                    <Link
                        to=""
                        className={styles.card}
                    >
                        <h2>Doctor Login &rarr;</h2>
                        <p>Click here to login as doctor.</p>
                    </Link>
                </div>
            </main>


        </div>
    )
}

export default Welcome