import { createWithRemoteLoader } from '@kne/remote-loader';

const HomePage = createWithRemoteLoader({
  modules: ['components-core:Layout@Page']
})(({ remoteModules }) => {
  const [Page] = remoteModules;
  return <Page>管理后台首页</Page>;
});

export default HomePage;
