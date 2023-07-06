import { Link, Outlet } from 'react-router-dom';
import s from './Header.module.scss';

export default function Header({ tabTitle }) {
  const tabs = [
    {
      title: 'Store',
    },
    {
      title: 'Admin',
    },
    {
      title: 'Accounting',
    },
    {
      title: 'Cart',
    },
    {
      title: 'Storage',
    },
    {
      title: 'Purchasing',
    },
    {
      title: 'Delivery',
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
      <div className={s.app__header__title}>
        MartBerries <Outlet />
      </div>
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
