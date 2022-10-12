import React from 'react';
import { numbersParseToInteger } from '../../helpers/numbers-parser';
import styles from './InfoCard.module.css';

export const InfoCard = ({ name, sum, measure ='₽'}) => {return (
    <div className={styles.Card}>
        <div className={styles.CardName}> {name} </div>
        <div className={styles.CardInput}> {numbersParseToInteger(sum)}&nbsp;{measure} </div>
    </div>
)} 
            







