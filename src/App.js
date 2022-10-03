import react, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { calculatorAPI } from './API/api.js';
import './App.css';
import { Button } from './components/Button/Button';
// import { Card } from './components/CardsForm/Card';
import { CardForm } from './components/CardsForm/CardForm';
import { InfoCard } from './components/InfoCard/InfoCard';
import { actions, setFormSubmitTC } from './redux/main-reducer.ts';

function App() {

  const contractSum = useSelector(state => state.mainPage.contractSum)

  const monthlyPayment = useSelector(state => state.mainPage.monthlyPayment)

  const dispatch = useDispatch()

  useEffect( ()=>{
    dispatch(actions.setMonthlyPayment())
    dispatch(actions.setContractSum())    
  }, [])


  return (
    <div className="App-wrapper">
    <div className="App">

        <h1 className="App-header"> 
          Рассчитайте стоимость автомобиля в&nbsp;лизинг
        </h1>

        <div className="App-main">

          <div className="App-cardForm">
            <CardForm  /> 
          </div>
                  
          <div className="App-infoCards-Button">
            <InfoCard className="App-infoCard" name='Сумма договора лизинга' sum={contractSum} measure ='₽'/>
            <InfoCard className="App-infoCard" name='Ежемесячный платеж от' sum={monthlyPayment} measure ='₽'/>
            <Button className="App-button" name={'Оставить заявку'} isFetching={false} /> 

          </div>
                  
       
        </div>  
         
    </div>
    </div>
  );
}

export default App;
