import { useState } from 'react';
import { createWithRemoteLoader } from '@kne/remote-loader';
import { Space, Button } from 'antd';
import getColumns from './getColumns';
import FormInner from './FormInner';

const User = createWithRemoteLoader({
  modules: ['components-core:Layout@TablePage', 'components-core:Filter@fields', 'components-core:FormInfo@useFormModal', 'components-core:Global@usePreset']
})(({ remoteModules }) => {
  const [TablePage, filterFields, useFormModal, usePreset] = remoteModules;
  const [filter, setFilter] = useState([]);
  const { InputFilterItem } = filterFields;
  const { apis } = usePreset();
  const formModal = useFormModal();
  return (
    <TablePage
      {...apis.account.getAllUserList}
      name="user-list"
      columns={[
        ...getColumns(),
        {
          name: 'options',
          title: '操作',
          type: 'options',
          fixed: 'right',
          valueOf: item => {
            return [
              {
                children: '编辑基本信息',
                onClick: () => {
                  formModal({
                    title: '编辑基本信息',
                    size: 'small',
                    children: <FormInner />,
                    formProps: {
                      data: Object.assign({}, item)
                    }
                  });
                }
              },
              {
                children: '禁用'
              },
              {
                isDelete: true,
                confirm: true,
                children: '关闭'
              }
            ];
          }
        }
      ]}
      page={{
        filter: {
          value: filter,
          onChange: setFilter,
          list: [[<InputFilterItem label="用户名" name="text" />]]
        },
        titleExtra: <Space align="center"></Space>
      }}
    />
  );
});

export default User;
