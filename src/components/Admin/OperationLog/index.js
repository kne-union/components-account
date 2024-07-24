import { createWithRemoteLoader } from '@kne/remote-loader';
import { getOperationLogListColumns, OperationLogListOptions } from '@components/Setting';
import { useState } from 'react';

const OperationLog = createWithRemoteLoader({
  modules: ['components-core:Layout@TablePage', 'components-core:Global@usePreset', 'components-core:Filter@getFilterValue', 'components-core:StateBar']
})(({ remoteModules, menu }) => {
  const [TablePage, usePreset, getFilterValue, StateBar] = remoteModules;
  const { apis } = usePreset();
  const [currentSelectedKey, setCurrentSelectedKey] = useState('user');

  return (
    <OperationLogListOptions
      apis={{
        getUserList: apis.account.admin.getAllUserList,
        getApplicationList: apis.account.admin.getApplicationList
      }}
      searchMap={{
        userId: 'nickname'
      }}
    >
      {({ ref, filter }) => {
        return (
          <TablePage
            {...Object.assign({}, apis.account.admin.getOperationLogList, { data: { filter: Object.assign({}, getFilterValue(filter.value), { type: currentSelectedKey }) } })}
            ref={ref}
            name="log"
            columns={[...getOperationLogListColumns()]}
            page={{
              title: '操作日志',
              filter,
              menu
            }}
            topArea={
              <StateBar
                type="radio"
                size="small"
                activeKey={currentSelectedKey}
                stateOption={[
                  { key: 'user', tab: '用户' },
                  { key: 'tenant', tab: '租户' },
                  { key: 'admin', tab: '管理员' }
                ]}
                onChange={setCurrentSelectedKey}
              />
            }
          />
        );
      }}
    </OperationLogListOptions>
  );
});

export default OperationLog;
