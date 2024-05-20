import { createWithRemoteLoader } from '@kne/remote-loader';
import { Routes, Route } from 'react-router-dom';
import { Provider } from '../../common/context';
import InitAdminPage from './InitAdmin';
import HomePage from './HomePage';
import style from './style.module.scss';

export const InitAdmin = ({ baseUrl, ...props }) => {
  return (
    <Provider value={{ baseUrl, ...props }}>
      <Routes>
        <Route path="initAdmin" element={<InitAdminPage />} />
      </Routes>
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
      </Routes>
    </Provider>
  );
};

Admin.defaultProps = {
  baseUrl: '/admin'
};

export default Admin;
