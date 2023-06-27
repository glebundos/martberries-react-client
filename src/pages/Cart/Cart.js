import { useContext, useState } from 'react';
import './Cart.scss';
import Header from '../Header';
import { CartContext } from '../../index.js';

function Cart() {
  const { cart, setCart } = useContext(CartContext);
  const [amount] = useState();

  const handleRemove = (id) => {
    setCart(cart.filter((item) => item.product.id !== id));
  };

  const handleUpdate = (event) => {
    const value = event.target.value;
    const indexCarted = event.target.name;
    console.log(value, indexCarted);
    let newCart = cart.map((item, index) => {
      console.log(index, indexCarted);
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

  console.log(cart);
  const createHandler = () => {};

  return (
    <div className="app">
      <Header tabTitle={'Cart'} />
      <div className="app__content">
        <div className="app__content__header">
          <div className="app__content__cell">Name</div>
          <div className="app__content__cell">Price</div>
          <div className="app__content__cell">Stock</div>
          <div className="app__content__cell">Ordered</div>
        </div>
        {cart.map((pr, index) => (
          <div key={pr.product.id + index} className="app__content__product">
            <div className="app__content__product_name app__content__cell">
              {pr.product.name}
            </div>
            <div className="app__content__product_price app__content__cell">
              {pr.product.price}$
            </div>
            <div className="app__content__product_amount app__content__cell">
              {pr.product.amount}
            </div>

            <div className="app__content__product__form app__content__cell">
              <input
                name={index}
                defaultValue={pr.amount}
                value={amount}
                onChange={handleUpdate}
              ></input>
              <button
                type="button"
                className="app__content__product__form__button_remove"
                onClick={() => handleRemove(pr.product.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <div className="app__content__footer app__content__cell">
          <button className="create-order" onClick={createHandler}>
            Create order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
