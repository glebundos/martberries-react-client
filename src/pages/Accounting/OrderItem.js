import { wait } from '@testing-library/user-event/dist/utils';
import React, { useState } from 'react';
import api from '../../services/api';
import s from './Accounting.module.scss';

function OrderItem({
  id,
  date,
  name,
  phone,
  info,
  statusId,
  products,
  submittedMoney,
  requestedMoney,
}) {
  const [isDetails, setIsDetails] = useState(false);
  const [_statusId, _setStatusId] = useState(statusId);
  const [_requestedMoney, _setRequestedMoney] = useState(requestedMoney);

  let status;

  switch (_statusId) {
    case 0:
      status = 'Waiting confirmation';
      break;
    case 1:
      status = 'Waiting bill';
      break;
    case 2:
      status = 'Waiting payment';
      break;
    case 3:
      status = 'Waiting storage confirmation';
      break;
    case 4:
      status = 'In Delivery';
      break;
    case 5:
      status = 'Delivered';
      break;
    default:
      status = 'UNDEFINED';
      break;
  }

  const handleUpdate = (event) => {
    const value = event.target.value;
    _setRequestedMoney(value);
  };

  const handleRequest = async (e) => {
    await api.put('/order/requestedMoney', {
      id,
      requestedMoney: _requestedMoney,
    });

    await api.put('/order', { id, statusId: 2 });
    _setStatusId(2);
  };

  const handleConfirm = async () => {
    await api.put('/order', {
      id,
      statusId: 3,
    });

    _setStatusId(3);
  };

  const getIsApproved = () => {
    if (requestedMoney === 0) return true;
    return false;
  };

  return (
    <div
      className={s.order_info}
      onMouseEnter={() => setIsDetails(true)}
      onMouseLeave={() => setIsDetails(false)}
      style={isDetails ? { height: '250px' } : { height: '50px' }}
    >
      <div className={s.order_info__header}>
        <div className={`${s.cell} ${s.id}`}>{id}</div>
        <div className={s.cell}>{name}</div>
        <div className={s.cell}>{date.slice(0, 10)}</div>
        <div className={s.cell}>{phone}</div>
        <div className={s.cell}>{status}</div>
      </div>

      {isDetails ? (
        <div className={s.order_info__details}>
          <div className={s.order_info__details__products}>
            {products.map((product) => (
              <div className={s.order_info__details__product}>
                <div className={`${s.cell} ${s.id}`}>{product.id}</div>
                <div className={`${s.cell} ${s.prop}`}>{product.name}</div>
                <div className={`${s.cell} ${s.prop}`}>{product.price}$</div>
                <div className={`${s.cell} ${s.prop}`}>
                  {product.amount} Items
                </div>
              </div>
            ))}
          </div>
          <div className={s.order_info__details__submittedMoney}>
            Sumbitted money: {submittedMoney}
          </div>
          <div className={s.order_info__details__inputs}>
            <div className={s.order_info__details__inputs__request}>
              <input
                type="number"
                name="request"
                defaultValue={requestedMoney}
                onChange={handleUpdate}
              ></input>
              <button
                type="button"
                className={s.order_info__details__inputs__request__button}
                onClick={() => handleRequest()}
              >
                Request money
              </button>
            </div>
            <button
              type="button"
              className={`${s.app__content__product__form__button_add} ${
                getIsApproved() ? s.disabled : ''
              }`}
              onClick={() => handleConfirm()}
            >
              Confirm order
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default OrderItem;
