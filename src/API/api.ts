import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://eoj3r7f3r4ef6v4.m.pipedream.net',
    // withCredentials: true,
    headers: {  
        'Content-Type': 'application/json' 
    }
})

 type ResponseType = {
    data: {
        data: any
        fieldsErrors: Array<any>,
        messages: Array<any>,
        resultCode:  ResultCodeEnum,
    },
    status: number
    statusText: string
}

export enum ResultCodeEnum {
    success = 0,
    error = 1,
}
export enum ResponseStatusEnum {
    success = 200,
    error = 400,
}


export const calculatorAPI = {



   sendData: async (cost: number, initialFee: number, term: number) => {  // так как сумма договора и ежемесячный платеж - это вычисляемые данные
 
        const response = await instance
            .post(``,  { cost: cost, initialFee: initialFee, term: term }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        console.log('response', response)
        return response;
    }
}

