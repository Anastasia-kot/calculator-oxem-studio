import React from 'react';
import styles from './Card.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setCostTC, setInitialFeeTC, setTermTC } from '../../redux/main-reducer.ts';
import { InputCard } from './InputCard/InputCard';
import { InfoCard } from '../InfoCard/InfoCard';
import { Button } from '../Button/Button';
import { setFormSubmitTC } from '../../redux/main-reducer.ts';


export const CardsForm = React.memo(({ name, sum, measure }) => {

    const dispatch = useDispatch()

    const cost = useSelector(state => state.mainPage.cost)
    const initialFee = useSelector(state => state.mainPage.initialFee)
    const term = useSelector(state => state.mainPage.term)

    //button + cards state
    const contractSum = useSelector(state => state.mainPage.contractSum)
    const monthlyPayment = useSelector(state => state.mainPage.monthlyPayment)
    const isFetching = useSelector(state => state.mainPage.isFetching)

    const [values, setValues] = React.useState({
        cost: cost,
        initialFee: initialFee,
        term: term,
    })
    const [errors, setErrors] = React.useState({
        cost: '',
        initialFee: '',
        term: '',
    })


    const onChange = {
        onChangeCost: (e) => {
            setValues(
                (prev) => {
                    return {
                        ...prev,
                        cost: e.target.value
                    }
                }
            )
        },
        onChangeInitialFee: (e) => {
            setValues(
                (prev) => {
                    return {
                        ...prev,
                        initialFee: e.target.value
                    }
                }
            )
        },
        onChangeTerm: (e) => {
            setValues(
                (prev) => {
                    return {
                        ...prev,
                        term: e.target.value
                    }
                }
            )
        }


    }
    const onBlur = {
        onBlurCost: (e) => {
            if (!values.cost) {
                setErrors(
                    (prev) => {
                        return {
                            ...prev,
                            cost: 'Обязательное поле'
                        }
                    }
                )
                setValues(
                    (prev) => {
                        return {
                            ...prev,
                            cost: 1000000
                        }
                    }
                )
                dispatch(setCostTC(1000000))
            } else if (
                values.cost < 1000000
            ) {
                setErrors(
                    (prev) => {
                        return {
                            ...prev,
                            cost: 'Стоимость автомобиля должна быть не менее миллиона рублей'
                        }
                    }
                )
                setValues(
                    (prev) => {
                        return {
                            ...prev,
                            cost: 1000000
                        }
                    }
                )
                dispatch(setCostTC(1000000))
            } else if (
                values.cost > 6000000
            ) {
                setErrors(
                    (prev) => {
                        return {
                            ...prev,
                            cost: 'Стоимость автомобиля должна быть не более 6 миллионов рублей'
                        }
                    }
                )
                setValues(
                    (prev) => {
                        return {
                            ...prev,
                            cost: 6000000
                        }
                    }
                )
                dispatch(setCostTC(6000000))
            } else {
                setErrors(
                    (prev) => {
                        return {
                            ...prev,
                            cost: ''
                        }
                    }
                )
                dispatch(setCostTC(values.cost))
            }
        },

        onBlurInitialFee: (e) => {
            if (!values.initialFee) {
                setErrors(
                    (prev) => {
                        return {
                            ...prev,
                            initialFee: 'Обязательное поле'
                        }
                    }
                )
                setValues(
                    (prev) => {
                        return {
                            ...prev,
                            initialFee: 10
                        }
                    }
                )
                dispatch(setCostTC(10))

            } else if (
                values.initialFee < 10
            ) {
                setErrors(
                    (prev) => {
                        return {
                            ...prev,
                            initialFee: 'Первоначальный взнос должен быть не менее 10%'
                        }
                    }
                )
                setValues(
                    (prev) => {
                        return {
                            ...prev,
                            initialFee: 10
                        }
                    }
                )
                dispatch(setInitialFeeTC(10))
            } else if (
                values.initialFee > 60
            ) {
                setErrors(
                    (prev) => {
                        return {
                            ...prev,
                            initialFee: 'Первоначальный взнос должен быть не более 60%'
                        }
                    }
                )
                setValues(
                    (prev) => {
                        return {
                            ...prev,
                            initialFee: 60
                        }
                    }
                )
                dispatch(setInitialFeeTC(60))
            } else {
                setErrors(
                    (prev) => {
                        return {
                            ...prev,
                            initialFee: ''
                        }
                    }
                )
                dispatch(setInitialFeeTC(values.initialFee))
            }
        },
        onBlurTerm: (e) => {
            if (!values.term) {
                setErrors(
                    (prev) => {
                        return {
                            ...prev,
                            term: 'Обязательное поле'
                        }
                    }
                )
                setValues(
                    (prev) => {
                        return {
                            ...prev,
                            term: 1
                        }
                    }
                )
                dispatch(setTermTC(1))
            } else if (
                values.term < 1
            ) {
                setErrors(
                    (prev) => {
                        return {
                            ...prev,
                            term: 'Срок лизинга должен быть не менее месяца'
                        }
                    }
                )
                setValues(
                    (prev) => {
                        return {
                            ...prev,
                            term: 1
                        }
                    }
                )
                dispatch(setTermTC(1))
            } else if (
                values.term > 60
            ) {
                setErrors(
                    (prev) => {
                        return {
                            ...prev,
                            term: 'Срок лизинга должен быть не более 60 месяцев'
                        }
                    }
                )
                setValues(
                    (prev) => {
                        return {
                            ...prev,
                            term: 60
                        }
                    }
                )
                dispatch(setTermTC(60))
            } else if (
                (values.term % 1 !== 0)
            ) {
                let round_months = Math.round(values.term)
                setErrors(
                    (prev) => {
                        return {
                            ...prev,
                            term: 'Срок лизинга должен быть округлен до целях месяцев'
                        }
                    }
                )
                setValues(
                    (prev) => {
                        return {
                            ...prev,
                            term: round_months
                        }
                    }
                )
                dispatch(setTermTC(round_months))
            } else {
                setErrors(
                    (prev) => {
                        return {
                            ...prev,
                            term: ''
                        }
                    }
                )
                dispatch(setTermTC(values.term))
            }
        }
    }
    const onClickFunctionForButton = () => {
        dispatch(setFormSubmitTC(cost, initialFee, term))
    }
    const handleSubmit = () => { }


    return (
        <div>

            <form
                onSubmit={handleSubmit}
                className={styles.form}>
                <div className={styles.formInputsGroup}>

                    <InputCard
                        label_text='Стоимость автомобиля '
                        min='1000000'
                        max='6000000'
                        name='cost'
                        onChange={onChange.onChangeCost}
                        onBlur={onBlur.onBlurCost}
                        value={values.cost}
                        error={errors.cost}
                    />

                    <InputCard
                        label_text='Первоначальный взнос'
                        min='10'
                        max='60'
                        name='initialFee'
                        onChange={onChange.onChangeInitialFee}
                        onBlur={onBlur.onBlurInitialFee}
                        value={values.initialFee}
                        value_cost={values.cost}
                        error={errors.initialFee}
                    />

                    <InputCard
                        label_text='Срок лизинга'
                        min='1'
                        max='60'
                        name='term'
                        onChange={onChange.onChangeTerm}
                        onBlur={onBlur.onBlurTerm}
                        value={values.term}
                        error={errors.term}
                    />
                </div>

                <div className={styles.AppInfoCardsButton}>
                    <InfoCard className={styles.AppInfoCard} name='Сумма договора лизинга' sum={contractSum} measure='₽' />
                    <InfoCard className={styles.AppInfoCard} name='Ежемесячный платеж от' sum={monthlyPayment} measure='₽' />
                    <Button className={styles.AppButton} name={'Оставить заявку'} isFetching={isFetching} onClickFunc={onClickFunctionForButton} />
                </div>

            </form>

        </div>
    )
})
