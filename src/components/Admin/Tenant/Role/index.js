import { createWithRemoteLoader } from '@kne/remote-loader';
import { Flex } from 'antd';
import { RoleListOptions, getRoleColumns } from '@components/Setting';

const Role = createWithRemoteLoader({
  modules: ['components-core:Table@TablePage', 'components-core:Global@usePreset']
})(({ remoteModules, record }) => {
  const [TablePage, usePreset] = remoteModules;
  const { apis } = usePreset();
  const tenantId = record.id;
  return (
    <RoleListOptions tenantId={tenantId} apis={apis.account.admin} topOptionsSize="small">
      {({ ref, topOptions, optionsColumn }) => {
        return (
          <Flex vertical gap={8} flex={1}>
            <Flex justify="space-between">
              <div></div>
              {topOptions}
            </Flex>
            <TablePage
              {...Object.assign({}, apis.account.admin.getTenantRoleList, {
                params: { tenantId }
              })}
              name="role-list"
              pagination={{ paramsType: 'params' }}
              ref={ref}
              columns={[...getRoleColumns(), optionsColumn]}
            />
          </Flex>
        );
      }}
    </RoleListOptions>
  );
});

export default Role;
