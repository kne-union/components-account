import { createWithRemoteLoader } from '@kne/remote-loader';
import { CompanyInfo } from '@components/Setting';

const Info = createWithRemoteLoader({
  modules: ['components-core:Layout@Page', 'component-core:Global@usePreset']
})(({ remoteModules, menu }) => {
  const [Page, usePreset] = remoteModules;
  const { apis } = usePreset();

  return (
    <Page name="setting-info" title="公司信息" menu={menu}>
      <CompanyInfo
        {...apis.account.tenant.getCompanyInfo}
        apis={{
          saveCompanyInfo: apis.account.tenant.saveCompanyInfo
        }}
      />
    </Page>
  );
});

export default Info;
