// import './Storage.scss';
import Header from '../Header';
import { useEffect, useState } from 'react';
import s from './Storage.module.scss';
import OrderItem from './OrderItem';
import api from '../../services/api';

function Storage() {
  const [orders, setOrders] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [storageProducts, setStorageProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    let { data } = await api.get('/order/3');
    setOrders(data);
    let storageProducts = (await api.get('/product')).data;
    setStorageProducts(storageProducts);
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
