import s from './Accounting.module.scss';
import Header from '../Header';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

function Accounting() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('./orders');
  }, []);

  return (
    <div className={s.app}>
      <Header tabTitle={'Accounting'} />
      <div className={s.app__content}>
        <div className={s.app__content__navlinks}>
          <NavLink to="./orders">Orders</NavLink>
          <NavLink to="./transactions">transactions</NavLink>
        </div>
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default Accounting;
