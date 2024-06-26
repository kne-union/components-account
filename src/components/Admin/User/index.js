import { useState, useRef } from 'react';
import { createWithRemoteLoader } from '@kne/remote-loader';
import { Space, Button, App } from 'antd';
import getColumns from './getColumns';
import FormInner from './FormInner';
import ResetPasswordFormInner from './ResetPasswordFormInner';
import md5 from 'md5';
import get from 'lodash/get';
import { Link } from 'react-router-dom';

const User = createWithRemoteLoader({
  modules: ['components-core:Layout@TablePage', 'components-core:Filter@fields', 'components-core:FormInfo@useFormModal', 'components-core:Global@usePreset']
})(({ remoteModules }) => {
  const [TablePage, filterFields, useFormModal, usePreset] = remoteModules;
  const [filter, setFilter] = useState([]);
  const { InputFilterItem } = filterFields;
  const { ajax, apis } = usePreset();
  const formModal = useFormModal();
  const { message } = App.useApp();
  const ref = useRef(null);
  return (
    <TablePage
      {...apis.account.getAllUserList}
      name="user-list"
      ref={ref}
      columns={[
        ...getColumns({
          renderTenantList: tenants => {
            return (
              tenants &&
              tenants.length > 0 && (
                <Space size={0} split={','}>
                  {tenants.map(tenant => {
                    return (
                      <Link key={tenant.id} to={`/admin/tenant/detail/${tenant.id}?tab=user`}>
                        {tenant.name}
                      </Link>
                    );
                  })}
                </Space>
              )
            );
          }
        }),
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
                  const modalApi = formModal({
                    title: '编辑用户信息',
                    size: 'small',
                    children: <FormInner />,
                    formProps: {
                      data: Object.assign({}, item),
                      onSubmit: async data => {
                        const { data: resData } = await ajax(
                          Object.assign({}, apis.account.saveUser, {
                            data: Object.assign({}, data, { id: item.id })
                          })
                        );
                        if (resData.code !== 0) {
                          return;
                        }
                        message.success('修改成功');
                        ref.current.reload();
                        modalApi.close();
                      }
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
              get(item, 'adminRole.role') !== 'SuperAdmin'
                ? {
                    children: '设置超管'
                  }
                : {
                    children: '取消超管'
                  },
              ...(() => {
                const list = [];
                if (item.status !== 0) {
                  list.push({
                    confirm: true,
                    children: '设置为正常',
                    message: '确定要设置账号为正常吗？',
                    isDelete: false,
                    onClick: async () => {
                      const { data: resData } = await ajax(
                        Object.assign({}, apis.account.openUser, {
                          data: {
                            id: item.id
                          }
                        })
                      );
                      if (resData.code !== 0) {
                        return;
                      }
                      message.success('账号已开启');
                      ref.current.reload();
                    }
                  });
                }
                if (item.status !== 12) {
                  list.push({
                    isDelete: true,
                    confirm: true,
                    children: '关闭',
                    message: '确定要关闭该账号吗？',
                    okText: '确认',
                    onClick: async () => {
                      const { data: resData } = await ajax(
                        Object.assign({}, apis.account.closeUser, {
                          data: {
                            id: item.id
                          }
                        })
                      );
                      if (resData.code !== 0) {
                        return;
                      }
                      message.success('账号已关闭');
                      ref.current.reload();
                    }
                  });
                }
                return list;
              })()
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
            <Button
              type="primary"
              onClick={() => {
                const modalApi = formModal({
                  title: '添加用户',
                  size: 'small',
                  children: <FormInner />,
                  formProps: {
                    onSubmit: async data => {
                      const { data: resData } = await ajax(
                        Object.assign({}, apis.account.addUser, {
                          data: Object.assign({}, data)
                        })
                      );
                      if (resData.code !== 0) {
                        return;
                      }
                      message.success('添加成功');
                      ref.current.reload();
                      modalApi.close();
                    }
                  }
                });
              }}
            >
              添加用户
            </Button>
          </Space>
        )
      }}
    />
  );
});

export default User;
