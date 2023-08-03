import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.scss';
import Store from './pages/Store/Store';
import Admin from './pages/Admin/Admin';
import Accounting from './pages/Accounting/Accounting';
import AccountingOrders from './pages/Accounting/AccountingOrders';
import Storage from './pages/Storage/Storage';
import Purchasing from './pages/Purchasing/Purchasing';
import reportWebVitals from './reportWebVitals';
import Delivery from './pages/Delivery/Delivery';
import Cart from './pages/Cart/Cart';
import { createContext } from 'react';
import AccountingTransactions from './pages/Accounting/AccountingTransactions';

export const CartContext = createContext({
  cart: [],
  setCart: (cart) => {},
});

export default function App() {
  const [cart, setCart] = useState([]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Store />} />
            <Route path="admin" element={<Admin />} />
            <Route path="store" element={<Store />} />
            <Route path="accounting/" element={<Accounting />}>
              <Route path="orders" element={<AccountingOrders />} />
              <Route path="transactions" element={<AccountingTransactions />} />
            </Route>
            <Route path="storage" element={<Storage />} />
            <Route path="purchasing" element={<Purchasing />} />
            <Route path="delivery" element={<Delivery />} />
            <Route path="cart" element={<Cart />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartContext.Provider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
