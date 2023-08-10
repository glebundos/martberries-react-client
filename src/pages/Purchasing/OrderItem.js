import React, { useEffect, useState } from 'react';
import s from './Purchasing.module.scss';

function OrderItem({ id, date, name, statusId, products, storageProducts }) {
  const [isDetails, setIsDetails] = useState(false);
  const [_statusId, _setStatusId] = useState(statusId);

  let status;
  let isAllEnough = false;

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

  const canBeOrdered = (id, amount) => {
    let productOnStorage = storageProducts.find((product) => product.id === id);
    if (productOnStorage == null) {
      isAllEnough = false;
      return false;
    } else if (productOnStorage.amount >= amount) {
      isAllEnough = true;
      return true;
    } else {
      isAllEnough = false;
      return false;
    }
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
                <div
                  className={s.prop}
                  style={
                    !canBeOrdered(product.id, product.amount)
                      ? { color: 'red' }
                      : { color: 'green' }
                  }
                >
                  {canBeOrdered(product.id, product.amount)
                    ? 'Can be ordered'
                    : 'Not enough'}
                </div>
              </div>
            ))}
          </div>
          <div className={s.order_info__details__submittedMoney}></div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default OrderItem;
