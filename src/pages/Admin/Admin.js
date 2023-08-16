import s from './Admin.module.scss';
import Header from '../Header';
import { useEffect, useState } from 'react';
import OrderItem from './OrderItem';
import api from '../../services/api';

function Admin() {
  const [orders, setOrders] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    let { data } = await api.get('/order');
    setOrders(data);
    setLoading(false);
  };

  return (
    <div className={s.app}>
      <Header tabTitle={'Admin'} />
      <div className={s.app__content}>
        <h2>Orders</h2>
        <div className={s.app__content__header}>
          <div className={`${s.app__content__cell} ${s.id}`}>Id</div>
          <div className={s.app__content__cell}>Customer</div>
          <div className={s.app__content__cell}>Date</div>
          <div className={s.app__content__cell}>Phone</div>
          <div className={s.app__content__cell}>Status</div>
        </div>
        {!isLoading ? (
          orders.map((el, index) => (
            <li key={el.id}>
              <OrderItem
                id={el.id}
                date={el.submittedDateTime}
                name={el.customerName}
                phone={el.customerPhoneNumber}
                info={el.customerAdditionalInfo}
                statusId={el.orderStatusId}
                products={el.orderedProducts}
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

export default Admin;
