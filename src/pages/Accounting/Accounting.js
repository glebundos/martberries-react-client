import s from './Accounting.module.scss';
import Header from '../Header';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function Accounting() {
  const [activeTab, setActiveTab] = useState(0);

  const navigate = useNavigate();
  useEffect(() => {
    navigate('./orders');
  }, []);

  let requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token'),
    },
  };

  return (
    <div className={s.app}>
      <Header tabTitle={'Accounting'} />
      <div className={s.app__content}>
        <div className={s.app__content__navlinks}>
          <NavLink
            to="./orders"
            style={{ color: activeTab === 0 ? 'gray' : 'white' }}
            onClick={() => setActiveTab(0)}
          >
            Orders
          </NavLink>
          <NavLink
            to="./transactions"
            style={{ color: activeTab === 1 ? 'gray' : 'white' }}
            onClick={() => setActiveTab(1)}
          >
            Transactions
          </NavLink>
          <a href="https://localhost:7134/api/MoneyTransfer/report">Excel</a>
        </div>
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default Accounting;
