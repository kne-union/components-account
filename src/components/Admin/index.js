import { Routes, Route } from 'react-router-dom';
import { Provider } from '../../common/context';
import InitAdminPage from './InitAdmin';
import HomePage from './HomePage';
import Tenant from './Tenant';
import User from './User';

export const InitAdmin = ({ baseUrl, ...props }) => {
  return (
    <Provider value={{ baseUrl, ...props }}>
      <InitAdminPage />
    </Provider>
  );
};

InitAdmin.defaultProps = {
  baseUrl: '/admin'
};

const Admin = ({ baseUrl, ...props }) => {
  return (
    <Provider value={{ baseUrl, ...props }}>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="tenant" element={<Tenant />} />
        <Route path="user" element={<User />} />
      </Routes>
    </Provider>
  );
};

Admin.defaultProps = {
  baseUrl: '/admin'
};

export default Admin;
