import './App.css';
import { Button } from './components/Button/Button';
import { Card } from './components/CardsForm/Card';
import { InfoCard } from './components/InfoCard/InfoCard';

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
                  
                <div className="App-InfoCards">
                  <InfoCard name='Сумма договора лизинга' />
                  <InfoCard name='Ежемесячный платеж от' />
                </div>
                  
                  
                <Button name={'Оставить заявку'} isFetching={false} /> 
       
        </div>  
         
    </div>
  );
}

export default App;
