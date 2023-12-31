import { useEffect, useState } from 'react';
import s from './Purchasing.module.scss';
import Popup from 'reactjs-popup';
import OrderItem from './OrderItem';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import api from '../../services/api';

function PurchasingOrders() {
  const [orders, setOrders] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isSupplierChecked, setSupplierChecked] = useState(false);
  const [isProductChecked, setProductChecked] = useState(false);
  const [storageProducts, setStorageProducts] = useState([]);
  const [suppliers, setSuppliers] = useState(null);
  const [activeSupplierProducts, setActiveSupplierProducts] = useState(null);
  const [activeProduct, setActiveProduct] = useState(null);
  const [sum, setSum] = useState(0);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    let orders = (await api.get('/order/3')).data;
    setOrders(orders);

    let products = (await api.get('/product')).data;
    setStorageProducts(products);

    let suppliers = (await api.get('/supplier')).data;
    setSuppliers(suppliers);
    setLoading(false);
  };

  const onChangeSupplier = (name) => {
    if (name == null) {
      setSupplierChecked(false);
      setActiveProduct(null);
      setProductChecked(false);
      setSum(0);
    } else {
      setSupplierChecked(true);
      let supplier = suppliers.find((s) => s.name === name);
      setActiveSupplierProducts(supplier.products);
    }
  };

  const onChangeProduct = (name) => {
    setProductChecked(true);
    let product = activeSupplierProducts.find((s) => s.name === name);
    setActiveProduct(product);
  };

  const onChangeAmount = (value) => {
    setAmount(value);
    setSum(activeProduct.price * value);
  };

  const onClosePopup = () => {
    setSupplierChecked(false);
    setActiveProduct(null);
    setProductChecked(false);
    setSum(0);
  };

  const purchase = async (close) => {
    await api.post('/supplierproduct/buy', { id: activeProduct.id, amount });

    close();
  };

  return (
    <div className={s.app__content__subpage}>
      {!isLoading ? (
        <div>
          {orders.map((el, index) => (
            <li key={el.id}>
              <OrderItem
                id={el.id}
                date={el.submittedDateTime}
                name={el.customerName}
                statusId={el.orderStatusId}
                products={el.orderedProducts}
                storageProducts={storageProducts}
              />
            </li>
          ))}
          <div className={`${s.app__content__footer} ${s.app__content__cell}`}>
            <Popup
              trigger={<button className={s.create_order}>Order</button>}
              modal
              nested
              onClose={() => onClosePopup()}
            >
              {(close) => (
                <div className={s.modal}>
                  <h2 className={s.modal__header}>Order</h2>
                  <Dropdown
                    options={suppliers.map((el) => el.name)}
                    placeholder="Select supplier"
                    className={s.dropdown}
                    onChange={(obj) => onChangeSupplier(obj.value)}
                    onFocus={() => onChangeSupplier(null)}
                  />
                  {isSupplierChecked ? (
                    <Dropdown
                      options={activeSupplierProducts.map((pr) => pr.name)}
                      className={s.dropdown}
                      onChange={(obj) => onChangeProduct(obj.value)}
                    />
                  ) : (
                    <></>
                  )}
                  {isProductChecked ? (
                    <div className={s.modal__amount}>
                      <input
                        className={s.modal__amount__input}
                        type="number"
                        placeholder="Amount"
                        onChange={(e) => onChangeAmount(e.target.value)}
                      ></input>
                      <div className={s.modal__amount__sum}>{sum}$</div>
                    </div>
                  ) : (
                    <></>
                  )}
                  {!sum <= 0 ? (
                    <button
                      className={s.create_order}
                      style={{ marginTop: 30 + 'px' }}
                      onClick={() => purchase(() => close())}
                    >
                      Order
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              )}
            </Popup>
          </div>
        </div>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}

export default PurchasingOrders;
