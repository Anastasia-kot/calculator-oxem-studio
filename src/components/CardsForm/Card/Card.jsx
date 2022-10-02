import React from 'react';
import styles from './Card.module.css';

 

export const Card =  ({ name, 
    // summ, measure, handleChange, handleBlur, values, errors, touched
}) => {
  
                        <label>
                            <p className={styles.CardName}> {name} </p>
                            <input 
                                className={styles.CardInput}
                                type="number"
                                name="number"
                                // onChange={handleChange}
                                // onChange={handleChange1(validateForm)}
                                // onBlur={handleBlur}
                                // onBlur={handleBlur1(values)}
                                // value={values.number} 
                                />
                            {/* {touched.number && errors.number} */}

                            <input type="range"  
                                name="range"
                                // onChange={handleChange}
                                // onBlur={handleBlur1((values))}
                                // value={values.range}
                            />
                            {/* {errors.range && touched.range} */}
                        </label>
 } 
            







