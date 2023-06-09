import React from 'react';
import { Link } from 'react-router-dom';
import ContentLoader from 'react-content-loader';

import Card from '../components/Card';
import styles from '../components/Card/Card.module.scss';

function Orders() {
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        // const { data } = await axios.get("https://6436b5c23e4d2b4a12d99c95.mockapi.io/orders");
        // setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));

        const data = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')) : [];
        setOrders(data);

        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        await delay(500);
        setIsLoading(false);

        // setIsLoading(false);
      } catch (error) {
        alert('Ошибка при запросе заказов');
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className='content p-40'>
      <div className='d-flex align-center justify-between mb-40'>
        <h1>Мои заказы</h1>
      </div>

      {isLoading ? (
        <div className='d-flex flex-wrap'>
          {[...Array(4)].map((_, i) => {
            return (
              <div key={i} className={styles.card}>
                <ContentLoader
                  speed={2}
                  width={155}
                  height={250}
                  viewBox='0 0 155 265'
                  backgroundColor='#f3f3f3'
                  foregroundColor='#ecebeb'
                >
                  <rect x='1' y='0' rx='10' ry='10' width='155' height='155' />
                  <rect x='0' y='167' rx='5' ry='5' width='155' height='15' />
                  <rect x='0' y='187' rx='5' ry='5' width='100' height='15' />
                  <rect x='1' y='234' rx='5' ry='5' width='80' height='25' />
                  <rect x='124' y='230' rx='10' ry='10' width='32' height='32' />
                </ContentLoader>
              </div>
            );
          })}
        </div>
      ) : orders.length === 0 ? (
        <div className='d-flex justify-center flex-wrap '>
          <div className={'d-flex justify-center flex-column align-center'}>
            <img src='./img/empty-orders.svg' alt='s' width={70} height={70} />

            <h2>У вас нет заказов</h2>
            <div className='opacity-6 '>
              <p>Оформите хотя бы один заказ.</p>
            </div>
            <Link to='/'>
              <button className='greenButton'>
                <img src='img/arrow.svg' alt='Arrow' />
                Вернутся назад
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className='d-flex flex-wrap flex-column'>
          {orders.map((arg, i) => (
            <div key={i}>
              <h2 className='mt-10 d-flex justify-between pl-10 pr-10'>Заказ #{i + 1}</h2>{' '}
              <div className='d-flex flex-wrap'>
                {arg.map((item, b) => (
                  <Card key={b + i} loading={isLoading} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
