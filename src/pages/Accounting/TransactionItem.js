import React, { useState } from 'react';
import s from './Accounting.module.scss';

function TransactionItem({ id, type, date, amount }) {
  return (
    <div className={s.order_info__header}>
      <div className={`${s.cell} ${s.id}`}>{id}</div>
      <div className={s.cell}>{type === 1 ? 'Income' : 'Expense'}</div>
      <div className={s.cell}>{date.slice(0, 10)}</div>
      <div className={s.cell} style={{ color: type === 1 ? 'green' : 'red' }}>
        {amount}
      </div>
    </div>
  );
}

export default TransactionItem;
