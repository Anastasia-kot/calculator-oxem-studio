import { InferActionsTypes } from './redux-store';
import { Dispatch } from 'react';
//  import { usersAPI } from "../API/api.ts";
 
 


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




// export const getUsersTC = (count: number, currentPage: number) => {
//     return async (dispatch: Dispatch<ActionsTypes>) => {
//         dispatch(actions.setIsFetchingStatus(true));
//         let response = await usersAPI.getUsersWithAPI(count, currentPage)
//         // if (response?.items) {
//             console.log(response)
//              dispatch(actions.setUsers(response?.items as Array<User>));
         
//             dispatch(actions.setTotalUsersCount(response?.totalCount));
//         // }
//         dispatch(actions.setIsFetchingStatus(false));
//     };
// };

// export const setNewCurrentPage = (newCurrentPage: number, count: number ) => {
//     return async (dispatch: Dispatch<ActionsTypes>) => {
//         dispatch(actions.setCurrentPage(newCurrentPage));
//         dispatch(actions.setIsFetchingStatus(true));
//         let response = await usersAPI.getUsersWithAPI(count, newCurrentPage);
//         dispatch(actions.setUsers(response?.items as Array<User>));
//         dispatch(actions.setIsFetchingStatus(false));
//     }
// };




export default mainReducer;












export type InitialStateType = typeof initialState;
 