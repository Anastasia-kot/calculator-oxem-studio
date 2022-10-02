import react, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { Button } from './components/Button/Button';
// import { Card } from './components/CardsForm/Card';
import { CardForm } from './components/CardsForm/CardForm';
import { InfoCard } from './components/InfoCard/InfoCard';
import { actions } from './redux/main-reducer.ts';

function App() {

  const contractSum = useSelector(state => state.mainPage.contractSum)
  console.log(contractSum)

  const monthlyPayment = useSelector(state => state.mainPage.monthlyPayment)
  console.log(monthlyPayment)

  const dispatch = useDispatch()

  useEffect( ()=>{
    dispatch(actions.setMonthlyPayment())
    dispatch(actions.setContractSum())
    
  },[])


  return (
    <div className="App">
        <h1 className="App-header"> 
          Рассчитайте стоимость автомобиля в лизинг
        </h1>
        <div className="App-main">
                  {/* <Card name='Стоимость автомобиля' />
                  <Card name='Первоначальный взнос' />
                  <Card name='Срок лизинга' /> */}
                  <CardForm/> 
                  
                <div className="App-InfoCards">
                  <InfoCard name='Сумма договора лизинга' sum={contractSum} measure ='₽'/>
                  <InfoCard name='Ежемесячный платеж от' sum={monthlyPayment} measure ='₽'/>
                </div>
                  
                  
                <Button name={'Оставить заявку'} isFetching={false} /> 
       
        </div>  
         
    </div>
  );
}

export default App;
