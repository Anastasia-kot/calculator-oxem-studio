import React from 'react';
import styles from './Card.module.css';
import { Formik } from 'formik';

 

export const CardForm = React.memo(({ name, summ, measure }) => {
    const handleBlur1 = (values) => {
            // alert(values.number)
            // alert(JSON.stringify(values, null, 2));
    }
  
    return (
        <div>
            <Formik
                initialValues={{ number: summ, range: summ }}
                validate={values => {
                    const errors = {};
                    if (!values.number) {
                        errors.number = 'Required';
                    } else if (
                        values.number < 1000000 || values.number>6000000
                    ) {
                        errors.number = 'Стоимость автомобиля должна быть не менее миллиона и не более 6 миллионов рублей';
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
                    validateForm,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                 }) => (
                    <form onSubmit={handleSubmit}>
                        <label>
                            <p className={styles.CardName}> {name} </p>
                            <input 
                                className={styles.CardInput}
                                type="number"
                                name="number"
                                onChange={handleChange}
                                // onChange={handleChange1(validateForm)}
                                onBlur={handleBlur}
                                // onBlur={handleBlur1(values)}
                                value={values.number} 
                                />
                            {errors.number && touched.number && errors.number}

                            <input type="range"  
                                name="range"
                                onChange={handleChange}
                                onBlur={handleBlur1((values))}
                                value={values.range}
                            />
                            {errors.range && touched.range && errors.range}
                        </label>
                        
                   
                        
                           
                    </form>
                )}
            </Formik>














        </div>

    )
})
