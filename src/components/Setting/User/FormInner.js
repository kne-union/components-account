import { createWithRemoteLoader } from '@kne/remote-loader';
import importMessages, { moduleName } from '@root/locale';
import OrgTreeSelect, { OrgTenantTreeSelect } from '@components/OrgTreeSelect';

const FormInner = createWithRemoteLoader({
  modules: ['components-core:FormInfo', 'components-core:Intl@useIntl']
})(({ remoteModules, apis, tenantId }) => {
  const [FormInfo, useIntl] = remoteModules;
  const { AdvancedSelect, Input, PhoneNumber, TextArea, Avatar } = FormInfo.fields;
  const { formatMessage } = useIntl({ moduleName });
  return (
    <>
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
          tenantId ? <OrgTreeSelect tenantId={tenantId} name="orgIds" label="所属组织" rule="REQ" multiple hasRoot /> : <OrgTenantTreeSelect name="orgIds" label="所属组织" rule="REQ" multiple hasRoot />,
          <AdvancedSelect
            name="roleIds"
            label="角色"
            api={Object.assign({}, apis.getTenantRoleList, {
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
