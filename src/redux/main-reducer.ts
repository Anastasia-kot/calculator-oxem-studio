import { calculatorAPI } from './../API/api.ts';
import { InferActionsTypes } from './redux-store';
import { Dispatch } from 'react';
 
 


let initialState = {
    cost: 1000000 as number,
    initialFee: 10 as number , //percent
    term: 1 as number ,  //months
    contractSum: 0 as number ,
    monthlyPayment: 0 as number ,  
};

const mainReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {

        case 'MAIN-REDUCER/SET_COST':
            return {
                ...state,
                cost:action.cost
              }
        case 'MAIN-REDUCER/SET_INITIAL_FEE':
            return {
                ...state,
                initialFee:action.initialFee
              }
        case 'MAIN-REDUCER/SET_TERM':
            return {
                ...state,
                term:action.term
              }
        case 'MAIN-REDUCER/SET_CONTRACT_SUM':
            return {
                ...state,
                contractSum: +((state.initialFee + state.term * state.monthlyPayment).toFixed(2))
              }
        case 'MAIN-REDUCER/SET_MONTHLY_PAYMENT':
            const monthPay = +(((state.cost - state.initialFee) * ((0.035 * Math.pow((1 + 0.035), state.term)) / (Math.pow((1 + 0.035), state.term) - 1))).toFixed(2))
            return {
                ...state,
                monthlyPayment: monthPay
              }

        default:
            return state;
    }
};

type ActionsTypes = InferActionsTypes<typeof actions> 

export const actions = {
    setCost: (cost: number) => ({ type: 'MAIN-REDUCER/SET_COST', cost } as const),
    setInitialFee: (initialFee: number) => ({ type: 'MAIN-REDUCER/SET_INITIAL_FEE', initialFee } as const),
    setTerm: (term: number) => ({ type: 'MAIN-REDUCER/SET_TERM', term } as const),
    setContractSum: () => ({ type: 'MAIN-REDUCER/SET_CONTRACT_SUM'  } as const),
    setMonthlyPayment: () => ({ type: 'MAIN-REDUCER/SET_MONTHLY_PAYMENT'  } as const),
}


 



export const setCostTC = (cost: number) => {
    return (dispatch: Dispatch<ActionsTypes>) => {
        dispatch(actions.setCost(cost));
        dispatch(actions.setMonthlyPayment());
        dispatch(actions.setContractSum());
    };
};


export const setInitialFeeTC = (initialFee: number) => {
    return (dispatch: Dispatch<ActionsTypes>) => {
        dispatch(actions.setInitialFee(initialFee));
        dispatch(actions.setMonthlyPayment());
        dispatch(actions.setContractSum());
    };
};

export const setTermTC = (term: number) => {
    return (dispatch: Dispatch<ActionsTypes>) => {
        dispatch(actions.setTerm(term));
        dispatch(actions.setMonthlyPayment());
        dispatch(actions.setContractSum());
    };
};

export const setFormSubmitTC = (cost: number, initialFee: number, term: number)  => {
    return async (dispatch: Dispatch<ActionsTypes>) => {
        try {
            let response = await calculatorAPI.sendData(cost, initialFee, term);
            alert('Заявка успешно отправлена')
        } catch (err) {
            alert(`Произошла ошибка (${err.message}). Пожалуйста, попробуйте позже`)
        }
        
    }
};




export default mainReducer;












export type InitialStateType = typeof initialState;
 