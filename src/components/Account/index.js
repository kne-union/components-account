import style from './style.module.scss';
import { createWithRemoteLoader } from '@kne/remote-loader';
import importMessages, { moduleName } from '../../locale';
import { Provider } from '../../common/context';
import { getCookies } from '../../common/cookies';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import classnames from 'classnames';
import Login from './Login';
import Forget from './Forget';
import ResetPassword from './ResetPassword';
import Modify from './Modify';
import Register from './Register';

const Layout = () => {
  return (
    <div className={classnames(style['layout-row'], 'account-layout')}>
      <div className={style['layout-inner']}>
        <div className={style['layout-inner-wrapper']}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const Account = ({ className, baseUrl, ...props }) => {
  return (
    <Provider value={{ baseUrl, ...props }}>
      <div className={className}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Navigate to={`${baseUrl}/login`} />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forget" element={<Forget />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />
            <Route path="modify/:email" element={<Modify />} />
          </Route>
        </Routes>
      </div>
    </Provider>
  );
};

Account.defaultProps = {
  baseUrl: '/',
  isTenant: false,
  openRegister: true,
  storeKeys: {
    token: 'X-User-Token'
  }
};

export const getToken = (tokenKey = 'X-User-Token') => {
  return getCookies('X-User-Token');
};

export default createWithRemoteLoader({
  modules: ['components-core:Intl@IntlProvider']
})(({ remoteModules, ...props }) => {
  const [IntlProvider] = remoteModules;
  return (
    <IntlProvider importMessages={importMessages} moduleName={moduleName}>
      <Account {...props} />
    </IntlProvider>
  );
});
