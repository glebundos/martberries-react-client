// import './Storage.scss';
import Header from '../Header';
import { useEffect, useState } from 'react';
import s from './Storage.module.scss';
import OrderItem from './OrderItem';

function Storage() {
  const [orders, setOrders] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [storageProducts, setStorageProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    let requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    };
    let res = await fetch('https://localhost:7134/api/Order/3', requestOptions);
    let response = await res.json();
    setOrders(response);
    res = await fetch('https://localhost:7134/api/Product', requestOptions);
    response = await res.json();
    setStorageProducts(response);
    setLoading(false);
  };

  return (
    <div className={s.app}>
      <Header tabTitle={'Storage'} />
      <div className={s.app__content}>
        {!isLoading ? (
          orders.map((el, index) => (
            <li key={el.id}>
              <OrderItem
                id={el.id}
                date={el.submittedDateTime}
                name={el.customerName}
                statusId={el.orderStatusId}
                products={el.orderedProducts}
                storageProducts={storageProducts}
              />
            </li>
          ))
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </div>
  );
}

export default Storage;
