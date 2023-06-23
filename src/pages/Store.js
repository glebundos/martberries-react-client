import './App.scss';
import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

function Store() {
  const [products, setProducts] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    let res = await fetch('https://localhost:7134/api/product');
    let response = await res.json();
    setProducts(response);
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    let id;
    let amount;

    for (var p of formData) {
      id = p[0];
      amount = p[1];
    }

    let product = products.find((p) => p.id === id);
    if (product.amount < amount) {
      alert('У нас столько нету товара дохуя');
    } else {
      setCart([...cart, { id, amount }]);
      console.log(`Added ${id} - ${amount}`);
      console.log(cart);
    }
  };

  return (
    <div className="app">
      <Header tabTitle={'Store'} />
      <div className="app__content">
        <div className="app__content__header">
          <div className="app__content__cell">Name</div>
          <div className="app__content__cell">Price</div>
          <div className="app__content__cell">Stock</div>
          <div className="app__content__cell">Order amount</div>
        </div>
        {!isLoading ? (
          products.map((product) => (
            <div key={product.id} className="app__content__product">
              <div className="app__content__product_name app__content__cell">
                {product.name}
              </div>
              <div className="app__content__product_price app__content__cell">
                {product.price}$
              </div>
              <div className="app__content__product_amount app__content__cell">
                {product.amount}
              </div>
              <form
                method="post"
                onSubmit={handleSubmit}
                className="app__content__product__form app__content__cell"
              >
                <input name={product.id}></input>
                <button
                  type="submit"
                  className="app__content__product__form__button"
                >
                  Sumbit
                </button>
              </form>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
}

export function Header({ tabTitle }) {
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
    <header className="app__header">
      <div className="app__header__tabs">
        {tabs.slice(0, 3).map((tab) => (
          <Link
            to={'/' + tab.title.toLowerCase()}
            key={tab.title}
            className={`app__header__tab ${
              tab.title === tabTitle ? 'active' : ''
            }`}
          >
            {tab.title}
          </Link>
        ))}
      </div>
      <div className="app__header__title">
        MartBerries <Outlet />
      </div>
      <div className="app__header__tabs">
        {tabs.slice(3).map((tab) => (
          <Link
            to={'/' + tab.title.toLowerCase()}
            key={tab.title}
            className={`app__header__tab ${
              tab.title === tabTitle ? 'active' : ''
            }`}
          >
            {tab.title}
          </Link>
        ))}
      </div>
    </header>
  );
}

export default Store;
