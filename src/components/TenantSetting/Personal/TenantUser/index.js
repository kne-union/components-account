import { createWithRemoteLoader } from '@kne/remote-loader';

const TenantUser = createWithRemoteLoader({
  modules: ['components-core:Layout@Page']
})(({ remoteModules, menu }) => {
  const [Page] = remoteModules;
  return (
    <Page name="setting-tenant-user" title="员工信息" menu={menu}>
      员工信息
    </Page>
  );
});

export default TenantUser;
