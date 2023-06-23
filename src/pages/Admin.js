import './App.scss';
import { Header } from './Store.js';

function Admin() {
  return (
    <div className="app">
      <Header tabTitle={'Admin'} />
      <div className="app__content">
        <h1>Admin</h1>
      </div>
    </div>
  );
}

export default Admin;
