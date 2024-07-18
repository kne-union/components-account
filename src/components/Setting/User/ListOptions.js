import { createWithRemoteLoader } from '@kne/remote-loader';
import { useRef, useState } from 'react';
import FormInner from './FormInner';
import { App, Button, Flex, Space } from 'antd';

const ListOptions = createWithRemoteLoader({
  modules: ['components-core:FormInfo@useFormModal', 'components-core:Global@usePreset', 'components-core:Filter']
})(({ remoteModules, apis, tenantId, topOptionsSize, topOptionsChildren, children }) => {
  const [useFormModal, usePreset, Filter] = remoteModules;
  const ref = useRef(null);
  const { ajax } = usePreset();
  const { message } = App.useApp();
  const formModal = useFormModal();
  const { fields: filterFields, SearchInput } = Filter;
  const [filter, setFilter] = useState([]);
  const { InputFilterItem, AdvancedSelectFilterItem } = filterFields;
  return children({
    ref,
    filter: {
      value: filter,
      onChange: setFilter,
      list: [
        [
          <InputFilterItem label="邮箱" name="email" />,
          <InputFilterItem label="电话" name="phone" />,
          <AdvancedSelectFilterItem
            label="状态"
            name="status"
            single
            api={{
              loader: () => {
                return {
                  pageData: [
                    { label: '正常', value: 0 },
                    {
                      label: '初始化未激活',
                      value: 10
                    },
                    { label: '已关闭', value: 12 }
                  ]
                };
              }
            }}
          />,
          <AdvancedSelectFilterItem
            label="是否管理员"
            name="isSuperAdmin"
            single
            api={{
              loader: () => {
                return {
                  pageData: [
                    { label: '是', value: true },
                    { label: '否', value: false }
                  ]
                };
              }
            }}
          />
        ]
      ]
    },
    topOptions: (
      <Space>
        <Flex>
          <SearchInput size={topOptionsSize} name="name" label="姓名" />
        </Flex>
        {topOptionsChildren ? topOptionsChildren({ ref }) : null}
        <Button size={topOptionsSize} onClick={() => {}}>
          管理邀请链接
        </Button>
      </Space>
    ),
    optionsColumn: {
      name: 'options',
      title: '操作',
      type: 'options',
      fixed: 'right',
      valueOf: item => {
        return [
          {
            children: '编辑',
            onClick: () => {
              const formApi = formModal({
                title: '编辑租户用户',
                size: 'small',
                formProps: {
                  data: Object.assign({}, item, {
                    roleIds: item.tenantRoles.map(({ id }) => {
                      return id;
                    }),
                    orgIds: item.tenantOrgs.map(({ id }) => {
                      return id;
                    })
                  }),
                  onSubmit: async data => {
                    const { data: resData } = await ajax(
                      Object.assign({}, apis.saveTenantUser, {
                        data: Object.assign({}, data, { tenantId, id: item.id })
                      })
                    );
                    if (resData.code !== 0) {
                      return;
                    }
                    message.success('保存成功');
                    formApi.close();
                    ref.current.reload();
                  }
                },
                children: <FormInner tenantId={tenantId} apis={apis} />
              });
            }
          },
          item.status === 0
            ? {
                children: '关闭',
                message: '确定要关闭该账号，关闭后用户不能进入当前租户？',
                isDelete: false,
                onClick: async () => {
                  const { data: resData } = await ajax(
                    Object.assign({}, apis.closeTenantUser, {
                      data: { tenantId, tenantUserId: item.id }
                    })
                  );
                  if (resData.code !== 0) {
                    return;
                  }
                  message.success('账号关闭成功');
                  ref.current.reload();
                }
              }
            : {
                children: '开启',
                message: '确定要开启该账号，开启后该账号可以正常登录并使用该租户系统？',
                isDelete: false,
                onClick: async () => {
                  const { data: resData } = await ajax(
                    Object.assign({}, apis.openTenantUser, {
                      data: { tenantId, tenantUserId: item.id }
                    })
                  );
                  if (resData.code !== 0) {
                    return;
                  }
                  message.success('账号开启成功');
                  ref.current.reload();
                }
              },
          {
            children: '删除',
            message: '确定要删除该账号？',
            confirm: true,
            isDelete: true,
            onClick: async () => {
              const { data: resData } = await ajax(
                Object.assign({}, apis.deleteTenantUser, {
                  data: { tenantId, tenantUserId: item.id }
                })
              );
              if (resData.code !== 0) {
                return;
              }
              message.success('账号删除成功');
              ref.current.reload();
            }
          }
        ];
      }
    }
  });
});

export default ListOptions;
