import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://eoj3r7f3r4ef6v4.m.pipedream.net',
    // withCredentials: true,
    headers: {  
        'Content-Type': 'application/json' 
    }
})

export const calculatorAPI = {

   sendData: async (cost, initialFee, term) => {  // так как сумма договора и ежемесячный платеж - это вычисляемые данные
 
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

