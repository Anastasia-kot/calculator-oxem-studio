import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { CardsForm } from './components/CardsForm/CardsForm';
import { actions } from './redux/main-reducer.ts';

function App() {

  const dispatch = useDispatch()

  useEffect( ()=>{
    dispatch(actions.setMonthlyPayment())
    dispatch(actions.setContractSum())    
  }, [dispatch])



  return (
    <div className="App-wrapper">
    <div className="App">

        <h1 className="App-header"> 
          Рассчитайте стоимость автомобиля в&nbsp;лизинг
        </h1>

        <div className="App-main">

         
            <CardsForm  /> 
          
                  
        
                  
       
        </div>  
         
    </div>
    </div>
  );
}

export default App;
