import './App.css';
import { Button } from './components/Button/Button';
import { Card } from './components/CardsForm/Card';

function App() {
  return (
    <div className="App">
        <h1 className="App-header"> 
          Рассчитайте стоимость автомобиля в лизинг
        </h1>
        <div className="App-main">
           <Card name='Стоимость автомобиля' />
           <Card name='Первоначальный взнос' />
           <Card name='Срок лизинга' />

           <Card name='Сумма договора лизинга' />
           <Card name='Ежемесячный платеж от' />
          
        <Button name={'Оставить заявку'} isFetching={false} /> 
       
        </div>  
         
    </div>
  );
}

export default App;
