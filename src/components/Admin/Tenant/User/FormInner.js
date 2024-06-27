import { createWithRemoteLoader } from '@kne/remote-loader';
import importMessages, { moduleName } from '../../../../locale';
import UserFormInner from '../../User/FormInner';
import { App, Button } from 'antd';
import OrgTreeSelect from '@components/OrgTreeSelect';

const FormInner = createWithRemoteLoader({
  modules: ['components-core:FormInfo', 'components-core:FormInfo@useFormContext', 'components-core:Global@usePreset', 'components-core:Intl@useIntl']
})(({ remoteModules, tenantId }) => {
  const [FormInfo, useFormContext, usePreset, useIntl] = remoteModules;
  const { ajax, apis } = usePreset();
  const { AdvancedSelect, Input, PhoneNumber, TextArea, Avatar } = FormInfo.fields;
  const useFormModal = FormInfo.useFormModal;
  const formModal = useFormModal();
  const { formatMessage } = useIntl({ moduleName });
  const { openApi } = useFormContext();
  const { message } = App.useApp();
  return (
    <>
      <FormInfo
        column={1}
        title="关联平台用户"
        list={[
          <AdvancedSelect.User
            name="userId"
            label="用户"
            rule="REQ"
            single
            interceptor="object-output-value"
            api={Object.assign({}, apis.account.getAllUserList, {
              transformData: data => {
                return Object.assign({}, data, {
                  pageData: data.pageData.map(item => {
                    return Object.assign({}, item, {
                      avatar: { id: item.avatar },
                      label: `${item.nickname || '未命名用户'}(${item.phone || item.email})`,
                      value: item.id
                    });
                  })
                });
              }
            })}
            extra={({ context }) => (
              <Button
                type="link"
                onClick={() => {
                  const modalApi = formModal({
                    title: '添加用户',
                    size: 'small',
                    children: <UserFormInner />,
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
                        message.success('添加用户成功');
                        context.fetchApi.reload();
                        modalApi.close();
                      }
                    }
                  });
                }}
              >
                添加用户
              </Button>
            )}
            valueType="all"
            pagination={{
              paramsType: 'params'
            }}
            onChange={value => {
              if (!value) {
                return;
              }

              openApi.setFields(
                ['email', 'phone', 'avatar', 'nickname', 'description']
                  .filter(name => {
                    return !!value[name];
                  })
                  .map(name => {
                    return {
                      name: name === 'nickname' ? 'name' : name,
                      value: value[name]
                    };
                  })
              );
            }}
          />
        ]}
      />
      <FormInfo
        column={1}
        title="基本信息"
        list={[
          <Avatar name="avatar" label="头像" labelHidden interceptor="photo-string" />,
          <Input name="name" label="姓名" rule="REQ LEN-2-50" />,
          <Input name="email" label={formatMessage({ id: 'emailAccount' })} rule="EMAIL" />,
          <PhoneNumber name="phone" label={formatMessage({ id: 'phoneNumber' })} interceptor="phone-number-string" />,
          <TextArea name="description" label="个人描述" />
        ]}
      />
      <FormInfo
        column={1}
        title="组织角色"
        list={[
          <OrgTreeSelect tenantId={tenantId} name="orgIds" label="所属组织" rule="REQ" multiple hasRoot />,
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
    </>
  );
});
//orgIds

export default createWithRemoteLoader({
  modules: ['components-core:Intl@IntlProvider']
})(({ remoteModules, ...props }) => {
  const [IntlProvider] = remoteModules;
  return (
    <IntlProvider importMessages={importMessages} moduleName={moduleName}>
      <FormInner {...props} />
    </IntlProvider>
  );
});
