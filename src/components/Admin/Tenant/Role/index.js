import { createWithRemoteLoader } from '@kne/remote-loader';
import getColumns from './getColumns';
import { Space, Flex, Button, App } from 'antd';
import FormInner from './FormInner';
import { useRef } from 'react';
import Permission from './Permission';

const Role = createWithRemoteLoader({
  modules: ['components-core:Table@TablePage', 'components-core:FormInfo@useFormModal', 'components-core:Global@usePreset', 'components-core:Modal@useModal']
})(({ remoteModules, record }) => {
  const [TablePage, useFormModal, usePreset, useModal] = remoteModules;
  const { ajax, apis } = usePreset();
  const formModal = useFormModal();
  const modal = useModal();
  const tenantId = record.id;
  const { message } = App.useApp();
  const ref = useRef(null);
  return (
    <Flex vertical gap={8} flex={1}>
      <Flex justify="space-between">
        <div></div>
        <Space>
          <Button
            type="primary"
            onClick={() => {
              const formApi = formModal({
                title: '添加角色',
                formProps: {
                  onSubmit: async data => {
                    const { data: resData } = await ajax(
                      Object.assign({}, apis.account.addTenantRole, {
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
                children: <FormInner />
              });
            }}
          >
            添加角色
          </Button>
        </Space>
      </Flex>
      <div style={{ flex: 1 }}>
        <TablePage
          {...Object.assign({}, apis.account.getTenantRoleList, {
            params: { tenantId }
          })}
          ref={ref}
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
                    children: '权限管理',
                    onClick: () => {
                      modal({
                        title: '设置角色权限',
                        size: 'large',
                        children: ({ childrenRef }) => <Permission roleId={item.id} tenantId={tenantId} ref={childrenRef} />,
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
                              Object.assign({}, apis.account.saveTenantRole, {
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
                        children: <FormInner />
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
                        Object.assign({}, apis.account.removeTenantRole, {
                          data: { id: item.id }
                        })
                      );
                      ref.current.reload();
                    }
                  }
                ];
              }
            }
          ]}
        />
      </div>
    </Flex>
  );
});

export default Role;
