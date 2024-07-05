import { useState, useRef } from 'react';
import { createWithRemoteLoader } from '@kne/remote-loader';
import { Space, Button, App } from 'antd';
import getColumns from './getColumns';
import FormInner from '../FormInner';
import UserFormInner from '../User/FormInner';
import { useNavigate } from 'react-router-dom';
import { useBaseUrl } from '@common/context';
import Permission from '../Permission';

const List = createWithRemoteLoader({
  modules: ['components-core:Layout@TablePage', 'components-core:Filter', 'components-core:FormInfo@useFormModal', 'components-core:Global@usePreset', 'components-core:Modal@useModal']
})(({ remoteModules }) => {
  const [TablePage, Filter, useFormModal, usePreset, useModal] = remoteModules;
  const { fields: filterFields, getFilterValue, SearchInput } = Filter;
  const [filter, setFilter] = useState([]);
  const { AdvancedSelectFilterItem } = filterFields;
  const { apis, ajax } = usePreset();
  const formModal = useFormModal();
  const { message } = App.useApp();
  const ref = useRef();
  const baseUrl = useBaseUrl();
  const navigate = useNavigate();
  const modal = useModal();
  const navigateTo = ({ id }) => {
    return navigate(`${baseUrl}/tenant/detail/${id}`);
  };
  return (
    <TablePage
      {...Object.assign({}, apis.account.getAllTenantList, {
        params: getFilterValue(filter)
      })}
      pagination={{ paramsType: 'params' }}
      ref={ref}
      name="tenant-list"
      columns={[
        ...getColumns({ navigateTo }),
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
                children: '设置权限',
                onClick: () => {
                  modal({
                    title: '设置租户权限',
                    size: 'large',
                    children: ({ childrenRef }) => <Permission tenantId={item.id} ref={childrenRef} />,
                    onConfirm: (e, { childrenRef }) => {
                      return childrenRef.current.onSubmit();
                    }
                  });
                }
              },
              {
                children: '添加租户用户',
                onClick: () => {
                  const formApi = formModal({
                    title: '添加租户用户',
                    size: 'small',
                    formProps: {
                      onSubmit: async data => {
                        const { data: resData } = await ajax(
                          Object.assign({}, apis.account.addTenantUser, {
                            data: Object.assign({}, data, { tenantId: item.id })
                          })
                        );
                        if (resData.code !== 0) {
                          return;
                        }
                        message.success('添加成功');
                        formApi.close();
                        ref.current.reload();
                      }
                    },
                    children: <UserFormInner tenantId={item.id} />
                  });
                }
              },
              item.status === 0
                ? {
                    isDelete: true,
                    confirm: true,
                    message: '确定要关闭该租户吗?',
                    children: '关闭',
                    okText: '关闭',
                    onClick: async () => {
                      const { data: resData } = await ajax(
                        Object.assign({}, apis.account.closeTenant, {
                          data: Object.assign({}, { tenantId: item.id })
                        })
                      );
                      if (resData.code !== 0) {
                        return;
                      }
                      message.success('关闭租户成功');
                      ref.current.reload();
                    }
                  }
                : {
                    isDelete: false,
                    confirm: true,
                    message: '确定要开启该租户吗?',
                    children: '开启',
                    onClick: async () => {
                      const { data: resData } = await ajax(
                        Object.assign({}, apis.account.openTenant, {
                          data: Object.assign({}, { tenantId: item.id })
                        })
                      );
                      if (resData.code !== 0) {
                        return;
                      }
                      message.success('开启租户成功');
                      ref.current.reload();
                    }
                  }
            ];
          }
        }
      ]}
      page={{
        filter: {
          value: filter,
          onChange: setFilter,
          list: [
            [
              <AdvancedSelectFilterItem
                label="状态"
                name="status"
                single
                api={{
                  loader: () => {
                    return {
                      pageData: [
                        { label: '正常', value: 0 },
                        { label: '已关闭', value: 12 }
                      ]
                    };
                  }
                }}
              />
            ]
          ]
        },
        titleExtra: (
          <Space align="center">
            <SearchInput name="name" label="租户名称" />
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
