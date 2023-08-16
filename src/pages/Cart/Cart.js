import s from './Cart.module.scss';
import { useContext, useState } from 'react';
import Popup from 'reactjs-popup';
import Header from '../Header';
import { CartContext } from '../../index.js';
import api from '../../services/api';

function Cart() {
  const { cart, setCart } = useContext(CartContext);
  const [amount] = useState();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    info: '',
  });

  const handleRemove = (id) => {
    setCart(cart.filter((item) => item.product.id !== id));
  };

  const handleUpdate = (event) => {
    const value = event.target.value;
    const indexCarted = event.target.name;
    let newCart = cart.map((item, index) => {
      if (index == indexCarted) {
        return {
          product: item.product,
          amount: value,
        };
      }

      return item;
    });

    setCart(newCart);
  };

  const formUpdateHandler = (value, field) => {
    setForm({ ...form, [field]: value });
  };

  const submitOrderHandler = async (e) => {
    let order = {
      customerName: form.name,
      customerPhoneNumber: form.phone,
      customerAdditionalInfo: form.info,
      orderedProducts: [],
    };

    for (let c of cart) {
      order.orderedProducts.push({
        productId: c.product.id,
        amount: c.amount,
      });
    }

    // const response = await fetch('https://localhost:7134/api/order', {
    //   method: 'POST',
    //   body: JSON.stringify(order),
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: localStorage.getItem('token'),
    //   },
    // });

    await api.post('/order', order);
    setCart([]);
  };

  return (
    <div className={s.app}>
      <Header tabTitle={'Cart'} />
      <div className={s.app__content}>
        <div className={s.app__content__header}>
          <div className={s.app__content__cell}>Name</div>
          <div className={s.app__content__cell}>Price</div>
          <div className={s.app__content__cell}>Stock</div>
          <div className={s.app__content__cell}>Ordered</div>
        </div>
        {cart.map((pr, index) => (
          <div key={pr.product.id + index} className={s.app__content__product}>
            <div
              className={`${s.app__content__product_name} ${s.app__content__cell}`}
            >
              {pr.product.name}
            </div>
            <div
              className={`${s.app__content__product_price} ${s.app__content__cell}`}
            >
              {pr.product.price}$
            </div>
            <div
              className={`${s.app__content__product_amount} ${s.app__content__cell}`}
            >
              {pr.product.amount}
            </div>

            <div
              className={`${s.app__content__product__form} ${s.app__content__cell}`}
            >
              <input
                type="number"
                name={index}
                defaultValue={pr.amount}
                value={amount}
                onChange={handleUpdate}
              ></input>
              <button
                type="button"
                className={s.app__content__product__form__button_remove}
                onClick={() => handleRemove(pr.product.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <div className={`${s.app__content__footer} ${s.app__content__cell}`}>
          <Popup
            trigger={<button className={s.create_order}>Create order</button>}
            modal
            nested
          >
            {(close) => (
              <div className={s.modal}>
                <h2 className={s.modal__header}>Personal data</h2>
                <input
                  className={s.modal__input}
                  placeholder="Your Name"
                  name="name"
                  onChange={(event) =>
                    formUpdateHandler(event.target.value, event.target.name)
                  }
                ></input>
                <input
                  className={s.modal__input}
                  placeholder="Your Phone"
                  name="phone"
                  onChange={(event) =>
                    formUpdateHandler(event.target.value, event.target.name)
                  }
                ></input>
                <textarea
                  className={`${s.modal__input} ${s.additional}`}
                  type="additional"
                  placeholder="Additional Info"
                  name="info"
                  onChange={(event) =>
                    formUpdateHandler(event.target.value, event.target.name)
                  }
                ></textarea>
                <div>
                  <button
                    className={`${s.create_order} ${s.submit}`}
                    onClick={() => {
                      submitOrderHandler();
                      close();
                    }}
                  >
                    Submit order
                  </button>
                </div>
              </div>
            )}
          </Popup>
        </div>
      </div>
    </div>
  );
}

export default Cart;
