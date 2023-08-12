import React, { useState } from 'react';
import s from './Purchasing.module.scss';

function TransactionItem({ id, type, date, amount, name }) {
  return (
    <div className={s.order_info__header}>
      <div className={`${s.cell} ${s.id}`}>{id}</div>
      <div className={s.cell}>{type === 1 ? 'Bought' : 'Write-off'}</div>
      <div className={s.cell}>{date.slice(0, 10)}</div>
      <div className={s.cell} style={{ color: type === 1 ? 'green' : 'red' }}>
        {amount}
      </div>
      <div className={s.cell}>{name}</div>
    </div>
  );
}

export default TransactionItem;
