import s from './Accounting.module.scss';
import { useEffect, useState } from 'react';
import TransactionItem from './TransactionItem';
import api from '../../services/api';

function AccountingTransactions() {
  const [isLoading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    let { data } = await api.get('/moneytransfer');
    setTransactions(data);
    setLoading(false);
  };

  return (
    <>
      <div className={s.app__content__subpage}>
        <div className={s.app__content__header}>
          <div className={`${s.app__content__cell} ${s.id}`}>Id</div>
          <div className={s.app__content__cell}>Type</div>
          <div className={s.app__content__cell}>Date</div>
          <div className={s.app__content__cell}>Amount</div>
        </div>
      </div>
      {!isLoading ? (
        <>
          {transactions.map((el) => (
            <li key={el.id}>
              <TransactionItem
                id={el.id}
                type={el.transactionTypeId}
                date={el.transferDateTime}
                amount={el.amount}
              ></TransactionItem>
            </li>
          ))}
        </>
      ) : (
        <h2>Loading...</h2>
      )}
    </>
  );
}

export default AccountingTransactions;
