import { createWithRemoteLoader } from '@kne/remote-loader';

const OperationLog = createWithRemoteLoader({
  modules: ['components-core:Layout@Page']
})(({ remoteModules, menu }) => {
  const [Page] = remoteModules;
  return (
    <Page name="setting-log" title="操作日志" menu={menu}>
      操作日志
    </Page>
  );
});

export default OperationLog;
