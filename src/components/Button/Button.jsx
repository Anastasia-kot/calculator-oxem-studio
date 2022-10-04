import React from 'react';
import { useDispatch } from 'react-redux';
import { setFormSubmitTC } from '../../redux/main-reducer.ts';
import styles from './Button.module.css';

 

export const Button = ({ name, isFetching, onClickFunc }) => {

 
     
    return (
        <button className={styles.submitButton}>
            {isFetching
                ? <svg className={styles.spinner} viewBox="0 0 50 50">
                    <circle className={styles.path} cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
                  </svg>
                : <h2 className={styles.submitButtonText} onClick={onClickFunc }>{name} </h2>
            }    
        </button>
    )
}

