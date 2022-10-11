import React, {  useState } from 'react';
import styles from './Card.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setCostTC, setInitialFeeTC, setTermTC } from '../../redux/main-reducer.ts';



export const CardForm = React.memo(({ name, sum, measure }) => {
   
    const dispatch = useDispatch()

    const cost = useSelector(state => state.mainPage.cost)
    const initialFee = useSelector(state => state.mainPage.initialFee)
    const term = useSelector(state => state.mainPage.term)
 
 
   const [values, setValues] = useState({
       cost: cost,
       initialFee: initialFee,
       term: term
   })
 
    const [errors, setErrors] = useState({
        cost: '',
        initialFee: '',
        term: ''
   })
   
 
   const touched = {
       cost: false,
       initialFee: false,
       term: false
   }

    const handleSubmit = () => {}
    const handleChange = {
          handleChangeCost : (e) => {
            setValues((actual) => { return { ...actual, cost: e.target.value } })
            setErrors((actual) => { return { ...actual, cost: '' } })
            dispatch(setCostTC(e.target.value))
        },
      handleChangeInitialFee : (e) => {
            setValues((actual) => { return { ...actual, initialFee: e.target.value } })
            setErrors((actual) => { return { ...actual, initialFee: '' } })
            dispatch(setInitialFeeTC(e.target.value))

        },
      handleChangeTerm : (e) => {
            setValues((actual) => { return { ...actual, term: e.target.value } })
            setErrors((actual) => { return { ...actual, term: '' } })
            dispatch(setTermTC(e.target.value))
        }
    }
   
    const handleBlur = {
          handleBlurCost: (e) => {
            if (!e.currentTarget.value) {
                setValues((actual) => { return { ...actual, cost: 1000000 } })
                setErrors((actual) => { return { ...actual, cost: 'Обязательное поле' } })
                dispatch(setCostTC(1000000))
            } else if ( e.currentTarget.value < 1000000   ) {
                setValues((actual) => { return { ...actual, cost: 1000000 } })
                setErrors((actual) => { return { ...actual, cost: 'Стоимость автомобиля должна быть не менее миллиона рублей' }})
                dispatch(setCostTC(1000000))
            } else if ( e.currentTarget.value > 6000000 ) {
                setValues((actual) => { return { ...actual, cost: 6000000 } })
                setErrors((actual) => { return { ...actual, cost: 'Стоимость автомобиля должна быть не более 6 миллионов рублей' } })
                dispatch(setCostTC(6000000))
            }
        },
        handleBlurInitialFee: (e) => {
            if (!e.currentTarget.value) {
                setValues((actual) => { return { ...actual, initialFee: 10 } })
                setErrors((actual) => { return { ...actual, initialFee: 'Обязательное поле' } })
                dispatch(setInitialFeeTC(10))
            } else if (e.currentTarget.value < 10) {
                setValues((actual) => { return { ...actual, initialFee: 10 } })
                setErrors((actual) => { return { ...actual, initialFee: 'Первоначальный взнос должен быть не менее 10%' } })
                dispatch(setInitialFeeTC(10))
            } else if (e.currentTarget.value > 60) {
                setValues((actual) => { return { ...actual, initialFee: 60 } })
                setErrors((actual) => { return { ...actual, initialFee: 'Первоначальный взнос должен быть не более 60%' } })
                dispatch(setInitialFeeTC(60))
            }
        },

        handleBlurTerm: (e) => {
            if (
                (values.term % 1 !== 0)
            ) {
                errors.term = 'Срок лизинга должен быть округлен до целях месяцев';
                values.term = Math.round(values.term)
                values.term_range = Math.round(values.term)
                dispatch(setTermTC(values.term))
            }  


            if (!e.currentTarget.value) {
                setValues((actual) => { return { ...actual, term: 1 } })
                setErrors((actual) => { return { ...actual, term: 'Обязательное поле' } })
                dispatch(setTermTC(1))
            } else if (e.currentTarget.value < 1) {
                setValues((actual) => { return { ...actual, term: 1 } })
                setErrors((actual) => { return { ...actual, term: 'Срок лизинга должен быть не менее месяца' } })
                dispatch(setTermTC(1))
            } else if (e.currentTarget.value > 60) {
                setValues((actual) => { return { ...actual, term: 60 } })
                setErrors((actual) => { return { ...actual, term: 'Срок лизинга должен быть не более 60 месяцев' } })
                dispatch(setTermTC(60))
            } else if (e.currentTarget.value % 1 !== 0) {
                setValues((actual) => { return { ...actual, term: Math.round(e.currentTarget.value) } })
                setErrors((actual) => { return { ...actual, term: 'Срок лизинга должен быть округлен до целях месяцев' } })
                dispatch(setTermTC(Math.round(e.currentTarget.value)))
            } 
        }

    }
 

    return (
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
                                onChange={handleChange.handleChangeCost}
                                onBlur={handleBlur.handleBlurCost}
                                value={values.cost} 
                                />
                            <input 
                                min='1000000'
                                max='6000000'
                                className={styles.CardRange}
                                type="range"
                                name="cost_range"
                                onChange={handleChange.handleChangeCost}
                                onBlur={handleBlur.handleBlurCost}
                                value={values.cost} 
                                />

                             
                        </label>
                            <div className={styles.error}> {errors.cost}
                                {/* {errors.cost && (touched.cost || touched.cost_range) && errors?.cost }  */}
                             </div> 
                        </div>





                        <div className={styles.CardLabel}>
                            <label >
                            <p className={styles.CardName}> Первоначальный взнос </p>
                            <div className={styles.CardInput + ' ' + styles.CardInputInitial_fee} disabled={true}>
                                <span>{values.initialFee * values.cost / 100}</span>
                                <input
                                        min='10'
                                        max='60'
                                    className={styles.CardInputPercent}
                                    type="number"
                                    name="initial_fee"
                                    onChange={handleChange.handleChangeInitialFee}
                                    onBlur={handleBlur.handleBlurInitialFee}
                                    value={values.initialFee}
                                    disabled={false}
                                />

                                    <input
                                        min='10'
                                        max='60'
                                        className={styles.CardRange}
                                        type="range"
                                        name="initial_fee_range"
                                        onChange={handleChange.handleChangeInitialFee}
                                        onBlur={handleBlur.handleBlurInitialFee}
                                        value={values.initialFee}
                                    />

                            </div>

                          
                        </label>
                            <div className={styles.error}>{errors.initialFee}  {errors.initialFee && touched.initialFee && errors.initialFee}</div>

                            </div>






                        <div className={styles.CardLabel}>
                            <label >
                            <p className={styles.CardName + ' ' + styles.CardNameTerm}> Срок лизинга </p>
                            <input
                                className={styles.CardInput}
                                type="number"
                                name="term"
                                onChange={handleChange.handleChangeTerm}
                                onBlur={handleBlur.handleBlurTerm}
                                value={values.term}
                            />
                                <input
                                    min='1'
                                    max='60'
                                    className={styles.CardRange}
                                    type="range"
                                    name="term_range"
                                    onChange={handleChange.handleChangeTerm}
                                    onBlur={handleBlur.handleBlurTerm}
                                    value={values.term}
                                />           

                            </label>
                            <div className={styles.error}> {errors.term} {errors.term && touched.term && errors.term}</div>
                        </div>

                   
                        
                           
                    </form>
    )
})
