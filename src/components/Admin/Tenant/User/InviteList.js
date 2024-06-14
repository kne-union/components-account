import { createWithRemoteLoader } from '@kne/remote-loader';
import { Flex, Space, Button, App } from 'antd';
import OrgTreeSelect from '../Organization/OrgTreeSelect';
import { useRef } from 'react';

const InviteFormInner = createWithRemoteLoader({
  modules: ['components-core:FormInfo', 'components-core:Global@usePreset']
})(({ remoteModules, tenantId }) => {
  const [FormInfo, usePreset] = remoteModules;
  const { Input, AdvancedSelect } = FormInfo.fields;
  const { apis } = usePreset();
  return (
    <FormInfo
      column={1}
      list={[
        <Input name="title" label="标题" rule="REQ" />,
        <OrgTreeSelect tenantId={tenantId} name="orgIds" label="所属组织" multiple />,
        <AdvancedSelect
          name="roleIds"
          label="角色"
          api={Object.assign({}, apis.account.getTenantRoleList, {
            params: { tenantId, filter: { type: 0 } },
            transformData: data => {
              return Object.assign({}, data, {
                pageData: data.pageData.map(item => {
                  return Object.assign(
                    {},
                    {
                      value: item.id,
                      label: item.name
                    }
                  );
                })
              });
            }
          })}
        />
      ]}
    />
  );
});

const InviteList = createWithRemoteLoader({
  modules: ['components-core:Table@TablePage', 'components-core:Global@usePreset', 'components-core:FormInfo@useFormModal']
})(({ remoteModules, tenantId }) => {
  const [TablePage, usePreset, useFormModal] = remoteModules;
  const { ajax, apis } = usePreset();
  const formModal = useFormModal();
  const { message } = App.useApp();
  const ref = useRef();
  return (
    <Flex vertical gap={8}>
      <Flex justify="space-between">
        <div></div>
        <Space>
          <Button
            type="primary"
            size="small"
            onClick={() => {
              const formModalApi = formModal({
                title: '添加邀请链接',
                size: 'small',
                formProps: {
                  onSubmit: async data => {
                    const { data: resData } = await ajax(
                      Object.assign({}, apis.account.addInviteToken, {
                        data: Object.assign({}, { tenantId, info: data })
                      })
                    );

                    if (resData.code !== 0) {
                      return;
                    }
                    message.success('添加邀请链接成功');
                    ref.current.reload();
                    formModalApi.close();
                  }
                },
                children: <InviteFormInner tenantId={tenantId} />
              });
            }}
          >
            添加
          </Button>
        </Space>
      </Flex>
      <TablePage
        {...Object.assign({}, apis.account.getInviteList, {
          params: { tenantId }
        })}
        columns={[
          {
            name: 'token',
            title: '邀请链接',
            type: 'description',
            ellipsis: true,
            valueOf: (item, { name }) => {
              return item[name];
            }
          },
          {
            name: 'title',
            title: '标题',
            type: 'mainInfo',
            ellipsis: true,
            valueOf: item => {
              return item.info?.title || '';
            }
          },
          {
            name: 'options',
            title: '操作',
            type: 'options',
            valueOf: item => {
              return [
                {
                  children: '复制'
                },
                {
                  children: '邮件通知'
                },
                {
                  children: '删除',
                  confirm: true,
                  isDelete: true,
                  onClick: async () => {
                    const { data: resData } = await ajax(
                      Object.assign({}, apis.account.deleteInviteToken, {
                        data: { id: item.id }
                      })
                    );

                    if (resData.code !== 0) {
                      return;
                    }
                    message.success('删除成功');
                    ref.current.reload();
                  }
                }
              ];
            }
          }
        ]}
        ref={ref}
      />
    </Flex>
  );
});

export default InviteList;
