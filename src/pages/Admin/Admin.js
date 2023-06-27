import './Admin.scss';
import Header from '../Header';

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
