import { createWithRemoteLoader } from '@kne/remote-loader';

const Info = createWithRemoteLoader({
  modules: ['components-core:Layout@Page']
})(({ remoteModules, menu }) => {
  const [Page] = remoteModules;
  return (
    <Page name="setting-info" title="公司信息" menu={menu}>
      <div>公司名称</div>
      <div>公司简称</div>
      <div>主题色</div>
      <div>logo</div>
      <div>公司简介</div>
    </Page>
  );
});

export default Info;
