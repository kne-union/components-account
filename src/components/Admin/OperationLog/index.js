import { createWithRemoteLoader } from '@kne/remote-loader';
import { getOperationLogListColumns } from '@components/Setting';

const OperationLog = createWithRemoteLoader({
  modules: ['components-core:Layout@TablePage', 'components-core:Global@usePreset']
})(({ remoteModules, menu }) => {
  const [TablePage, usePreset] = remoteModules;
  const { apis } = usePreset();
  return (
    <TablePage
      {...Object.assign({}, apis.account.admin.getOperationLogList)}
      name="log"
      columns={[...getOperationLogListColumns()]}
      page={{
        title: '操作日志',
        menu
      }}
    >
      操作日志
    </TablePage>
  );
});

export default OperationLog;
