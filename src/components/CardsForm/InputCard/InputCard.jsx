import classNames from 'classnames';
import React from 'react';
import styles from './InputCard.module.css';

 


export const InputCard = ({ label_text, min, max, name, onChange, onBlur, value, value_cost, error}) => {
    const name_range = name + '_range'; 
    return (
        <div className={styles.CardLabel}>

            <label>
                <p className={
                    classNames(
                        styles.CardName,
                        { [styles.CardNameCost]:  name === 'cost' },
                        { [styles.CardNameTerm]:  name === 'term' }
                    )
                     }>  {label_text} </p>
                <div 
                    className={
                        classNames(
                           { [styles.CardInput]: name === 'initialFee' },
                           { [styles.CardInputInitial_fee]: name === 'initialFee' }
                        )}
                     disabled={name === 'initialFee'}>
                    <span> 
                        {(name === 'initialFee') && (value * value_cost / 100)} 
                    </span>

                    <input
                        min={min}
                        max={max}
                        className={name === 'initialFee' ? styles.CardInputPercent : styles.CardInput}
                        type="number"
                        name={name}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                    />



                    <input
                        min={min}
                        max={max}
                        className={styles.CardRange}
                        type="range"
                        name={name_range}
                        onChange={onChange}
                        onBlur={onBlur}
                        value={value}
                    />

                </div>
            </label>
            {error && <div className={styles.error}> {error}</div> }
        </div>
    )
}