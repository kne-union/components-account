import { createWithRemoteLoader } from '@kne/remote-loader';
import { Outlet } from 'react-router-dom';

const MainLayout = createWithRemoteLoader({
  modules: ['components-core:Global', 'components-core:Layout']
})(({ remoteModules, paths, preset, ...props }) => {
  const [Global, Layout] = remoteModules;

  return (
    <Global {...props} preset={preset}>
      <Layout
        navigation={{
          defaultTitle: 'KneUnion',
          list: paths
        }}
      >
        <Outlet />
      </Layout>
    </Global>
  );
});

export default MainLayout;

export const BeforeLoginLayout = createWithRemoteLoader({
  modules: ['components-core:Global']
})(({ remoteModules, paths, preset, ...props }) => {
  const [Global] = remoteModules;

  return (
    <Global {...props} preset={preset}>
      <Outlet />
    </Global>
  );
});
