import s from './Accounting.module.scss';
import Header from '../Header';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import api from '../../services/api';

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

  const getExcel = async () => {
    let report = await api.get('/moneytransfer/report');
    let data = report.data;
    let fileName = 'report';
    let fileType = 'text/csv';
    const blob = new Blob([data], { type: fileType });
    // Create an anchor element and dispatch a click event on it
    // to trigger a download
    const a = document.createElement('a');
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
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
          <a onClick={() => getExcel()}>Excel</a>
        </div>
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default Accounting;
