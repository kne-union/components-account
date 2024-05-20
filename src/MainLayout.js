import { createWithRemoteLoader } from '@kne/remote-loader';
import { Outlet } from 'react-router-dom';
import { UserInfo } from './Authenticate';

const Global = createWithRemoteLoader({
  modules: ['components-core:Global']
})(({ remoteModules, paths, preset, children, ...props }) => {
  const [Global] = remoteModules;

  return (
    <Global {...props} preset={preset}>
      {children}
    </Global>
  );
});

const GlobalLayout = createWithRemoteLoader({
  modules: ['components-core:Layout', 'components-core:Global']
})(({ remoteModules, paths, preset, children, ...props }) => {
  const [Layout, Global] = remoteModules;
  return (
    <Global {...props} preset={preset}>
      <Layout
        navigation={{
          defaultTitle: 'KneUnion',
          list: paths
        }}
      >
        {children}
      </Layout>
    </Global>
  );
});

const MainLayout = props => {
  return (
    <GlobalLayout {...props}>
      <Outlet />
    </GlobalLayout>
  );
};

export default MainLayout;

export const AfterUserLoginLayout = props => {
  return (
    <GlobalLayout {...props}>
      <UserInfo>
        <Outlet />
      </UserInfo>
    </GlobalLayout>
  );
};

export const AfterAdminUserLoginLayout = props => {
  return (
    <GlobalLayout {...props}>
      <UserInfo>
        <Outlet />
      </UserInfo>
    </GlobalLayout>
  );
};

export const BeforeLoginLayout = props => {
  return (
    <Global {...props}>
      <Outlet />
    </Global>
  );
};
