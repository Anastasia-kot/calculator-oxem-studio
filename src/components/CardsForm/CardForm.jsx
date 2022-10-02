import React from 'react';
import styles from './Card.module.css';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
// import { numbersParse } from '../../helpers/numbers-parser';



export const CardForm = React.memo(({ name, sum, measure }) => {
    const handleBlur1 = (values) => {
            // alert(values.number)
            // alert(JSON.stringify(values, null, 2));
    }
    
    const dispatch = useDispatch()

   
    return (
        <div>
            <Formik

                initialValues={{ cost: 1000000, initial_fee: 10, term: 12  }}
                validate={values => {
                    const errors = {};
                    if (!values.cost) {
                        errors.cost = 'Обязательное поле';
                        values.cost = 1000000

                    } else if (
                        values.cost < 1000000 
                    ) {
                        errors.cost = 'Стоимость автомобиля должна быть не менее миллиона рублей';
                        values.cost = 1000000
                     } else if (
                        values.cost > 6000000
                    ) {
                        errors.cost = 'Стоимость автомобиля должна быть не более 6 миллионов рублей';
                        values.cost = 6000000
                    } 

            

                    if (!values.initial_fee) {
                        errors.initial_fee = 'Обязательное поле';
                        values.initial_fee = 10

                    } else if (
                        values.initial_fee < 10
                    ) {
                        errors.initial_fee = 'Первоначальный взнос должен быть не менее 10%';
                        values.initial_fee = 10
                    } else if (
                        values.initial_fee > 60 
                    ) {
                        errors.initial_fee = 'Первоначальный взнос должен быть не более 60%';
                        values.initial_fee = 60
                    } 




                    if (!values.term) {
                        errors.term = 'Обязательное поле';
                        values.term = 1

                    } else if (
                        values.term < 1  
                    ) {
                        errors.term = 'Срок лизинга должен быть не менее месяца';
                        values.term = 1
                    } else if (
                        values.term > 60
                    ) {
                        errors.term = 'Срок лизинга должен быть не более 60 месяцев';
                        values.term = 60
                    } else if (
                        (values.term % 1 !== 0)
                    ) {
                        errors.term = 'Срок лизинга должен быть округлен до целях месяцев';
                        values.term = Math.round(values.term)
                    }  


                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
               
            >
         
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                 }) => (
                    <form 
                        onSubmit={handleSubmit}
                        className={styles.form}>


                        <label>
                            <p className={styles.CardName + ' ' + styles.CardNameCost}> Стоимость автомобиля </p>
                            <input 
                                className={styles.CardInput }
                                type="number"
                                name="cost"
                                onChange={handleChange}
                                // onChange={handleChange1(validateForm)}
                                onBlur={handleBlur}
                                // onBlur={handleBlur1(values)}
                                value={values.cost} 
                                />

                            {/* <span>{numbersParse(values.cost)}</span>   разделение числа пробелами*/}   
                            
                            <div> {errors.cost && touched.cost && errors.cost}</div> 

                          
                        </label>
                        





                        <label>
                            <p className={styles.CardName }> Первоначальный взнос </p>
                            <div className={styles.CardInput + ' ' + styles.CardInputInitial_fee} >
                                <span>{values.initial_fee * values.cost / 100}</span>
                                <input
                                    className={ styles.CardInputPersent}
                                    type="number"
                                    name="initial_fee"
                                    onChange={handleChange}
                                    // onChange={handleChange1(validateForm)}
                                    onBlur={handleBlur}
                                    // onBlur={handleBlur1(values)}
                                    value={values.initial_fee}
                                />
                            </div>
                            <div> {errors.initial_fee && touched.initial_fee && errors.initial_fee}</div>

                          
                        </label>






                        <label>
                            <p className={styles.CardName + ' ' + styles.CardNameTerm}> Срок лизинга </p>
                            <input
                                className={styles.CardInput}
                                type="number"
                                name="term"
                                onChange={handleChange}
                                // onChange={handleChange1(validateForm)}
                                onBlur={handleBlur}
                                // onBlur={handleBlur1(values)}
                                value={values.term}
                            />
                            <div>{errors.term && touched.term && errors.term}</div>

                      
                        </label>

                   
                        
                           
                    </form>
                )}
            </Formik>














        </div>

    )
})
