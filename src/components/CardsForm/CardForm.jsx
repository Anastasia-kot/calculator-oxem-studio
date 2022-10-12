import React, {  useState } from 'react';
import styles from './Card.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setCostTC, setInitialFeeTC, setTermTC } from '../../redux/main-reducer.ts';
import { InputCard } from '../InputCard/InputCard';
import { InfoCard } from '../InfoCard/InfoCard';
import { Button } from '../Button/Button';
import { setFormSubmitTC } from '../../redux/main-reducer.ts';



export const CardForm = React.memo(() => {
   
    const dispatch = useDispatch()
//для ввода
    const cost = useSelector(state => state.mainPage.cost)
    const initialFee = useSelector(state => state.mainPage.initialFee)
    const term = useSelector(state => state.mainPage.term)

//для расчетных значений и кнопки
    const contractSum = useSelector(state => state.mainPage.contractSum)
    const monthlyPayment = useSelector(state => state.mainPage.monthlyPayment)
    const isFetching = useSelector(state => state.mainPage.isFetching)

    const onClickFunctionForButton = () => {
        dispatch(setFormSubmitTC(cost, initialFee, term))
    }
 
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
                const newTerm = Math.round(e.currentTarget.value)
                setValues((actual) => { return { ...actual, term: newTerm } })
                setErrors((actual) => { return { ...actual, term: 'Срок лизинга должен быть округлен до целях месяцев' } })
                dispatch(setTermTC(newTerm))
            }  
        }

    }
 

return ( 
    <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formInputs}>
        <InputCard 
                min='1000000' 
                max='6000000' 
                handleChange={handleChange.handleChangeCost}
                handleBlur={handleBlur.handleBlurCost}
                value={values.cost} 
                error={errors.cost}
                name='cost'
                label_text='Стоимость автомобиля'/>
                

        <InputCard
                min='10'
                max='60'
                handleChange={handleChange.handleChangeInitialFee}
                handleBlur={handleBlur.handleBlurInitialFee}
                value={values.initialFee}
                error={errors.initialFee}
                name='initial_fee'
                value_cost={values.cost} 
                label_text='Первоначальный взнос'/>

 

            <InputCard
                min='1'
                max='60'
                handleChange={handleChange.handleChangeTerm}
                handleBlur={handleBlur.handleBlurTerm}
                value={values.term}
                error={errors.term}
                name='term' 
                label_text='Срок лизинга' />
                      
        </div>
        <div className={styles.AppInfoCardsButton}>
            <InfoCard className={styles.AppInfoCard} name='Сумма договора лизинга' sum={contractSum} measure='₽' />
            <InfoCard className={styles.AppInfoCard} name='Ежемесячный платеж от' sum={monthlyPayment} measure='₽' />
            <Button className={styles.AppButton}  name={'Оставить заявку'} isFetching={isFetching} onClickFunc={onClickFunctionForButton} />
        </div>

                           
</form>)
})
