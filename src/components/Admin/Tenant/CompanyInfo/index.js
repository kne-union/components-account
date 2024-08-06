import { createWithRemoteLoader } from '@kne/remote-loader';
import { CompanyInfo as CompanyInfoInner } from '@components/Setting';

const CompanyInfo = createWithRemoteLoader({
  modules: ['components-core:InfoPage', 'component-core:Global@usePreset']
})(({ remoteModules, tenantId }) => {
  const [InfoPage, usePreset] = remoteModules;
  const { apis } = usePreset();
  console.log(tenantId);
  return (
    <InfoPage>
      <CompanyInfoInner
        {...apis.account.admin.getCompanyInfo}
        params={{ tenantId }}
        tenantId={tenantId}
        apis={{
          saveCompanyInfo: apis.account.admin.saveCompanyInfo
        }}
      />
    </InfoPage>
  );
});

export default CompanyInfo;
