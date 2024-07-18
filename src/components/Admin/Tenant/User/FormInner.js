import { createWithRemoteLoader } from '@kne/remote-loader';
import UserFormInner from '../../User/FormInner';
import { App, Button } from 'antd';

const FormInner = createWithRemoteLoader({
  modules: ['components-core:FormInfo', 'components-core:FormInfo@useFormContext', 'components-core:Global@usePreset']
})(({ remoteModules, tenantId }) => {
  const [FormInfo, useFormContext, usePreset] = remoteModules;
  const { ajax, apis } = usePreset();
  const { AdvancedSelect } = FormInfo.fields;
  const useFormModal = FormInfo.useFormModal;
  const formModal = useFormModal();
  const { openApi } = useFormContext();
  const { message } = App.useApp();
  return (
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
          api={Object.assign({}, apis.account.admin.getAllUserList, {
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
                        Object.assign({}, apis.account.admin.addUser, {
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
  );
});

export default FormInner;
