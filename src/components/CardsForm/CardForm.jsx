import React from 'react';
import styles from './Card.module.css';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { setCostTC, setInitialFeeTC, setTermTC } from '../../redux/main-reducer.ts';



export const CardForm = React.memo(({ name, sum, measure }) => {
   
    const dispatch = useDispatch()

    const cost = useSelector(state => state.mainPage.cost)
    const initialFee = useSelector(state => state.mainPage.initialFee)
    const term = useSelector(state => state.mainPage.term)
    
    const initialValues = { 
        cost: cost, 
        cost_range: cost, 
        initial_fee: initialFee, 
        initial_fee_range: initialFee, 
        term: term, 
        term_range: term 
    }
 
  

    return (
        <div>
            <Formik

                initialValues={ initialValues }
                validate={values => {
                    const errors = {};
                    if (!values.cost) {
                        errors.cost = 'Обязательное поле';
                        values.cost = 1000000
                        values.cost_range = 1000000
                        dispatch(setCostTC(1000000))
                    } else if (
                        values.cost < 1000000 
                    ) {
                        errors.cost = 'Стоимость автомобиля должна быть не менее миллиона рублей';
                        values.cost = 1000000
                        values.cost_range = 1000000
                        dispatch(setCostTC(1000000))
                     } else if (
                        values.cost > 6000000
                    ) {
                        errors.cost = 'Стоимость автомобиля должна быть не более 6 миллионов рублей';
                        values.cost = 6000000
                        values.cost_range = 6000000
                        dispatch(setCostTC(6000000))
                    } else {
                        values.cost_range =  values.cost 
                        dispatch(setCostTC(values.cost))
                    }

                    













                    if (!values.initial_fee) {
                        errors.initial_fee = 'Обязательное поле';
                        values.initial_fee = 10
                        values.initial_fee_range = 10
                        dispatch(setInitialFeeTC(10))
                    } else if (
                        values.initial_fee < 10
                    ) {
                        errors.initial_fee = 'Первоначальный взнос должен быть не менее 10%';
                        values.initial_fee = 10
                        values.initial_fee_range = 10
                        dispatch(setInitialFeeTC(10))
                    } else if (
                        values.initial_fee > 60 
                    ) {
                        errors.initial_fee = 'Первоначальный взнос должен быть не более 60%';
                        values.initial_fee = 60
                        values.initial_fee_range = 60
                        dispatch(setInitialFeeTC(60))
                    } else {
                        values.initial_fee_range = values.initial_fee
                        dispatch(setInitialFeeTC(values.initial_fee))
                    }




                    if (!values.term) {
                        errors.term = 'Обязательное поле';
                        values.term = 1
                        values.term_range = 1
                        dispatch(setTermTC(1))
                    } else if (
                        values.term < 1  
                    ) {
                        errors.term = 'Срок лизинга должен быть не менее месяца';
                        values.term = 1
                        values.term_range = 1
                        dispatch(setTermTC(1))
                    } else if (
                        values.term > 60
                    ) {
                        errors.term = 'Срок лизинга должен быть не более 60 месяцев';
                        values.term = 60
                        values.term_range = 60
                        dispatch(setTermTC(60))
                    } else if (
                        (values.term % 1 !== 0)
                    ) {
                        errors.term = 'Срок лизинга должен быть округлен до целях месяцев';
                        values.term = Math.round(values.term)
                        values.term_range   = Math.round(values.term)
                        dispatch(setTermTC(values.term))
                    } else {
                        values.term_range = values.term
                        dispatch(setTermTC(values.term))
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

                        <div className={styles.CardLabel}>
                        <label >
                            <p className={styles.CardName + ' ' + styles.CardNameCost}> Стоимость автомобиля </p>
                            <input
                                min='1000000'
                                max='6000000' 
                                className={styles.CardInput }
                                type="number"
                                name="cost"
                                onChange={ handleChange }
                                onBlur={handleBlur}
                                value={values.cost} 
                                />
                            <input 
                                min='1000000'
                                max='6000000'
                                className={styles.CardRange}
                                type="range"
                                name="cost_range"
                                onChange={ handleChange }
                                onBlur={handleBlur}
                                value={values.cost_range} 
                                />

                             
                        </label>
                        <div className={styles.error}> {errors.cost && touched.cost && errors.cost}</div> 
                        </div>





                        <div className={styles.CardLabel}>
                            <label >
                            <p className={styles.CardName}> Первоначальный взнос </p>
                            <div className={styles.CardInput + ' ' + styles.CardInputInitial_fee} disabled={true}>
                                <span>{values.initial_fee * values.cost / 100}</span>
                                <input
                                        min='10'
                                        max='60'
                                    className={styles.CardInputPercent}
                                    type="number"
                                    name="initial_fee"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.initial_fee}
                                    disabled={false}
                                />

                                    <input
                                        min='10'
                                        max='60'
                                        className={styles.CardRange}
                                        type="range"
                                        name="initial_fee_range"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.initial_fee_range}
                                    />

                            </div>

                          
                        </label>
                            <div className={styles.error}>  {errors.initial_fee && touched.initial_fee && errors.initial_fee}</div>

                            </div>






                        <div className={styles.CardLabel}>
                            <label >
                            <p className={styles.CardName + ' ' + styles.CardNameTerm}> Срок лизинга </p>
                            <input
                                className={styles.CardInput}
                                type="number"
                                name="term"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.term}
                            />
                                <input
                                    min='1'
                                    max='60'
                                    className={styles.CardRange}
                                    type="range"
                                    name="term_range"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.term_range}
                                />           

                            </label>
                            <div className={styles.error}>  {errors.term && touched.term && errors.term}</div>

                        </div>

                   
                        
                           
                    </form>
                )}
            </Formik>














        </div>

    )
})
