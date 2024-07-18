import { createWithRemoteLoader } from '@kne/remote-loader';
import { OrgTenantTreeData } from '@components/OrgTreeSelect';
import { OrgListOptions } from '@components/Setting';

const Org = createWithRemoteLoader({
  modules: ['components-core:Layout@Page', 'components-core:Global@usePreset']
})(({ remoteModules, menu }) => {
  const [Page, usePreset] = remoteModules;
  const { apis } = usePreset();
  return (
    <OrgTenantTreeData>
      {fetchApi => (
        <OrgListOptions {...fetchApi} apis={apis.account.tenant}>
          {({ tree, topOptions }) => (
            <Page name="setting-org" title="组织架构管理" menu={menu} titleExtra={topOptions}>
              {tree}
            </Page>
          )}
        </OrgListOptions>
      )}
    </OrgTenantTreeData>
  );
});

export default Org;
