import { wait } from '@testing-library/user-event/dist/utils';
import React, { useState } from 'react';
import api from '../../services/api';
import s from './Admin.module.scss';

function OrderItem({ id, date, name, phone, info, statusId, products }) {
  const [isDetails, setIsDetails] = useState(false);
  const [_statusId, _setStatusId] = useState(statusId);
  const [isDeleted, setIsDeleted] = useState(false);

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

  const confirmOrder = async () => {
    await api.put('/order', { id, statusId: 1 });
    _setStatusId(1);
  };

  const getIsApproved = () => {
    if (_statusId === 0) return false;
    return true;
  };

  const rejectOrder = async () => {
    await api.delete('/order', { data: { id } });
    setIsDeleted(true);
  };

  return (
    <div
      className={isDeleted ? s.deleted : s.order_info}
      onMouseEnter={() => setIsDetails(true)}
      onMouseLeave={() => setIsDetails(false)}
      style={isDetails ? { height: '250px' } : { height: '50px' }}
    >
      <div
        className={`${s.order_info__header} ${
          statusId === 5 ? s.delivered : ''
        }`}
      >
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
          <div className={s.order_info__details__buttons}>
            <button
              className={`${s.order_button} ${s.confirm} ${
                getIsApproved() ? s.disabled : ''
              }`}
              onClick={() => confirmOrder()}
            >
              Confirm order
            </button>
            <button
              className={`${s.order_button} ${s.reject}`}
              onClick={() => rejectOrder()}
            >
              Reject order
            </button>
          </div>
          <div className={s.order_info__details__info}>{info}</div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default OrderItem;
