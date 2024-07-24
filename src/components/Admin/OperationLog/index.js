import { createWithRemoteLoader } from '@kne/remote-loader';
import { getOperationLogListColumns, OperationLogListOptions } from '@components/Setting';

const OperationLog = createWithRemoteLoader({
  modules: ['components-core:Layout@TablePage', 'components-core:Global@usePreset', 'components-core:Filter@getFilterValue']
})(({ remoteModules, menu }) => {
  const [TablePage, usePreset, getFilterValue] = remoteModules;
  const { apis } = usePreset();
  return (
    <OperationLogListOptions>
      {({ ref, filter }) => {
        return (
          <TablePage
            {...Object.assign({}, apis.account.admin.getOperationLogList, { data: getFilterValue(filter.value) })}
            ref={ref}
            name="log"
            columns={[...getOperationLogListColumns()]}
            page={{
              title: '操作日志',
              filter,
              menu
            }}
          >
            操作日志
          </TablePage>
        );
      }}
    </OperationLogListOptions>
  );
});

export default OperationLog;
