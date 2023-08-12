// import './Purchasing.scss';
import Header from '../Header';
import { useEffect, useState } from 'react';
import s from './Purchasing.module.scss';
import 'react-dropdown/style.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function Purchasing() {
  const [activeTab, setActiveTab] = useState(0);

  const navigate = useNavigate();
  useEffect(() => {
    navigate('./orders');
  }, []);

  return (
    <div className={s.app}>
      <Header tabTitle={'Purchasing'} />
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
        </div>
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default Purchasing;
