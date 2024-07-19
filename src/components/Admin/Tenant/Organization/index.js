import { createWithRemoteLoader } from '@kne/remote-loader';
import { Flex } from 'antd';
import { OrgTreeData } from '@components/OrgTreeSelect';
import { OrgListOptions } from '@components/Setting';

const Organization = createWithRemoteLoader({
  modules: ['components-core:Global@usePreset']
})(({ remoteModules, record }) => {
  const [usePreset] = remoteModules;
  const { apis } = usePreset();
  const tenantId = record.id;
  return (
    <OrgTreeData tenantId={tenantId}>
      {fetchApi => {
        return (
          <OrgListOptions {...fetchApi} tenantId={tenantId} topOptionsSize="small" apis={apis.account.admin}>
            {({ tree, topOptions }) => {
              return (
                <Flex vertical gap={8} flex={1}>
                  <Flex justify="space-between">
                    <div></div>
                    {topOptions}
                  </Flex>
                  {tree}
                </Flex>
              );
            }}
          </OrgListOptions>
        );
      }}
    </OrgTreeData>
  );
});

export default Organization;
