import s from './Accounting.module.scss';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import OrderItem from './OrderItem';
import api from '../../services/api';

function AccountingOrders() {
  const [orders, setOrders] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    let ordersFetched = [
      ...(await api.get('/Order/1')).data,
      ...(await api.get('/Order/2')).data,
    ];
    setOrders(ordersFetched);
    setLoading(false);
  };

  return (
    <div className={s.app__content__subpage}>
      <div className={s.app__content__subpage__content}>
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
                submittedMoney={el.submittedMoney}
                requestedMoney={el.requestedMoney}
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

export default AccountingOrders;
