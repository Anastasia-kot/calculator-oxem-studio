import classNames from 'classnames';
import React from 'react';
import { numbersParseToInteger } from '../../helpers/numbers-parser';
import styles from './InputCard.module.css';
 
export const InputCard = ({ min, max, handleChange, handleBlur, value, error, name, value_cost, label_text }) => {
    const name_range = name + '_range'
    
    return (
        <div className={styles.CardLabel}>
            <label>
              
                <p className={
                    classNames(
                        styles.CardName,
                        { [styles.CardNameCost]: name === 'cost' },
                        { [styles.CardNameTerm]: name === 'term' },
                    )}
                >   
                    {label_text}
                </p> 
               
               

                <div 
                    className={
                        classNames(
                            { [styles.CardInputWrapper]: name !== 'initial_fee' },
                            { [styles.CardInput]: name === 'initial_fee' },
                            { [styles.CardInputInitial_fee]: name === 'initial_fee' },
                        )
                    }
                    disabled={name === 'initial_fee'} 
                >
                    
                    <span>
                        {(name === 'initial_fee') 
                            ? numbersParseToInteger(value * value_cost / 100)
                            : numbersParseToInteger(value) }
                    </span>

                    <input
                        min={min}
                        max={max}
                        className={(name === 'initial_fee') ? styles.CardInputPercent : styles.CardInput}
                        type="number"
                        name={name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={value}
                    />


                    <input
                        min={min}
                        max={max}
                        className={styles.CardRange}
                        type="range"
                        name={name_range} 
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={value}
                    />

                </div>
            </label>
            
            <div className={styles.error}> 
                {error}
            </div>

        </div>
)} 
            







