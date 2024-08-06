import { createWithRemoteLoader } from '@kne/remote-loader';
import { getOperationLogListColumns, OperationLogListOptions } from '@components/Setting';
import { Flex } from 'antd';

const OperationLog = createWithRemoteLoader({
  modules: ['components-core:Table@TablePage', 'components-core:Global@usePreset', 'components-core:Filter']
})(({ remoteModules, tenantId }) => {
  const [TablePage, usePreset, Filter] = remoteModules;
  const { apis } = usePreset();
  const { getFilterValue } = Filter;

  return (
    <OperationLogListOptions
      tenantId={tenantId}
      apis={{
        getUserList: apis.account.admin.getTenantUserList,
        getApplicationList: apis.account.admin.getApplicationList
      }}
      searchMap={{
        userId: { label: 'name', value: 'id' }
      }}
    >
      {({ ref, filter }) => {
        return (
          <Flex vertical gap={8} flex={1}>
            <Filter {...filter} className="page-filter" />
            <TablePage
              {...Object.assign({}, apis.account.admin.getOperationLogList, { data: { tenantId, type: 'tenant', filter: getFilterValue(filter.value) } })}
              name="tenant-user-log"
              ref={ref}
              columns={[...getOperationLogListColumns()]}
            />
          </Flex>
        );
      }}
    </OperationLogListOptions>
  );
});

export default OperationLog;
