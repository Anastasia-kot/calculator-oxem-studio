import React from 'react';
import styles from './InfoCard.module.css';

export const InfoCard = ({ name, summ = 0, measure ='₽'}) => {return (
    <div className={styles.Card}>
        <div className={styles.CardName}> {name} </div>
        <div className={styles.CardInput}> {summ + ' '+ measure} </div>
    </div>
)} 
            







