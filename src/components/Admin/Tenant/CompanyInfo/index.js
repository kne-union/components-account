import { createWithRemoteLoader } from '@kne/remote-loader';

const CompanyInfo = createWithRemoteLoader({
  modules: ['components-core:Layout@Page']
})(({ remoteModules, menu }) => {
  const [Page] = remoteModules;
  return (
    <Page name="log" title="公司信息" menu={menu}>
      公司信息
    </Page>
  );
});

export default CompanyInfo;
