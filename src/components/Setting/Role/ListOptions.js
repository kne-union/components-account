import { createWithRemoteLoader } from '@kne/remote-loader';
import { Space, Button, App } from 'antd';
import { useRef } from 'react';
import { RolePermission, RoleFormInner } from '@components/Setting';

const ListOptions = createWithRemoteLoader({
  modules: ['components-core:FormInfo@useFormModal', 'components-core:Global@usePreset', 'components-core:Modal@useModal']
})(({ remoteModules, apis, topOptionsSize, tenantId, children }) => {
  const [useFormModal, usePreset, useModal] = remoteModules;
  const { ajax } = usePreset();
  const formModal = useFormModal();
  const modal = useModal();
  const { message } = App.useApp();
  const ref = useRef(null);
  return children({
    ref,
    topOptions: (
      <Space>
        <Button
          size={topOptionsSize}
          type="primary"
          onClick={() => {
            const formApi = formModal({
              title: '添加角色',
              formProps: {
                onSubmit: async data => {
                  const { data: resData } = await ajax(
                    Object.assign({}, apis.addTenantRole, {
                      data: Object.assign({}, data, { tenantId })
                    })
                  );
                  if (resData.code !== 0) {
                    return;
                  }

                  message.success('角色添加成功');
                  ref.current.reload();
                  formApi.close();
                }
              },
              size: 'small',
              children: <RoleFormInner />
            });
          }}
        >
          添加角色
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
            children: '权限管理',
            onClick: () => {
              modal({
                title: '设置角色权限',
                size: 'large',
                children: ({ childrenRef }) => <RolePermission apis={apis} roleId={item.id} tenantId={tenantId} ref={childrenRef} />,
                onConfirm: (e, { childrenRef }) => {
                  return childrenRef.current.onSubmit();
                }
              });
            }
          },
          {
            children: '编辑',
            disabled: item.type === 1,
            onClick: () => {
              const formApi = formModal({
                title: '编辑角色',
                size: 'small',
                formProps: {
                  data: Object.assign({}, item),
                  onSubmit: async data => {
                    const { data: resData } = await ajax(
                      Object.assign({}, apis.saveTenantRole, {
                        data: Object.assign({}, data, { tenantId, id: item.id })
                      })
                    );
                    if (resData.code !== 0) {
                      return;
                    }

                    message.success('角色保存成功');
                    ref.current.reload();
                    formApi.close();
                  }
                },
                children: <RoleFormInner />
              });
            }
          },
          {
            children: '删除',
            confirm: true,
            isDelete: true,
            disabled: item.type === 1,
            onClick: async () => {
              await ajax(
                Object.assign({}, apis.removeTenantRole, {
                  data: { id: item.id }
                })
              );
              ref.current.reload();
            }
          }
        ];
      }
    }
  });
});

export default ListOptions;
