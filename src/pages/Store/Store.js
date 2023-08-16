import s from './Store.module.scss';
import { useContext, useEffect, useState } from 'react';
import Header from '../Header';
import Popup from 'reactjs-popup';
import { CartContext } from '../../index.js';
import api from '../../services/api';

function Store() {
  const [products, setProducts] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [orderId, setOrderId] = useState(null);
  const [order, setOrder] = useState(null);
  const { cart, setCart } = useContext(CartContext);
  const [submittedMoney, setSubmittedMoney] = useState(
    order ? order.submittedMoney : 0
  );
  const [submittedMoneyShow, setSubmittedMoneyShow] = useState(submittedMoney);

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
    //let res = await fetch('https://localhost:7134/api/product', requestOptions);
    let { data } = await api.get('/product');
    setProducts(data);
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
    setCart([...cart, { product, amount }]);
  };

  const idUpdateHandler = (id) => {
    setOrderId(id);
  };

  const searchOrderHandler = () => {
    fetchOrderById();
  };

  const fetchOrderById = async () => {
    let requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    };
    let res = await fetch(
      `https://localhost:7134/api/Order/${orderId}`,
      requestOptions
    );
    let response = await res.json();
    setOrder(response);
    setSubmittedMoney(response.submittedMoney);
    setSubmittedMoneyShow(response.submittedMoney);
  };

  const handleUpdate = (event) => {
    let value = event.target.value;
    setSubmittedMoney(value);
  };

  const handleSubmitMoney = async () => {
    let requestOptions = {
      method: 'PUT',
      body: JSON.stringify({ id: orderId, submittedMoney }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    };
    const response = await fetch(
      'https://localhost:7134/api/order/submittedMoney',
      requestOptions
    );

    setSubmittedMoneyShow(
      parseInt(submittedMoneyShow) + parseInt(submittedMoney)
    );
  };

  return (
    <div className={s.app}>
      <Header tabTitle={'Store'} />
      <div className={s.app__content}>
        <div className={s.app__content__header}>
          <div className={s.app__content__cell}>Name</div>
          <div className={s.app__content__cell}>Price</div>
          <div className={s.app__content__cell}>Stock</div>
          <div className={s.app__content__cell}>Order amount</div>
        </div>
        {!isLoading ? (
          products.map((product) => (
            <div key={product.id} className={s.app__content__product}>
              <div
                className={`${s.app__content__product_name} ${s.app__content__cell}`}
              >
                {product.name}
              </div>
              <div
                className={`${s.app__content__product_price} ${s.app__content__cell}`}
              >
                {product.price}$
              </div>
              <div
                className={`${s.app__content__product_amount} ${s.app__content__cell}`}
              >
                {product.amount}
              </div>
              <form
                method="post"
                onSubmit={handleSubmit}
                className={`${s.app__content__product__form} ${s.app__content__cell}`}
              >
                <input type="number" name={product.id}></input>
                <button
                  type="submit"
                  className={s.app__content__product__form__button_add}
                >
                  Add to cart
                </button>
              </form>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
        <div className={`${s.app__content__footer} ${s.app__content__cell}`}>
          <Popup
            trigger={<button className={s.create_order}>Tracking</button>}
            modal
            nested
          >
            {(close) => (
              <div
                className={s.modal}
                style={{
                  height: `${order === null ? '200px' : '500px'}`,
                }}
              >
                <h2 className={s.modal__header}>Order info</h2>
                <input
                  className={s.modal__input}
                  name="id"
                  defaultValue={orderId}
                  placeholder="Order id"
                  onChange={(event) => idUpdateHandler(event.target.value)}
                ></input>

                <div>
                  <button
                    className={`${s.create_order} ${s.submit}`}
                    onClick={() => {
                      searchOrderHandler();
                    }}
                  >
                    Search order
                  </button>
                </div>
                {order !== null ? (
                  <div className={s.modal__order_info}>
                    <div className={s.modal__order_info__name}>
                      {order.customerName}
                    </div>
                    <div>{order.submittedDateTime.slice(0, 10)}</div>
                    <div>{order.customerPhoneNumber}</div>
                    <div className={s.add_info}>
                      {order.customerAdditionalInfo}
                    </div>
                    <div>Sumbitted money: {submittedMoneyShow}$</div>
                    <div>Requested money: {order.requestedMoney}$</div>
                    <div className={s.modal__order__input}>
                      <input
                        type="number"
                        name="submit"
                        defaultValue={0}
                        onChange={handleUpdate}
                      ></input>
                      <button
                        type="button"
                        className={s.modal__order__input__submit}
                        onClick={() => handleSubmitMoney()}
                      >
                        Submit money
                      </button>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            )}
          </Popup>
        </div>
      </div>
    </div>
  );
}

export default Store;
