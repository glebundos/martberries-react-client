import { Link, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import s from './Header.module.scss';
import { CartContext } from '../index.js';

export default function Header({ tabTitle }) {
  const { cart, setCart } = useContext(CartContext);

  const tabs = [
    {
      title: 'Cart',
      link: 'cart',
    },
    {
      title: 'Store',
      link: 'store',
    },
    {
      title: 'Admin',
      link: 'admin',
    },
    {
      title: 'Accounting',
      link: 'accounting/orders',
    },
    {
      title: 'Storage',
      link: 'storage',
    },
    {
      title: 'Purchasing',
      link: 'purchasing',
    },
    {
      title: 'Delivery',
      link: 'delivery',
    },
  ];

  return (
    <header className={s.app__header}>
      <div className={s.app__header__tabs}>
        <Link
          to={'/' + tabs[0].title.toLowerCase()}
          key={tabs[0].title}
          className={`
					${s.app__header__tab}
					 ${tabs[0].title === tabTitle ? s.active : ''} 
					${cart.length < 1 ? s.invisible : ''}`}
        >
          {tabs[0].title}
        </Link>
        {tabs.slice(1, 4).map((tab) => (
          <Link
            to={'/' + tab.title.toLowerCase()}
            key={tab.title}
            className={`${s.app__header__tab} ${
              tab.title === tabTitle ? s.active : ''
            }`}
          >
            {tab.title}
          </Link>
        ))}
      </div>
      <div className={s.app__header__title}>MartBerries</div>
      <div className={s.app__header__tabs}>
        {tabs.slice(4).map((tab) => (
          <Link
            to={'/' + tab.title.toLowerCase()}
            key={tab.title}
            className={`${s.app__header__tab} ${
              tab.title === tabTitle ? s.active : ''
            }`}
          >
            {tab.title}
          </Link>
        ))}
      </div>
    </header>
  );
}
