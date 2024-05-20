import { createWithRemoteLoader } from '@kne/remote-loader';

const Tenant = createWithRemoteLoader({
  modules: ['components-core:Layout@TablePage']
})(({ remoteModules }) => {
  const [TablePage] = remoteModules;
  return <TablePage />;
});

export default Tenant;
