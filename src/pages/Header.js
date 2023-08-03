import { Link, Outlet } from 'react-router-dom';
import s from './Header.module.scss';

export default function Header({ tabTitle }) {
  const tabs = [
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
      title: 'Cart',
      link: 'cart',
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
        {tabs.slice(0, 4).map((tab) => (
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
