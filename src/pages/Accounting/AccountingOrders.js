import s from './Accounting.module.scss';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import OrderItem from './OrderItem';

function AccountingOrders() {
  const [orders, setOrders] = useState(null);
  const [isLoading, setLoading] = useState(true);

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
    let res = await fetch('https://localhost:7134/api/Order/1', requestOptions);
    let response = await res.json();
    let ordersFetched = response;

    let res2 = await fetch(
      'https://localhost:7134/api/Order/2',
      requestOptions
    );
    let response2 = await res2.json();
    ordersFetched = [...response, ...response2];
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
