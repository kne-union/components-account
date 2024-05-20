import { Routes, Route, Navigate } from 'react-router-dom';
import pages from './pages';
import MainLayout, { BeforeLoginLayout, AfterUserLoginLayout, AfterAdminUserLoginLayout } from './MainLayout';
import './index.scss';

const { Home, Account, Admin, InitAdmin, Error, NotFound } = pages;

const App = ({ globalPreset }) => {
  return (
    <Routes>
      <Route path="account" element={<BeforeLoginLayout preset={globalPreset} themeToken={globalPreset.themeToken} />}>
        <Route path="*" element={<Account baseUrl="/account" />} />
      </Route>
      <Route element={<AfterUserLoginLayout preset={globalPreset} themeToken={globalPreset.themeToken} paths={[]} />}>
        <Route index element={<Home />} />
        <Route path="admin/*" element={<InitAdmin baseUrl="/admin" />} />
      </Route>
      <Route path="admin" element={<AfterAdminUserLoginLayout preset={globalPreset} themeToken={globalPreset.themeToken} paths={[]} />}>
        <Route index element={<Admin baseUrl="/admin" />} />
        <Route path="*" element={<Admin baseUrl="/admin" />} />
      </Route>
      <Route element={<MainLayout preset={globalPreset} themeToken={globalPreset.themeToken} paths={[]} />}>
        <Route path="error" element={<Error />} />
        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="404" />} />
      </Route>
    </Routes>
  );
};

export default App;
