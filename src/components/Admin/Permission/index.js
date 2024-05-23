import { createWithRemoteLoader } from '@kne/remote-loader';

const Permission = createWithRemoteLoader({
  modules: ['components-core:Layout@Page']
})(({ remoteModules }) => {
  const [Page] = remoteModules;
  return <Page title="应用权限管理">应用权限管理</Page>;
});

export default Permission;
