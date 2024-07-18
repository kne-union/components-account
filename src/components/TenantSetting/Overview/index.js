import { createWithRemoteLoader } from '@kne/remote-loader';

const Overview = createWithRemoteLoader({
  modules: ['components-core:Layout@Page']
})(({ remoteModules, menu }) => {
  const [Page] = remoteModules;
  return (
    <Page name="setting-overview" title="总览" menu={menu}>
      租户总览
    </Page>
  );
});

export default Overview;
