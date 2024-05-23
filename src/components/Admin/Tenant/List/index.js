import { useState, useRef } from 'react';
import { createWithRemoteLoader } from '@kne/remote-loader';
import { Space, Button, App } from 'antd';
import getColumns from './getColumns';
import FormInner from '../FormInner';

const List = createWithRemoteLoader({
  modules: ['components-core:Layout@TablePage', 'components-core:Filter', 'components-core:FormInfo@useFormModal', 'components-core:Global@usePreset']
})(({ remoteModules }) => {
  const [TablePage, Filter, useFormModal, usePreset] = remoteModules;
  const { fields: filterFields, getFilterValue } = Filter;
  const [filter, setFilter] = useState([]);
  const { InputFilterItem } = filterFields;
  const { apis, ajax } = usePreset();
  const formModal = useFormModal();
  const { message } = App.useApp();
  const ref = useRef();
  return (
    <TablePage
      {...Object.assign({}, apis.account.getAllTenantList, {
        params: getFilterValue(filter)
      })}
      pagination={{ paramsType: 'params' }}
      ref={ref}
      name="tenant-list"
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
                  const api = formModal({
                    title: '编辑租户信息',
                    size: 'small',
                    children: <FormInner />,
                    formProps: {
                      data: Object.assign({}, item),
                      onSubmit: async data => {
                        const { data: resData } = await ajax(
                          Object.assign({}, apis.account.saveTenant, {
                            data: Object.assign({}, data, { id: item.id })
                          })
                        );
                        if (resData.code !== 0) {
                          return;
                        }
                        message.success('租户信息修改成功');
                        api.close();
                        ref.current.reload();
                      }
                    }
                  });
                }
              },
              {
                children: '添加用户'
              },
              {
                children: '设置权限'
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
          list: [[<InputFilterItem label="租户名" name="name" />]]
        },
        titleExtra: (
          <Space align="center">
            <Button
              type="primary"
              onClick={() => {
                const api = formModal({
                  title: '添加租户',
                  size: 'small',
                  children: <FormInner />,
                  formProps: {
                    onSubmit: async data => {
                      console.log(data);
                      const { data: resData } = await ajax(Object.assign({}, apis.account.addTenant, { data }));
                      if (resData.code !== 0) {
                        return;
                      }
                      message.success('添加租户成功');
                      api.close();
                      ref.current.reload();
                    }
                  }
                });
              }}
            >
              添加租户
            </Button>
          </Space>
        )
      }}
    />
  );
});

export default List;
