import { useState } from 'react';
import { createWithRemoteLoader } from '@kne/remote-loader';
import { Space, Button, App } from 'antd';
import getColumns from './getColumns';
import FormInner from './FormInner';
import ResetPasswordFormInner from './ResetPasswordFormInner';
import md5 from 'md5';

const User = createWithRemoteLoader({
  modules: ['components-core:Layout@TablePage', 'components-core:Filter@fields', 'components-core:FormInfo@useFormModal', 'components-core:Global@usePreset']
})(({ remoteModules }) => {
  const [TablePage, filterFields, useFormModal, usePreset] = remoteModules;
  const [filter, setFilter] = useState([]);
  const { InputFilterItem } = filterFields;
  const { ajax, apis } = usePreset();
  const formModal = useFormModal();
  const { message } = App.useApp();
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
                children: '编辑',
                onClick: () => {
                  formModal({
                    title: '编辑用户信息',
                    size: 'small',
                    children: <FormInner />,
                    formProps: {
                      data: Object.assign({}, item)
                    }
                  });
                }
              },
              {
                children: '修改密码',
                onClick: () => {
                  const modalApi = formModal({
                    title: '修改用户密码',
                    size: 'small',
                    children: <ResetPasswordFormInner />,
                    formProps: {
                      onSubmit: async data => {
                        const { data: resData } = await ajax(
                          Object.assign({}, apis.account.resetUserPassword, {
                            data: {
                              password: md5(data.password),
                              userId: item.id
                            }
                          })
                        );
                        if (resData.code !== 0) {
                          return;
                        }
                        message.success('修改密码成功');
                        modalApi.close();
                      }
                    }
                  });
                }
              },
              {
                children: '设置为超级管理员'
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
        titleExtra: (
          <Space align="center">
            <Button type="primary">添加用户</Button>
          </Space>
        )
      }}
    />
  );
});

export default User;
