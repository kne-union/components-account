import { Routes, Route, Navigate } from 'react-router-dom';
import pages from './pages';
import MainLayout, { BeforeLoginLayout } from './MainLayout';
import { UserInfo } from './Authenticate';
import './index.scss';

const { Home, Account, Error, NotFound } = pages;

const App = ({ globalPreset }) => {
  return (
    <Routes>
      <Route path="account" element={<BeforeLoginLayout preset={globalPreset} themeToken={globalPreset.themeToken} />}>
        <Route path="*" element={<Account baseUrl="/account" />} />
      </Route>
      <Route path="/" element={<MainLayout preset={globalPreset} themeToken={globalPreset.themeToken} paths={[]} />}>
        <Route
          index
          element={
            <UserInfo>
              <Home />
            </UserInfo>
          }
        />
        <Route path="error" element={<Error />} />
        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="404" />} />
      </Route>
    </Routes>
  );
};

export default App;
