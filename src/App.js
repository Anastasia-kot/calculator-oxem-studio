import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { Button } from './components/Button/Button';
import { CardsForm } from './components/CardsForm/CardsForm';
import { InfoCard } from './components/InfoCard/InfoCard';
import { actions, setFormSubmitTC } from './redux/main-reducer.ts';

function App() {

  const contractSum = useSelector(state => state.mainPage.contractSum)
  const monthlyPayment = useSelector(state => state.mainPage.monthlyPayment)
  const isFetching = useSelector(state => state.mainPage.isFetching)
  const cost = useSelector(state => state.mainPage.cost)
  const initialFee = useSelector(state => state.mainPage.initialFee)
  const term = useSelector(state => state.mainPage.term)

  const dispatch = useDispatch()

  useEffect( ()=>{
    dispatch(actions.setMonthlyPayment())
    dispatch(actions.setContractSum())    
  }, [dispatch])

  const onClickFunctionForButton = () => {
    dispatch(setFormSubmitTC(cost, initialFee, term))
  }

  return (
    <div className="App-wrapper">
    <div className="App">

        <h1 className="App-header"> 
          Рассчитайте стоимость автомобиля в&nbsp;лизинг
        </h1>

        <div className="App-main">

          <div className="App-cardForm">
            <CardsForm  /> 
          </div>
                  
          <div className="App-infoCards-Button">
            <InfoCard className="App-infoCard" name='Сумма договора лизинга' sum={contractSum} measure ='₽'/>
            <InfoCard className="App-infoCard" name='Ежемесячный платеж от' sum={monthlyPayment} measure ='₽'/>
            <Button className="App-button" name={'Оставить заявку'} isFetching={isFetching} onClickFunc={onClickFunctionForButton}/> 

          </div>
                  
       
        </div>  
         
    </div>
    </div>
  );
}

export default App;
