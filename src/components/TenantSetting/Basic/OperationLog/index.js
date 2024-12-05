import { createWithRemoteLoader } from '@kne/remote-loader';
import { getOperationLogListColumns, OperationLogListOptions } from '@components/Setting';
import { Flex } from 'antd';

const OperationLog = createWithRemoteLoader({
  modules: ['components-core:Layout@TablePage', 'components-core:Global@usePreset', 'components-core:Filter']
})(({ remoteModules, menu, tenantId }) => {
  const [TablePage, usePreset, Filter] = remoteModules;
  const { apis } = usePreset();
  const { getFilterValue } = Filter;
  return (
    <OperationLogListOptions
      tenantId={tenantId}
      apis={{
        getUserList: apis.account.tenant.getTenantUserList,
        getApplicationList: apis.account.tenant.getApplicationList
      }}
      searchMap={{
        userId: { label: 'name', value: 'userId' }
      }}
    >
      {({ ref, filter }) => {
        return (
          <TablePage
            {...Object.assign({}, apis.account.tenant.getOperationLogList, {
              data: {
                tenantId,
                type: 'tenant',
                filter: getFilterValue(filter.value)
              }
            })}
            name="tenant-user-log"
            ref={ref}
            columns={[...getOperationLogListColumns()]}
            page={{
              title: '操作日志',
              filter,
              menu
            }}
          />
        );
      }}
    </OperationLogListOptions>
  );
});

export default OperationLog;
