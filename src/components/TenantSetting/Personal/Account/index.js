import { createWithRemoteLoader } from '@kne/remote-loader';

const Account = createWithRemoteLoader({
  modules: ['components-core:Layout@Page']
})(({ remoteModules, menu }) => {
  const [Page] = remoteModules;
  return (
    <Page name="setting-account" title="账号设置" menu={menu}>
      账号设置
    </Page>
  );
});

export default Account;
